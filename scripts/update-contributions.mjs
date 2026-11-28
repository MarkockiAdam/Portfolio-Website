// Saves the last year of GitHub contributions to data/contributions.json.
// Run every day by .github/workflows/contributions.yml. Node 20+, no dependencies.
// Source 1: github-contributions-api.jogruber.de (matches the profile page, incl. private counts if shown).
// Source 2 (fallback): GitHub GraphQL API with the workflow's GITHUB_TOKEN.
import { writeFile, mkdir } from 'node:fs/promises';

const USER = process.env.GH_USER || 'MarkockiAdam';
const OUT = new URL('../data/contributions.json', import.meta.url);

async function fromJogruber() {
  const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`);
  if (!r.ok) throw new Error(`jogruber ${r.status}`);
  const j = await r.json();
  return { total: j.total.lastYear, contributions: j.contributions.map(d => ({ date: d.date, count: d.count, level: d.level })) };
}

async function fromGraphQL() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('no GITHUB_TOKEN');
  const LEVEL = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
  const query = `query($u:String!){user(login:$u){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;
  const r = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'portfolio-heatmap' },
    body: JSON.stringify({ query, variables: { u: USER } })
  });
  const j = await r.json();
  const cal = j?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) throw new Error('graphql: ' + JSON.stringify(j.errors || j).slice(0, 200));
  const contributions = cal.weeks.flatMap(w => w.contributionDays).map(d => ({ date: d.date, count: d.contributionCount, level: LEVEL[d.contributionLevel] ?? 0 }));
  return { total: cal.totalContributions, contributions };
}

let data, source;
for (const [name, fn] of [['jogruber', fromJogruber], ['graphql', fromGraphQL]]) {
  for (let attempt = 1; attempt <= 3 && !data; attempt++) {
    try { data = await fn(); source = name; }
    catch (e) { console.warn(`${name} attempt ${attempt} failed: ${e.message}`); await new Promise(r => setTimeout(r, 3000 * attempt)); }
  }
  if (data) break;
}
if (!data || data.contributions.length < 300) { console.error('No usable data; keeping the previous file.'); process.exit(1); }

await mkdir(new URL('../data/', import.meta.url), { recursive: true });
await writeFile(OUT, JSON.stringify({ user: USER, updated: new Date().toISOString(), source, ...data }) + '\n');
console.log(`Saved ${data.contributions.length} days, total ${data.total}, from ${source}.`);
