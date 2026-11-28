/* ATLAS — the analyst-console style. Renders everything from window.SITE (content.js)
   into #atlas. Shares language, sound, toasts and GitHub data with main.js via window.App. */
(function () {
  var App = window.App, S = App.S, doc = document.documentElement;
  var root = document.getElementById('atlas');
  if (!root || !App) return;

  var $ = function (s, r) { return (r || root).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || root).querySelectorAll(s)); };
  var T = function (k) { return App.T(k); };
  var lang = function () { return App.lang(); };
  var L = function (o) { return o == null ? '' : typeof o === 'string' ? o : (o[lang()] || o.en || ''); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var NS = 'http://www.w3.org/2000/svg';
  var C = { org: '#4c90f0', proj: '#29a16a', award: '#d68a2e' };   /* validated: dataviz validate_palette (dark, #1c2127); shapes + labels carry identity too */

  var state = { visible: false, declassified: false, sort: { key: null, dir: 1 }, filter: 'all', open: {}, timers: [], raf: 0, io: [] };

  /* ---------- small helpers ---------- */
  var ICON = {
    overview: '<path d="M3 3h6v6H3zM11 3h6v4h-6zM11 9h6v8h-6zM3 11h6v6H3z"/>',
    assets: '<path d="M10 2l7 4v8l-7 4-7-4V6zM3 6l7 4 7-4M10 10v8"/>',
    ops: '<circle cx="10" cy="10" r="7"/><circle cx="10" cy="10" r="3"/><path d="M10 1v4M10 15v4M1 10h4M15 10h4"/>',
    signals: '<path d="M2 11h3l2-6 3 11 3-8 2 3h3"/>',
    timeline: '<path d="M3 5h9M6 10h11M3 15h7"/><circle cx="12" cy="5" r="1.5"/><circle cx="17" cy="10" r="1.5"/><circle cx="10" cy="15" r="1.5"/>',
    dossier: '<path d="M5 2h7l4 4v12H5zM12 2v4h4M8 10h5M8 13h5"/>',
    contact: '<path d="M10 12a2 2 0 100-4 2 2 0 000 4zM6 14a6 6 0 010-8M14 6a6 6 0 010 8M3.5 16.5a9.5 9.5 0 010-13M16.5 3.5a9.5 9.5 0 010 13"/>',
    search: '<circle cx="9" cy="9" r="5.5"/><path d="M13 13l4 4"/>',
    ext: '<path d="M7 4h9v9M16 4L5 15"/>',
    chart: '<path d="M3 17h14M6 14V9M10 14V5M14 14v-3"/>',
    flag: '<path d="M5 18V3M5 4h10l-2 3.5 2 3.5H5"/>',
    globe: '<circle cx="10" cy="10" r="7"/><path d="M3 10h14M10 3c2.5 2 2.5 12 0 14M10 3c-2.5 2-2.5 12 0 14"/>',
    calc: '<rect x="4" y="2.5" width="12" height="15" rx="1"/><path d="M7 6h6M7 10h1M10 10h1M7 13.5h1M10 13.5h1M13 10v4"/>',
    map: '<path d="M3 5l4.5-2 5 2 4.5-2v12l-4.5 2-5-2L3 17zM7.5 3v12M12.5 5v12"/>',
    ballot: '<path d="M3 11h14v6H3zM7 11V3h6v8M8.5 7l1.2 1.2L12 6"/>',
    bell: '<path d="M5 14V9a5 5 0 0110 0v5l1.5 2h-13zM8.5 18h3"/>',
    award: '<circle cx="10" cy="8" r="5"/><path d="M7 12l-1.5 6L10 16l4.5 2L13 12"/>',
    copy: '<rect x="7" y="7" width="9" height="10" rx="1"/><path d="M4 13V4a1 1 0 011-1h8"/>'
  };
  var ico = function (n, cls) { return '<svg class="' + (cls || 'ai') + '" viewBox="0 0 20 20" aria-hidden="true">' + ICON[n] + '</svg>'; };
  var ext = function (url, label, cls) {
    return '<a class="' + (cls || 'a-link') + '" href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(label) + ico('ext', 'ai ai-ext') + '</a>';
  };
  var SECTIONS = [
    ['overview', 'atlas.nav.overview'], ['assets', 'atlas.nav.assets'], ['ops', 'atlas.nav.ops'], ['signals', 'atlas.nav.signals'],
    ['timeline', 'atlas.nav.timeline'], ['dossier', 'atlas.nav.dossier'], ['contact', 'atlas.nav.contact']
  ];
  var MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
  var fmtNum = function (n) { return Number(n || 0).toLocaleString(lang()); };
  var fmtDate = function (d, o) { return new Date(d + (d.length === 10 ? 'T00:00:00' : '')).toLocaleDateString(lang(), o || { day: 'numeric', month: 'short', year: 'numeric' }); };
  var later = function (fn, ms) { state.timers.push(setTimeout(fn, ms)); };

  /* ---------- the shell ---------- */
  function shell() {
    var langs = ['en', 'pl', 'fr'].map(function (l) {
      return '<button type="button" data-a-lang="' + l + '" aria-pressed="' + (l === lang()) + '">' + l.toUpperCase() + '</button>';
    }).join('');
    var skins = '<button type="button" data-a-skin="pixel" aria-pressed="false">PIXEL</button><button type="button" data-a-skin="atlas" aria-pressed="true">ATLAS</button>';
    var rail = SECTIONS.map(function (s, i) {
      return '<a href="#a-' + s[0] + '" data-a-nav="' + s[0] + '">' + ico(s[0]) + '<span>' + esc(T(s[1])) + '</span><kbd>' + (i + 1) + '</kbd></a>';
    }).join('');
    return '' +
      '<header class="a-bar">' +
        '<a class="a-brand" href="#a-overview" aria-label="ATLAS, Adam Markocki">' +
          '<svg class="a-logo" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>' +
          '<span>ATLAS</span><i>⁄</i><span class="a-brand-sub">MARKOCKI</span></a>' +
        '<nav class="a-crumbs" aria-label="Breadcrumb"><span>' + esc(T('atlas.profiles')) + '</span><i>›</i><b>Markocki, Adam</b></nav>' +
        '<button type="button" class="a-search" data-a-palette>' + ico('search') + '<span>' + esc(T('atlas.search')) + '</span><kbd>⌘K</kbd></button>' +
        '<div class="a-clock" aria-hidden="true"><span><em>UTC</em><b data-clock="UTC">--:--:--</b></span><span><em>KRK</em><b data-clock="Europe/Warsaw">--:--:--</b></span></div>' +
        '<span class="a-livebadge"><i></i>LIVE</span>' +
        '<div class="a-seg" role="group" aria-label="Language">' + langs + '</div>' +
        '<div class="a-seg a-skin" role="group" aria-label="' + esc(T('skin.label')) + '">' + skins + '</div>' +
      '</header>' +
      '<nav class="a-rail" aria-label="Sections">' + rail + '</nav>' +
      '<main class="a-main" id="a-main">' +
        sOverview() + sGraph() + sAssets() + sOps() + sSignals() + sTimeline() + sDossier() + sContact() +
        '<footer class="a-foot"><span>© 2026 Adam Markocki · ' + esc(T('footer.made')) + '</span><span class="mono">SRC: GITHUB · APP STORE · TERRACRACOVIANUM.ORG</span></footer>' +
      '</main>' +
      '<div class="a-palette" hidden><div class="a-pal-box" role="dialog" aria-modal="true" aria-label="' + esc(T('atlas.search')) + '">' +
        '<div class="a-pal-in">' + ico('search') + '<input type="text" autocomplete="off" spellcheck="false" placeholder="' + esc(T('atlas.search')) + '…" aria-label="' + esc(T('atlas.search')) + '"><kbd>Esc</kbd></div>' +
        '<div class="a-pal-list" role="listbox"></div><p class="a-pal-hint">' + esc(T('atlas.pal.hint')) + '</p></div></div>' +
      '<div class="a-tip" role="tooltip" hidden></div>';
  }
  var head = function (id, idx, key, meta) {
    return '<header class="a-head"><span class="a-idx">' + idx + '</span><h2>' + esc(T(key)) + '</h2>' + (meta ? '<span class="a-meta">' + meta + '</span>' : '') + '</header>';
  };

  /* ---------- 01 overview ---------- */
  function sOverview() {
    var langs = (S.cv && S.cv.languages || []).map(function (l) { return esc(L(l.name)) + ' <span class="dim">' + esc(L(l.level)) + '</span>'; }).join(' · ');
    var title = T('hero.title').replace(/<br\s*\/?>/gi, ' ');
    var apps = S.projects.length, ios = S.projects.filter(function (p) { return /iOS/.test(p.platform || ''); }).length;
    var tools = S.collab ? S.collab.items.length : 0;
    return '<section class="a-sec" id="a-overview" data-a-sec="overview">' + head('overview', '01', 'atlas.nav.overview', 'SUBJECT · AM-0001') +
      '<div class="a-grid">' +
        '<article class="a-card a-subject span-5">' +
          '<div class="a-subj-top">' +
            '<div class="a-photo"><img src="' + esc(S.photo) + '" alt="Adam Markocki" width="132" height="132"><span class="a-ret"></span></div>' +
            '<div><span class="a-chip">' + esc(T('atlas.classification')) + '</span><h1>MARKOCKI, ADAM</h1><p class="a-sub">' + esc(title) + '</p></div>' +
          '</div>' +
          '<dl class="a-facts">' +
            '<dt>' + esc(T('atlas.base')) + '</dt><dd>Kraków, PL <span class="mono dim">50.06°N 19.94°E</span></dd>' +
            '<dt>' + esc(T('atlas.role')) + '</dt><dd>' + esc(T('atlas.roleval')) + '</dd>' +
            '<dt>' + esc(T('atlas.affiliation')) + '</dt><dd>Krakow University of Economics<br>Terra Cracovianum</dd>' +
            '<dt>' + esc(T('atlas.distinction')) + '</dt><dd class="amber">◆ ' + esc(T('toast.ssc')) + '</dd>' +
            '<dt>' + esc(T('atlas.kpi.langs')) + '</dt><dd>' + langs + '</dd>' +
          '</dl>' +
        '</article>' +
        '<article class="a-card a-mapcard span-7">' +
          '<div class="a-card-head"><h3>' + esc(T('atlas.map')) + '</h3><span class="a-readout mono" data-readout>LAT --.-- · LON --.--</span></div>' +
          '<div class="a-map"><canvas data-map></canvas></div>' +
        '</article>' +
        kpi(apps, 'atlas.kpi.apps', 'iOS ' + ios + ' · macOS ' + (apps - ios)) +
        kpi(tools, 'atlas.kpi.tools', 'Terra Cracovianum') +
        kpi(App.heat.total > 0 ? App.heat.total : 0, 'atlas.kpi.contrib', 'github.com/' + S.github, 'contrib') +
        kpi((S.cv && S.cv.languages || []).length, 'atlas.kpi.langs', 'PL · EN · FR') +
      '</div></section>';
  }
  function kpi(n, key, sub, id) {
    return '<article class="a-card a-kpi span-3"' + (id ? ' data-kpi="' + id + '"' : '') + '><span class="a-kpi-label">' + esc(T(key)) + '</span>' +
      '<b class="a-kpi-num mono" data-count="' + n + '">0</b><span class="a-kpi-sub mono">' + esc(sub) + '</span>' +
      (id === 'contrib' ? '<svg class="a-spark" viewBox="0 0 120 28" preserveAspectRatio="none" aria-hidden="true"></svg>' : '') + '</article>';
  }

  /* ---------- link graph ---------- */
  function graphModel() {
    var nodes = [], edges = [];
    var add = function (id, label, kind, x, y, extra) { nodes.push(Object.assign({ id: id, label: label, kind: kind, x: x, y: y }, extra || {})); };
    add('adam', 'ADAM MARKOCKI', 'center', 500, 270);
    add('terra', 'Terra Cracovianum', 'org', 310, 165, { go: 'ops' });
    add('uek', 'Krakow Univ. of Economics', 'org', 330, 395, { go: 'timeline' });
    add('wise', 'UEK Honors WISE', 'org', 140, 455, { go: 'dossier' });
    add('parl', 'Student Parliament', 'org', 150, 345, { go: 'dossier' });
    add('apple', 'Swift Student Challenge', 'award', 700, 95, { go: 'timeline' });
    var spots = [[790, 185], [880, 290], [800, 400], [650, 450], [950, 375]];
    S.projects.forEach(function (p, i) { var s = spots[i] || [700, 300 + i * 30]; add('p' + i, p.name, 'proj', s[0], s[1], { go: 'assets', row: 'p' + i }); edges.push(['adam', 'p' + i]); });
    var tools = S.collab ? S.collab.items : [];
    var tspots = [[95, 250], [80, 150], [150, 62], [300, 32], [450, 52], [540, 135]];   /* fanned so labels never collide */
    tools.forEach(function (t, i) {
      var sp = tspots[i] || [100 + i * 60, 40];
      add('t' + i, L(t.name), 'tool', sp[0], sp[1], { url: t.links[0].url });
      edges.push(['terra', 't' + i]);
    });
    edges.push(['adam', 'terra'], ['adam', 'uek'], ['uek', 'wise'], ['uek', 'parl'], ['adam', 'apple']);
    var award = S.projects.findIndex(function (p) { return p.badge; });
    if (award > -1) edges.push(['apple', 'p' + award, 'award']);
    return { nodes: nodes, edges: edges };
  }
  function sGraph() {
    return '<section class="a-sec" id="a-graph" data-a-sec="overview">' +
      '<article class="a-card a-graphcard"><div class="a-card-head"><div><h3>' + esc(T('atlas.graph')) + '</h3><p class="a-note">' + esc(T('atlas.graph.sub')) + '</p></div>' +
      '<ul class="a-legend"><li><i class="lg-org"></i>' + esc(T('atlas.legend.org')) + '</li><li><i class="lg-proj"></i>' + esc(T('atlas.legend.proj')) + '</li><li><i class="lg-award"></i>' + esc(T('atlas.legend.award')) + '</li></ul></div>' +
      '<div class="a-scroll"><svg class="a-graph" data-graph viewBox="0 0 1000 520" role="img" aria-label="' + esc(T('atlas.graph')) + '"></svg></div></article></section>';
  }
  function drawGraph() {
    var svg = $('[data-graph]'); if (!svg) return;
    var m = graphModel(), byId = {};
    m.nodes.forEach(function (n) { byId[n.id] = n; n.nb = {}; n.nb[n.id] = 1; });
    var html = '<g class="g-edges">';
    m.edges.forEach(function (e, i) {
      var a = byId[e[0]], b = byId[e[1]]; a.nb[b.id] = 1; b.nb[a.id] = 1;
      var len = Math.hypot(b.x - a.x, b.y - a.y);
      html += '<line class="g-edge' + (e[2] ? ' g-' + e[2] : '') + '" data-a="' + a.id + '" data-b="' + b.id + '" x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" style="--len:' + len.toFixed(0) + ';--d:' + (i * 35) + 'ms"/>';
    });
    html += '</g><g class="g-nodes">';
    m.nodes.forEach(function (n) {
      var shape;
      if (n.kind === 'center') shape = '<circle r="26" class="g-center"/><circle r="34" class="g-halo"/><text class="g-in" dy="4">AM</text>';
      else if (n.kind === 'org') shape = '<circle r="11" fill="' + C.org + '"/>';
      else if (n.kind === 'award') shape = '<rect x="-10" y="-10" width="20" height="20" transform="rotate(45)" fill="' + C.award + '"/>';
      else if (n.kind === 'proj') shape = '<rect x="-10" y="-10" width="20" height="20" rx="4" fill="' + C.proj + '"/>';
      else shape = '<rect x="-6" y="-6" width="12" height="12" rx="2" fill="none" stroke="' + C.proj + '" stroke-width="2"/>';
      var ly = n.kind === 'center' ? 52 : n.kind === 'tool' ? 20 : 27;
      html += '<g class="g-node g-' + n.kind + '" data-id="' + n.id + '" transform="translate(' + n.x.toFixed(1) + ',' + n.y.toFixed(1) + ')" tabindex="0" role="button" aria-label="' + esc(n.label) + '">' +
        '<circle r="22" class="g-hit"/>' + shape + '<text class="g-label' + (n.kind === 'tool' ? ' g-small' : '') + '" y="' + ly + '">' + esc(n.label) + '</text></g>';
    });
    svg.innerHTML = html + '</g>';
    var hl = function (id) {
      svg.classList.toggle('hl', !!id);
      $$('.g-node', svg).forEach(function (g) { g.classList.toggle('on', !!id && !!byId[id].nb[g.dataset.id]); });
      $$('.g-edge', svg).forEach(function (l) { l.classList.toggle('on', !!id && (l.dataset.a === id || l.dataset.b === id)); });
    };
    $$('.g-node', svg).forEach(function (g) {
      var n = byId[g.dataset.id];
      g.addEventListener('mouseenter', function () { hl(n.id); });
      g.addEventListener('mouseleave', function () { hl(null); });
      g.addEventListener('focus', function () { hl(n.id); });
      g.addEventListener('blur', function () { hl(null); });
      var act = function () {
        if (n.url) return window.open(n.url, '_blank', 'noopener');
        if (n.row) { state.open[n.row] = true; renderAssetRows(); }
        if (n.go) go(n.go, n.row ? '[data-row="' + n.row + '"]' : null);
      };
      g.addEventListener('click', act);
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
    });
  }

  /* ---------- 02 assets ---------- */
  function statusPill(s) {
    var map = { award: ['◆', 'award'], live: ['●', 'live'], beta: ['◐', 'beta'] }, m = map[s] || map.live;
    return '<span class="a-pill a-' + m[1] + '">' + m[0] + ' ' + esc(T('atlas.status.' + m[1])) + '</span>';
  }
  function sAssets() {
    var chips = [['all', T('atlas.filter.all')], ['ios', 'iOS'], ['mac', 'macOS']].map(function (c) {
      return '<button type="button" class="a-chipbtn" data-filter="' + c[0] + '" aria-pressed="' + (state.filter === c[0]) + '">' + esc(c[1]) + '</button>';
    }).join('');
    var th = function (k, key) { return '<th scope="col"><button type="button" data-sort="' + k + '">' + esc(T(key)) + '<span class="a-sort"></span></button></th>'; };
    return '<section class="a-sec" id="a-assets" data-a-sec="assets">' + head('assets', '02', 'atlas.assets', S.projects.length + ' RECORDS') +
      '<article class="a-card a-tablecard"><div class="a-toolbar">' + chips + '</div>' +
      '<div class="a-scroll"><table class="a-table"><thead><tr>' + th('name', 'atlas.col.name') + th('type', 'atlas.col.type') + th('platform', 'atlas.col.platform') + th('status', 'atlas.col.status') +
      '<th scope="col">' + esc(T('atlas.col.links')) + '</th></tr></thead><tbody data-assets></tbody></table></div></article></section>';
  }
  function renderAssetRows() {
    var tb = $('[data-assets]'); if (!tb) return;
    var rows = S.projects.map(function (p, i) { return { p: p, id: 'p' + i, name: p.name, type: L(p.kind), platform: p.platform || '', status: p.status || 'live' }; });
    rows = rows.filter(function (r) { return state.filter === 'all' || (state.filter === 'ios' ? /iOS/.test(r.platform) : /mac/i.test(r.platform)); });
    if (state.sort.key) {
      var order = { award: 0, live: 1, beta: 2 };
      rows.sort(function (a, b) {
        var x = a[state.sort.key], y = b[state.sort.key];
        if (state.sort.key === 'status') { x = order[x]; y = order[y]; }
        return (x > y ? 1 : x < y ? -1 : 0) * state.sort.dir;
      });
    }
    tb.innerHTML = rows.map(function (r) {
      var open = !!state.open[r.id];
      var links = (r.p.links || []).map(function (l) { return ext(l.url, /^[\w-]+\.[a-z]{2,}$/i.test(l.label) ? T('work.site') : l.label, 'a-link sm'); }).join('');
      return '<tr class="a-row' + (open ? ' open' : '') + '" data-row="' + r.id + '" tabindex="0" aria-expanded="' + open + '">' +
        '<td><span class="a-namecell"><img src="' + esc(r.p.image) + '" alt="" width="28" height="28" loading="lazy"><b>' + esc(r.name) + '</b></span></td>' +
        '<td>' + esc(r.type) + '</td><td class="mono">' + esc(r.platform) + '</td><td>' + statusPill(r.status) + '</td><td class="a-links">' + links + '</td></tr>' +
        '<tr class="a-detail"' + (open ? '' : ' hidden') + '><td colspan="5">' + esc(L(r.p.desc)) + (r.p.badge ? ' <span class="amber">◆ ' + esc(T('toast.ssc')) + '</span>' : '') + '</td></tr>';
    }).join('');
    $$('.a-row', tb).forEach(function (tr) {
      var toggle = function (e) { if (e.target.closest('a')) return; state.open[tr.dataset.row] = !state.open[tr.dataset.row]; renderAssetRows(); };
      tr.addEventListener('click', toggle);
      tr.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(e); } });
    });
    $$('[data-sort]').forEach(function (b) {
      var on = state.sort.key === b.dataset.sort;
      b.closest('th').setAttribute('aria-sort', on ? (state.sort.dir > 0 ? 'ascending' : 'descending') : 'none');
      $('.a-sort', b).textContent = on ? (state.sort.dir > 0 ? '▲' : '▼') : '↕';
    });
  }

  /* ---------- 03 operations ---------- */
  function sOps() {
    var Cb = S.collab; if (!Cb) return '';
    var rows = Cb.items.map(function (t, i) {
      return '<tr><td><span class="a-namecell"><span class="a-tico">' + (ICON[t.icon] ? ico(t.icon) : ico('ops')) + '</span><b>' + esc(L(t.name)) + '</b></span><span class="a-rowdesc">' + esc(L(t.desc)) + '</span></td>' +
        '<td>' + esc(L(t.kind)) + '</td><td class="a-links">' + t.links.map(function (l) { return ext(l.url, L(l.label), 'a-link sm'); }).join('') + '</td></tr>';
    }).join('');
    return '<section class="a-sec" id="a-ops" data-a-sec="ops">' + head('ops', '03', 'atlas.ops', Cb.items.length + ' TOOLS · LIVE') +
      '<article class="a-card a-tablecard"><div class="a-opshead"><img class="a-crest" src="' + esc(Cb.logo) + '" alt="" width="48" height="48"><p>' + esc(T('collab.text')) + '</p>' + ext(Cb.url, T('collab.all'), 'a-btn ghost') + '</div>' +
      '<div class="a-scroll"><table class="a-table a-ops"><thead><tr><th scope="col">' + esc(T('atlas.col.name')) + '</th><th scope="col">' + esc(T('atlas.col.type')) + '</th><th scope="col">' + esc(T('atlas.col.links')) + '</th></tr></thead><tbody>' + rows + '</tbody></table></div></article></section>';
  }

  /* ---------- 04 signals ---------- */
  function sSignals() {
    return '<section class="a-sec" id="a-signals" data-a-sec="signals">' + head('signals', '04', 'atlas.signals', 'SRC: GITHUB · ' + esc(S.github.toUpperCase())) +
      '<div class="a-grid">' +
        '<article class="a-card span-8"><div class="a-card-head"><h3>' + esc(T('atlas.weekly')) + '</h3><span class="a-readout mono" data-weekread></span></div><div class="a-chart" data-weekly></div></article>' +
        '<article class="a-card span-4 a-stats" data-stats></article>' +
        '<article class="a-card span-12"><div class="a-card-head"><h3>' + esc(T('atlas.daily')) + '</h3>' + ext('https://github.com/' + S.github, 'GitHub', 'a-link sm') + '</div><div class="a-scroll"><svg class="a-heat" data-heat></svg></div></article>' +
      '</div></section>';
  }
  function drawSignals() {
    var days = App.heat.days;
    var wk = $('[data-weekly]'), st = $('[data-stats]'), hm = $('[data-heat]');
    if (!wk || !days || !days.length) return;
    var weeks = [];
    for (var i = 0; i < days.length; i += 7) {
      var chunk = days.slice(i, i + 7);
      weeks.push({ date: chunk[0].date, n: chunk.reduce(function (a, d) { return a + d.count; }, 0) });
    }
    /* area chart */
    var W = 760, H = 220, P = { l: 40, r: 12, t: 14, b: 26 }, max = Math.max.apply(null, weeks.map(function (w) { return w.n; })) || 1;
    var nice = Math.ceil(max / 50) * 50 || 10;
    var x = function (i) { return P.l + i * (W - P.l - P.r) / Math.max(1, weeks.length - 1); };
    var y = function (v) { return H - P.b - v / nice * (H - P.t - P.b); };
    var line = weeks.map(function (w, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(w.n).toFixed(1); }).join('');
    var area = line + 'L' + x(weeks.length - 1).toFixed(1) + ' ' + y(0) + 'L' + x(0) + ' ' + y(0) + 'Z';
    var grid = [0, nice / 2, nice].map(function (v) { return '<line class="c-grid" x1="' + P.l + '" x2="' + (W - P.r) + '" y1="' + y(v) + '" y2="' + y(v) + '"/><text class="c-ax" x="' + (P.l - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + v + '</text>'; }).join('');
    var lastM = -1, ticks = '';
    weeks.forEach(function (w, i) {
      var m = new Date(w.date + 'T00:00:00').getMonth();
      if (m !== lastM && i > 0) ticks += '<text class="c-ax" x="' + x(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(new Date(w.date + 'T00:00:00').toLocaleDateString(lang(), { month: 'short' })) + '</text>';
      lastM = m;
    });
    wk.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="a-area" role="img" aria-label="' + esc(T('atlas.weekly')) + '"><defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4c90f0" stop-opacity=".35"/><stop offset="1" stop-color="#4c90f0" stop-opacity="0"/></linearGradient></defs>' +
      grid + ticks + '<path class="c-area" d="' + area + '"/><path class="c-line" d="' + line + '"/><line class="c-cross" y1="' + P.t + '" y2="' + y(0) + '" x1="-10" x2="-10"/><circle class="c-dot" r="4" cx="-10" cy="-10"/><rect class="c-hit" x="' + P.l + '" y="0" width="' + (W - P.l - P.r) + '" height="' + H + '"/></svg>';
    var svg = $('svg', wk), cross = $('.c-cross', svg), dot = $('.c-dot', svg), read = $('[data-weekread]');
    var idle = T('atlas.total') + ' · ' + fmtNum(App.heat.total > 0 ? App.heat.total : weeks.reduce(function (a, w) { return a + w.n; }, 0));
    read.textContent = idle;
    $('.c-hit', svg).addEventListener('mousemove', function (e) {
      var r = svg.getBoundingClientRect(), px = (e.clientX - r.left) / r.width * W;
      var i = Math.max(0, Math.min(weeks.length - 1, Math.round((px - P.l) / ((W - P.l - P.r) / Math.max(1, weeks.length - 1)))));
      cross.setAttribute('x1', x(i)); cross.setAttribute('x2', x(i)); dot.setAttribute('cx', x(i)); dot.setAttribute('cy', y(weeks[i].n));
      read.textContent = T('atlas.week') + ' ' + fmtDate(weeks[i].date) + ' · ' + fmtNum(weeks[i].n);
    });
    $('.c-hit', svg).addEventListener('mouseleave', function () { cross.setAttribute('x1', -10); cross.setAttribute('x2', -10); dot.setAttribute('cx', -10); read.textContent = idle; });
    /* stats */
    var last7 = days.slice(-7).reduce(function (a, d) { return a + d.count; }, 0), streak = 0, run = 0, best = days[0];
    days.forEach(function (d) { run = d.count > 0 ? run + 1 : 0; streak = Math.max(streak, run); if (d.count > best.count) best = d; });
    var total = App.heat.total > 0 ? App.heat.total : days.reduce(function (a, d) { return a + d.count; }, 0);
    st.innerHTML = '<h3>' + esc(T('atlas.nav.signals')) + '</h3><dl class="a-statlist">' +
      '<div><dt>' + esc(T('atlas.total')) + '</dt><dd class="mono" data-count="' + total + '">' + fmtNum(total) + '</dd></div>' +
      '<div><dt>' + esc(T('atlas.last7')) + '</dt><dd class="mono">' + fmtNum(last7) + '</dd></div>' +
      '<div><dt>' + esc(T('atlas.streak')) + '</dt><dd class="mono">' + streak + ' <small>' + esc(T('atlas.days')) + '</small></dd></div>' +
      '<div><dt>' + esc(T('atlas.best')) + '</dt><dd class="mono">' + fmtNum(best.count) + ' <small>' + esc(fmtDate(best.date)) + '</small></dd></div></dl>';
    /* heatmap */
    var cell = 11, gap = 3, first = new Date(days[0].date + 'T00:00:00').getDay(), cols = Math.ceil((days.length + first) / 7);
    var colors = ['#252a31', '#184a90', '#215db0', '#2d72d2', '#8abbff'], cells = '';
    days.forEach(function (d, k) {
      var c = Math.floor((k + first) / 7), r = (k + first) % 7;
      cells += '<rect x="' + (28 + c * (cell + gap)) + '" y="' + (r * (cell + gap)) + '" width="' + cell + '" height="' + cell + '" rx="2" fill="' + colors[d.level] + '"><title>' + esc(fmtDate(d.date)) + ' · ' + d.count + '</title></rect>';
    });
    var labels = [1, 3, 5].map(function (r) {
      var dt = new Date(2026, 10, 1 + r + (7 - new Date(2026, 10, 1).getDay()) % 7);
      return '<text class="c-ax" x="0" y="' + (r * (cell + gap) + 9) + '">' + esc(dt.toLocaleDateString(lang(), { weekday: 'short' })) + '</text>';
    }).join('');
    var wpx = 28 + cols * (cell + gap);
    hm.setAttribute('viewBox', '0 0 ' + wpx + ' ' + (7 * (cell + gap)));
    hm.style.minWidth = Math.min(wpx, 720) + 'px';
    hm.innerHTML = labels + cells;
    /* KPI sparkline */
    var sp = root.querySelector('.a-spark');
    if (sp) {
      var sx = function (i) { return i * 120 / Math.max(1, weeks.length - 1); }, sy = function (v) { return 26 - v / nice * 24; };
      sp.innerHTML = '<path d="' + weeks.map(function (w, i) { return (i ? 'L' : 'M') + sx(i).toFixed(1) + ' ' + sy(w.n).toFixed(1); }).join('') + '" fill="none" stroke="#4c90f0" stroke-width="1.5"/>';
    }
    var k = root.querySelector('[data-kpi="contrib"] .a-kpi-num');
    if (k && total) { k.dataset.count = total; if (k.dataset.done) k.textContent = fmtNum(total); }
  }

  /* ---------- 05 timeline ---------- */
  function parseSpan(str) {
    var now = new Date(), s = String(str).toLowerCase(), parts = s.split(/\s*[—–-]\s*/);
    var read = function (p) {
      var y = (p.match(/\d{4}/) || [])[0], m = (p.match(/[a-z]{3}/) || [])[0];
      return { y: y ? +y : null, m: m in MONTHS ? MONTHS[m] : null, now: /now|obecnie|aujourd/.test(p) };
    };
    var a = read(parts[0]), b = parts[1] ? read(parts[1]) : null;
    if (!a.y && b && b.y) a.y = b.y;
    if (b && !b.y && !b.now) b.y = a.y;
    var start = new Date(a.y, a.m != null ? a.m : 0, 1);
    var end = !b ? new Date(a.y, a.m != null ? a.m + 1 : 12, 0) : b.now ? now : new Date(b.y, b.m != null ? b.m + 1 : 12, 0);
    return { start: start, end: end, point: !b && a.m == null, ongoing: !!(b && b.now) };
  }
  function timelineItems() {
    var items = [];
    (S.journey || []).forEach(function (j) {
      if (j.next) return;
      var sp = parseSpan(L(j.when).split('·')[0]);
      var lane = j.gold ? 'award' : /education|liceum|lycée|school|relations|stosunki/i.test(L(j.title) + ' ' + j.icon) || j.icon === 'book' || j.icon === 'globe' ? 'edu' : 'work';
      items.push({ label: L(j.title), sub: L(j.text), lane: lane, span: sp, point: lane === 'award' });
    });
    (S.cv && S.cv.experience || []).forEach(function (e) {
      if (/terra/i.test(e.place)) return;
      items.push({ label: L(e.title) + ' · ' + e.place, sub: e.years, lane: 'work', span: parseSpan(e.years) });
    });
    var order = { award: 0, work: 1, edu: 2 };
    return items.sort(function (a, b) { return order[a.lane] - order[b.lane] || b.span.start - a.span.start; });
  }
  function sTimeline() {
    return '<section class="a-sec" id="a-timeline" data-a-sec="timeline">' + head('timeline', '05', 'atlas.timeline', '2015 — 2027') +
      '<article class="a-card"><div class="a-card-head"><span class="a-readout mono" data-tlread></span>' +
      '<ul class="a-legend"><li><i class="lg-award"></i>' + esc(T('atlas.lane.award')) + '</li><li><i class="lg-proj"></i>' + esc(T('atlas.lane.work')) + '</li><li><i class="lg-org"></i>' + esc(T('atlas.lane.edu')) + '</li></ul></div>' +
      '<div class="a-scroll"><svg class="a-tl" data-tl></svg></div></article></section>';
  }
  function drawTimeline() {
    var svg = $('[data-tl]'); if (!svg) return;
    var items = timelineItems(), Y0 = 2015, Y1 = 2028, W = 1000, LW = 280, R = 30, top = 30;
    var H = top + items.length * R + 10, now = new Date();
    var x = function (d) { return LW + (d.getFullYear() + d.getMonth() / 12 + d.getDate() / 365 - Y0) / (Y1 - Y0) * (W - LW - 16); };
    var col = { award: C.award, work: C.proj, edu: C.org };
    var g = '';
    for (var yr = Y0; yr <= Y1; yr++) {
      var xx = x(new Date(yr, 0, 1));
      g += '<line class="c-grid" x1="' + xx + '" x2="' + xx + '" y1="' + (top - 8) + '" y2="' + (H - 4) + '"/>' + (yr < Y1 ? '<text class="c-ax" x="' + (xx + 4) + '" y="14">' + yr + '</text>' : '');
    }
    var tx = x(now);
    g += '<line class="c-today" x1="' + tx + '" x2="' + tx + '" y1="' + (top - 10) + '" y2="' + (H - 4) + '"/><text class="c-ax c-todayl" x="' + (tx + 4) + '" y="' + (H - 6) + '">' + esc(T('atlas.today')) + '</text>';
    items.forEach(function (it, i) {
      var cy = top + i * R + R / 2, x1 = x(it.span.start), x2 = Math.max(x1 + 6, x(it.span.end));
      g += '<g class="tl-row" data-i="' + i + '" tabindex="0"><rect class="tl-band" x="0" y="' + (cy - R / 2) + '" width="' + W + '" height="' + R + '"/>' +
        '<text class="tl-label" x="0" y="' + (cy + 4) + '">' + esc(it.label.length > 40 ? it.label.slice(0, 39) + '…' : it.label) + '</text>';
      if (it.point) {
        g += '<rect x="' + (x1 - 7) + '" y="' + (cy - 7) + '" width="14" height="14" transform="rotate(45 ' + x1 + ' ' + cy + ')" fill="' + col[it.lane] + '"/>';
      } else {
        var past = Math.min(x2, tx);
        if (past > x1) g += '<rect class="tl-bar" x="' + x1 + '" y="' + (cy - 6) + '" width="' + Math.max(4, past - x1) + '" height="12" rx="3" fill="' + col[it.lane] + '"/>';
        if (x2 > tx) g += '<rect class="tl-future" x="' + Math.max(x1, tx) + '" y="' + (cy - 6) + '" width="' + (x2 - Math.max(x1, tx)) + '" height="12" rx="3" stroke="' + col[it.lane] + '"/>';
        if (it.span.ongoing) g += '<circle class="tl-pulse" cx="' + tx + '" cy="' + cy + '" r="4" fill="' + col[it.lane] + '"/>';
      }
      g += '</g>';
    });
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.innerHTML = g;
    var read = $('[data-tlread]'), idle = items.length + ' EVENTS';
    read.textContent = idle;
    var fmtM = function (d) { return d.toLocaleDateString(lang(), { month: 'short', year: 'numeric' }); };
    $$('.tl-row', svg).forEach(function (r) {
      var it = items[+r.dataset.i];
      var show = function () { read.textContent = it.label + ' · ' + (it.point ? it.span.start.getFullYear() : fmtM(it.span.start) + ' — ' + (it.span.ongoing ? T('atlas.today') : fmtM(it.span.end))); };
      r.addEventListener('mouseenter', show); r.addEventListener('focus', show);
      r.addEventListener('mouseleave', function () { read.textContent = idle; });
    });
  }

  /* ---------- 06 dossier ---------- */
  function sDossier() {
    var cv = S.cv || {}, rd = function (t) { return '<span class="rd">' + esc(t) + '</span>'; };
    var exp = (cv.experience || []).map(function (e) { return '<li><span><b>' + rd(L(e.title)) + '</b> · ' + rd(e.place) + '</span><span class="mono dim">' + rd(e.years) + '</span></li>'; }).join('');
    var act = (cv.activities || []).map(function (a) { return '<li><b>' + rd(L(a.name)) + '</b><span class="dim">' + rd(L(a.role)) + '</span></li>'; }).join('');
    var lng = (cv.languages || []).map(function (l) { return '<li><b>' + rd(L(l.name)) + '</b><span class="mono dim">' + rd(L(l.level)) + '</span></li>'; }).join('');
    var cert = (cv.certificates || []).map(function (c) { return '<li>' + rd(c) + '</li>'; }).join('');
    var dc = state.declassified;
    return '<section class="a-sec" id="a-dossier" data-a-sec="dossier">' + head('dossier', '06', 'atlas.dossier', 'FILE AM-2026-CV') +
      '<article class="a-card a-file' + (dc ? ' open' : '') + '">' +
        '<div class="a-filehead"><span class="a-stamp ' + (dc ? 'ok' : '') + '">' + esc(T(dc ? 'atlas.declassified' : 'atlas.restricted')) + '</span>' +
        '<p class="a-note">' + esc(dc ? T('atlas.cleared') : T('atlas.redacted')) + '</p>' +
        (dc ? '' : '<button type="button" class="a-btn" data-declassify>' + esc(T('atlas.declassify')) + '</button>') + '</div>' +
        '<div class="a-filebody"><span class="a-scanline"></span>' +
          '<section><h4>' + esc(T('cv.experience')) + '</h4><ul class="a-rows">' + exp + '</ul></section>' +
          '<section><h4>' + esc(T('cv.activities')) + '</h4><ul class="a-rows stack">' + act + '</ul></section>' +
          '<section><h4>' + esc(T('cv.languages')) + '</h4><ul class="a-rows">' + lng + '</ul></section>' +
          '<section class="wide"><h4>' + esc(T('cv.certificates')) + '</h4><ul class="a-cert">' + cert + '</ul></section>' +
        '</div></article></section>';
  }
  function declassify(instant) {
    if (state.declassified) return;
    state.declassified = true;
    var file = $('.a-file'); if (!file) return;
    var body = $('.a-filebody', file), h = body.offsetHeight || 1;
    $$('.rd', body).forEach(function (r) { r.style.setProperty('--d', Math.round((r.offsetTop / h) * 1100) + 'ms'); });
    var done = function () {
      var stamp = $('.a-stamp', file); stamp.textContent = T('atlas.declassified'); stamp.classList.add('ok');
      $('.a-note', file).textContent = T('atlas.cleared');
      var b = $('[data-declassify]', file); if (b) b.remove();
    };
    if (instant || reduce.matches) { file.classList.add('open', 'nomotion'); done(); return; }
    file.classList.add('scanning');
    requestAnimationFrame(function () { file.classList.add('open'); });
    App.blip([330, 440, 660]);
    later(function () { done(); file.classList.remove('scanning'); }, 1300);
    if (App.once('declassify')) later(function () { App.toast(T('toast.title'), T('atlas.cleared'), 'star'); }, 900);
  }

  /* ---------- 07 contact ---------- */
  function sContact() {
    var email = S.email;
    var socials = S.socials.map(function (s) { return '<li><span class="mono dim">' + esc(s.label) + '</span>' + ext(s.url, s.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''), 'a-link') + '</li>'; }).join('');
    return '<section class="a-sec" id="a-contact" data-a-sec="contact">' + head('contact', '07', 'atlas.channel', 'ENCRYPTED · TLS 1.3') +
      '<div class="a-grid"><article class="a-card a-term span-7"><div class="a-term-bar"><i></i><i></i><i></i><span>secure-channel — adam@krk</span></div>' +
        '<div class="a-term-body mono"><p><span class="pr">$</span> establish-contact --with adam --lang ' + lang() + '</p>' +
        '<p class="ok">→ ' + esc(T('contact.title')) + '</p><p class="dim">→ ' + esc(T('contact.text')) + '</p>' +
        '<p><span class="pr">$</span> <span class="a-caret"></span></p></div>' +
        (email ? '<div class="a-term-actions"><a class="a-btn" href="mailto:' + esc(email) + '">' + esc(T('contact.email')) + '</a><button type="button" class="a-btn ghost" data-copy>' + ico('copy') + esc(T('atlas.copy')) + '</button><span class="mono dim">' + esc(email) + '</span></div>' : '') +
      '</article><article class="a-card span-5"><h3>Channels</h3><ul class="a-socials">' + socials + '</ul></article></div></section>';
  }

  /* ---------- world map ---------- */
  var PINS = [
    { id: 'krk', lat: 50.06, lon: 19.94, name: 'Kraków', home: true, side: 'bl', sub: { en: 'Base · Krakow University of Economics · Terra Cracovianum', pl: 'Baza · Uniwersytet Ekonomiczny · Terra Cracovianum', fr: 'Base · Université d’économie · Terra Cracovianum' } },
    { id: 'waw', lat: 52.23, lon: 21.01, name: { en: 'Warsaw', pl: 'Warszawa', fr: 'Varsovie' }, side: 'tr', sub: { en: 'World Embassies map', pl: 'Mapa „Ambasady świata”', fr: 'Carte « Ambassades du monde »' } },
    { id: 'par', lat: 48.86, lon: 2.35, name: 'Paris', side: 'tl', sub: { en: 'World Embassies map · French A1–A2', pl: 'Mapa „Ambasady świata” · francuski A1–A2', fr: 'Carte « Ambassades du monde » · français A1–A2' } },
    { id: 'cup', lat: 37.33, lon: -122.01, name: 'Cupertino', side: 'tr', sub: { en: 'Apple · Swift Student Challenge 2026 — SafePoland', pl: 'Apple · Swift Student Challenge 2026 — SafePoland', fr: 'Apple · Swift Student Challenge 2026 — SafePoland' } }
  ];
  var VIEW = { lon0: -132, lon1: 52, lat0: 74, lat1: -2 };
  function drawMap() {
    var cv = $('[data-map]'); if (!cv || !window.WORLD) return;
    var box = cv.parentNode, dpr = Math.min(2, window.devicePixelRatio || 1);
    var w = box.clientWidth, h = Math.round(w * (VIEW.lat0 - VIEW.lat1) / (VIEW.lon1 - VIEW.lon0) * 1.12);
    cv.width = w * dpr; cv.height = h * dpr; cv.style.height = h + 'px';
    var g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0);
    var px = function (lon, lat) { return [(lon - VIEW.lon0) / (VIEW.lon1 - VIEW.lon0) * w, (VIEW.lat0 - lat) / (VIEW.lat0 - VIEW.lat1) * h]; };
    var Wd = window.WORLD, dots = [];
    Wd.rows.forEach(function (row, r) {
      var lat = Wd.latMax - r * Wd.step;
      if (lat > VIEW.lat0 || lat < VIEW.lat1) return;
      for (var c = 0; c < Wd.cols; c++) {
        if (!((parseInt(row[c >> 2], 16) >> (3 - (c & 3))) & 1)) continue;
        var lon = -180 + Wd.step / 2 + c * Wd.step;
        if (lon < VIEW.lon0 || lon > VIEW.lon1) continue;
        dots.push(px(lon, lat));
      }
    });
    var pins = PINS.map(function (p) { var q = px(p.lon, p.lat); return Object.assign({}, p, { x: q[0], y: q[1] }); });
    var home = pins[0], t0 = performance.now(), hover = null;
    var arcs = pins.slice(1).map(function (p, i) {
      var d = Math.hypot(p.x - home.x, p.y - home.y);
      return { p: p, cx: (p.x + home.x) / 2, cy: Math.min(p.y, home.y) - Math.max(18, d * 0.32), delay: 300 + i * 350 };
    });
    var dotR = Math.max(1.1, w / 520);
    function frame(now) {
      var t = reduce.matches ? 1e5 : now - t0;
      g.clearRect(0, 0, w, h);
      g.fillStyle = '#2f343c';
      dots.forEach(function (d) { g.fillRect(d[0] - dotR, d[1] - dotR, dotR * 2, dotR * 2); });
      g.fillStyle = 'rgba(76,144,240,.38)';
      dots.forEach(function (d) { if (Math.hypot(d[0] - home.x, d[1] - home.y) < w * 0.07) g.fillRect(d[0] - dotR, d[1] - dotR, dotR * 2, dotR * 2); });
      arcs.forEach(function (a) {
        var k = Math.max(0, Math.min(1, (t - a.delay) / 900));
        if (!k) return;
        g.strokeStyle = a.p.id === 'cup' ? 'rgba(214,138,46,.9)' : 'rgba(76,144,240,.85)'; g.lineWidth = 1.5;
        g.beginPath(); g.moveTo(home.x, home.y);
        var steps = 40;
        for (var s = 1; s <= Math.round(steps * k); s++) {
          var u = s / steps, xx = (1 - u) * (1 - u) * home.x + 2 * (1 - u) * u * a.cx + u * u * a.p.x, yy = (1 - u) * (1 - u) * home.y + 2 * (1 - u) * u * a.cy + u * u * a.p.y;
          g.lineTo(xx, yy);
        }
        g.stroke();
        if (k >= 1 && !reduce.matches) {
          var u2 = ((t - a.delay) % 2600) / 2600, cxp = (1 - u2) * (1 - u2) * home.x + 2 * (1 - u2) * u2 * a.cx + u2 * u2 * a.p.x, cyp = (1 - u2) * (1 - u2) * home.y + 2 * (1 - u2) * u2 * a.cy + u2 * u2 * a.p.y;
          g.fillStyle = '#e6f0ff'; g.beginPath(); g.arc(cxp, cyp, 2, 0, 6.3); g.fill();
        }
      });
      pins.forEach(function (p) {
        var col = p.id === 'cup' ? C.award : C.org;
        if (p.home) {
          var ph = reduce.matches ? 0.5 : ((t % 2000) / 2000);
          g.strokeStyle = 'rgba(76,144,240,' + (1 - ph) * 0.8 + ')'; g.lineWidth = 1.5;
          g.beginPath(); g.arc(p.x, p.y, 5 + ph * 16, 0, 6.3); g.stroke();
        }
        g.fillStyle = col; g.beginPath(); g.arc(p.x, p.y, p.home ? 5 : 4, 0, 6.3); g.fill();
        g.strokeStyle = '#1c2127'; g.lineWidth = 2; g.stroke();
        var label = L(p.name).toUpperCase(), lx = p.x + (/r/.test(p.side) ? 10 : -10), ly = p.y + (/b/.test(p.side) ? 18 : -10);
        g.font = '600 11px Inter, system-ui, sans-serif'; g.textAlign = /r/.test(p.side) ? 'left' : 'right';
        var tw = g.measureText(label).width;
        g.fillStyle = 'rgba(28,33,39,.92)'; g.fillRect(/r/.test(p.side) ? lx - 3 : lx - tw - 3, ly - 11, tw + 6, 15);
        g.fillStyle = hover === p ? '#ffffff' : '#c9d4e0'; g.fillText(label, lx, ly);
      });
      if (state.visible && !reduce.matches) state.raf = requestAnimationFrame(frame);
    }
    cancelAnimationFrame(state.raf);
    state.raf = requestAnimationFrame(frame);
    var tip = $('.a-tip'), read = $('[data-readout]');
    cv.onmousemove = function (e) {
      var r = cv.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
      var lon = VIEW.lon0 + mx / w * (VIEW.lon1 - VIEW.lon0), lat = VIEW.lat0 - my / h * (VIEW.lat0 - VIEW.lat1);
      read.textContent = 'LAT ' + lat.toFixed(2) + ' · LON ' + lon.toFixed(2);
      hover = null;
      pins.forEach(function (p) { if (Math.hypot(p.x - mx, p.y - my) < 14) hover = p; });
      if (hover) {
        tip.hidden = false; tip.innerHTML = '<b>' + esc(L(hover.name)) + '</b><span class="mono dim">' + hover.lat.toFixed(2) + '°N ' + Math.abs(hover.lon).toFixed(2) + '°' + (hover.lon < 0 ? 'W' : 'E') + '</span><span>' + esc(L(hover.sub)) + '</span>';
        tip.style.left = (e.clientX + 14) + 'px'; tip.style.top = (e.clientY + 14) + 'px';
      } else tip.hidden = true;
      if (reduce.matches) frame(performance.now());
    };
    cv.onmouseleave = function () { tip.hidden = true; hover = null; read.textContent = 'LAT --.-- · LON --.--'; };
  }

  /* ---------- command palette ---------- */
  function paletteItems() {
    var items = SECTIONS.map(function (s, i) { return { g: 'atlas.pal.sections', label: T(s[1]), hint: String(i + 1), run: function () { go(s[0]); } }; });
    S.projects.forEach(function (p, i) { items.push({ g: 'atlas.pal.items', label: p.name, hint: L(p.kind), run: function () { state.open['p' + i] = true; renderAssetRows(); go('assets', '[data-row="p' + i + '"]'); } }); });
    (S.collab ? S.collab.items : []).forEach(function (t) { items.push({ g: 'atlas.pal.items', label: L(t.name), hint: L(t.kind) + ' ↗', run: function () { window.open(t.links[0].url, '_blank', 'noopener'); } }); });
    if (S.email) items.push({ g: 'atlas.pal.actions', label: T('atlas.copy'), hint: S.email, run: copyEmail });
    items.push({ g: 'atlas.pal.actions', label: T('atlas.declassify'), hint: 'CV', run: function () { go('dossier'); later(function () { declassify(); }, 500); } });
    items.push({ g: 'atlas.pal.actions', label: T('atlas.pal.pixel'), hint: 'PIXEL', run: function () { App.setSkin('pixel'); } });
    ['en', 'pl', 'fr'].forEach(function (l) { items.push({ g: 'atlas.pal.actions', label: 'Language → ' + l.toUpperCase(), hint: l.toUpperCase(), run: function () { App.setLang(l); openPalette(); } }); });
    return items;
  }
  var palSel = 0, palList = [];
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function renderPalette(q) {
    var list = $('.a-pal-list'), all = paletteItems(), nq = norm(q || '');
    palList = all.filter(function (it) { return !nq || norm(it.label + ' ' + it.hint).indexOf(nq) > -1; });
    palSel = Math.min(palSel, Math.max(0, palList.length - 1));
    if (!palList.length) { list.innerHTML = '<p class="a-pal-empty">' + esc(T('atlas.pal.empty')) + '</p>'; return; }
    var html = '', lastG = '';
    palList.forEach(function (it, i) {
      if (it.g !== lastG) { html += '<p class="a-pal-g">' + esc(T(it.g)) + '</p>'; lastG = it.g; }
      html += '<button type="button" role="option" class="a-pal-it' + (i === palSel ? ' sel' : '') + '" aria-selected="' + (i === palSel) + '" data-i="' + i + '"><span>' + esc(it.label) + '</span><span class="mono dim">' + esc(it.hint) + '</span></button>';
    });
    list.innerHTML = html;
    $$('.a-pal-it', list).forEach(function (b) {
      b.addEventListener('click', function () { runPal(+b.dataset.i); });
      b.addEventListener('mousemove', function () { if (palSel !== +b.dataset.i) { palSel = +b.dataset.i; renderPalette($('.a-pal-in input').value); } });
    });
    var sel = $('.a-pal-it.sel', list); if (sel) sel.scrollIntoView({ block: 'nearest' });
  }
  function runPal(i) { var it = palList[i]; if (!it) return; closePalette(); it.run(); }
  function openPalette() {
    var p = $('.a-palette'); if (!p) return;
    p.hidden = false; palSel = 0;
    var inp = $('.a-pal-in input'); inp.value = ''; renderPalette(''); inp.focus();
    App.blip([700]);
  }
  function closePalette() { var p = $('.a-palette'); if (p) p.hidden = true; }

  /* ---------- behaviour ---------- */
  function go(sec, sel) {
    var el = root.querySelector('#a-' + sec); if (!el) return;
    var target = sel ? root.querySelector(sel) || el : el;
    var y = target.getBoundingClientRect().top + scrollY - (innerWidth <= 900 ? 64 : 76);
    scrollTo({ top: y, behavior: reduce.matches ? 'auto' : 'smooth' });
    if (sel && target !== el) { target.classList.add('flash'); later(function () { target.classList.remove('flash'); }, 1600); }
  }
  function copyEmail() {
    if (!S.email || !navigator.clipboard) return;
    navigator.clipboard.writeText(S.email).then(function () { App.toast(T('atlas.copied'), S.email, 'mail'); }, function () {});
  }
  function countUp(el) {
    if (el.dataset.done) return; el.dataset.done = '1';
    var to = +el.dataset.count || 0;
    if (reduce.matches || !to) { el.textContent = fmtNum(to); return; }
    var t0 = performance.now();
    (function step(now) {
      var k = Math.min(1, (now - t0) / 900), e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmtNum(Math.round((+el.dataset.count || to) * e));
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  function wire() {
    $$('[data-a-lang]').forEach(function (b) { b.addEventListener('click', function () { App.setLang(b.dataset.aLang); }); });
    $$('[data-a-skin]').forEach(function (b) { b.addEventListener('click', function () { App.setSkin(b.dataset.aSkin); }); });
    $('[data-a-palette]').addEventListener('click', openPalette);
    $('.a-palette').addEventListener('click', function (e) { if (e.target === this) closePalette(); });
    $('.a-pal-in input').addEventListener('input', function () { palSel = 0; renderPalette(this.value); });
    $('.a-pal-in input').addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); palSel = Math.min(palList.length - 1, palSel + 1); renderPalette(this.value); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); palSel = Math.max(0, palSel - 1); renderPalette(this.value); }
      else if (e.key === 'Enter') { e.preventDefault(); runPal(palSel); }
      else if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
    });
    $$('[data-filter]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.filter = b.dataset.filter;
        $$('[data-filter]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        renderAssetRows();
      });
    });
    $$('[data-sort]').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.sort;
        state.sort = state.sort.key === k ? { key: k, dir: -state.sort.dir } : { key: k, dir: 1 };
        renderAssetRows();
      });
    });
    var dc = $('[data-declassify]'); if (dc) dc.addEventListener('click', function () { declassify(); });
    var cp = $('[data-copy]'); if (cp) cp.addEventListener('click', copyEmail);
    $$('[data-a-nav]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); go(a.dataset.aNav); }); });
    $('.a-brand').addEventListener('click', function (e) { e.preventDefault(); go('overview'); });

    /* active section in the rail, reveal + count-ups */
    state.io.forEach(function (o) { o.disconnect(); }); state.io = [];
    var navIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var s = e.target.dataset.aSec;
        $$('[data-a-nav]').forEach(function (a) { var on = a.dataset.aNav === s; a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('[data-a-sec]').forEach(function (s) { navIO.observe(s); });
    var revIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        $$('[data-count]', e.target).forEach(countUp);
        revIO.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.a-card').forEach(function (c) { revIO.observe(c); });
    state.io.push(navIO, revIO);
  }
  function tickClock() {
    $$('[data-clock]').forEach(function (b) {
      try { b.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: b.dataset.clock, hour12: false }); } catch (e) {}
    });
  }
  function onKey(e) {
    if (!state.visible) return;
    var typing = /input|textarea|select/i.test(e.target.tagName);
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); var p = $('.a-palette'); if (p.hidden) openPalette(); else closePalette(); return; }
    if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === '/') { e.preventDefault(); openPalette(); return; }
    if (e.key === 'Escape') { closePalette(); return; }
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= SECTIONS.length && $('.a-palette').hidden) { e.preventDefault(); go(SECTIONS[n - 1][0]); }
  }
  addEventListener('keydown', onKey);
  var rz;
  addEventListener('resize', function () { if (!state.visible) return; clearTimeout(rz); rz = setTimeout(drawMap, 150); });

  /* ---------- public ---------- */
  function render() {
    if (doc.dataset.skin !== 'atlas') return;
    var y = scrollY;
    state.timers.forEach(clearTimeout); state.timers = [];
    root.innerHTML = shell();
    wire(); renderAssetRows(); drawGraph(); drawTimeline(); drawSignals();
    requestAnimationFrame(drawMap);
    tickClock();
    if (location.hash === '#cv') declassify(true);
    scrollTo(0, y);
  }
  function toast(title, text, icon) {
    var box = document.getElementById('toasts'); if (!box) return;
    var map = { trophy: 'award', star: 'dossier', mail: 'copy', globe: 'globe' };
    var el = document.createElement('div');
    el.className = 'a-toast' + (icon === 'trophy' ? ' warn' : '');
    el.innerHTML = '<span class="a-toast-ico">' + ico(map[icon] || 'bell') + '</span><span><b>' + esc(title) + '</b><span>' + esc(text) + '</span></span>';
    box.appendChild(el);
    setTimeout(function () { el.classList.add('out'); }, 4200);
    setTimeout(function () { el.remove(); }, 4600);
  }
  window.Atlas = {
    toast: function (title, text, icon) { toast(title === T('toast.title') ? T('atlas.notice') : title, text, icon); },
    render: render,
    show: function () {
      state.visible = true; render();
      clearInterval(state.clock); state.clock = setInterval(tickClock, 1000);
      if (location.hash === '#cv') later(function () { go('dossier'); }, 200);
    },
    hide: function () { state.visible = false; clearInterval(state.clock); cancelAnimationFrame(state.raf); closePalette(); root.innerHTML = ''; },
    onHeat: function () { if (state.visible) drawSignals(); }
  };
  if (doc.dataset.skin === 'atlas') window.Atlas.show();
})();
