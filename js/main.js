(function () {
  var S = window.SITE, doc = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var once = function (k) {
    try { if (sessionStorage.getItem(k)) return false; sessionStorage.setItem(k, '1'); } catch (e) {}
    return true;
  };
  var lang = S.i18n[doc.lang] ? doc.lang : 'en';
  var T = function (k) { return (S.i18n[lang] && S.i18n[lang][k]) || S.i18n.en[k] || ''; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- sound (off by default, synthesized — no files) ---------- */
  var soundOn = store.get('sound') === 'on', actx = null;
  function blip(notes) {
    if (!soundOn) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      notes.forEach(function (f, i) {
        var o = actx.createOscillator(), g = actx.createGain(), at = actx.currentTime + i * 0.09;
        o.type = 'square'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, at);
        g.gain.exponentialRampToValueAtTime(0.06, at + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, at + 0.12);
        o.connect(g).connect(actx.destination); o.start(at); o.stop(at + 0.14);
      });
    } catch (e) {}
  }
  var soundBtn = $('#sound');
  function syncSound() { soundBtn.setAttribute('aria-pressed', soundOn); soundBtn.classList.toggle('is-on', soundOn); }
  soundBtn.addEventListener('click', function () {
    soundOn = !soundOn; store.set('sound', soundOn ? 'on' : 'off'); syncSound(); blip([660, 990]);
  });
  syncSound();

  /* ---------- theme ---------- */
  function setTheme(t, save) {
    doc.dataset.theme = t;
    if (save) store.set('theme', t);
    if (window.Sky) Sky.setNight(t === 'night');
    if (window.Meadow) Meadow.redraw();
    var m = $('meta[name="theme-color"]'); if (m) m.content = t === 'night' ? '#0e1940' : '#3d6fe0';
  }
  $('#theme').addEventListener('click', function () {
    setTheme(doc.dataset.theme === 'night' ? 'day' : 'night', true); blip([440, 330]);
  });
  setTheme(doc.dataset.theme || 'day', false);

  /* ---------- toasts ---------- */
  function toast(title, text, icon) {
    var el = document.createElement('div');
    el.className = 'toast notch';
    el.innerHTML = '<span class="toast-icon">' + PixelIcon(icon || 'trophy') + '</span>' +
      '<span><strong class="px">' + esc(title) + '</strong><span>' + esc(text) + '</span></span>';
    $('#toasts').appendChild(el);
    blip([784, 1047, 1319]);
    setTimeout(function () { el.classList.add('out'); }, 4200);
    setTimeout(function () { el.remove(); }, 4800);
  }

  /* ---------- rendering ---------- */
  function renderProjects() {
    var arrow = '<svg class="arr" viewBox="0 0 8 8" aria-hidden="true"><path d="M2 1h5v5H6V3H5v1H4v1H3v1H2V5h1V4h1V3h1V2H2z"/></svg>';
    $('#projects').innerHTML = S.projects.map(function (p, i) {
      var links = p.links || [];
      var primary = links.filter(function (l) { return l.label === 'App Store'; })[0] || links[0];
      var label = function (l) { return /^[\w-]+\.[a-z]{2,}$/i.test(l.label) ? T('work.site') : l.label; };
      var ordered = primary ? [primary].concat(links.filter(function (l) { return l !== primary; })) : [];
      var btns = ordered.map(function (l, k) {
        return '<a class="pbtn notch' + (k === 0 ? ' main' : '') + '" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
          '<span>' + esc(label(l)) + '</span>' + arrow + '</a>';
      }).join('');
      var icon = p.image ? '<img class="app-icon" src="' + esc(p.image) + '" alt="" width="96" height="96" loading="lazy">' : '<span class="tile notch">' + PixelIcon(p.icon) + '</span>';
      var kind = p.kind ? (p.kind[lang] || p.kind.en) : '';
      return '<article class="project notch reveal' + (p.featured ? ' featured' : '') + '" style="--i:' + i + ';--acc:' + esc(p.accent || '#7fa6ff') + '">' +
        '<div class="stage"><span class="glow"></span>' + icon + (kind ? '<span class="kind px">' + esc(kind) + '</span>' : '') + '</div>' +
        '<div class="pbody">' +
          (p.badge ? '<span class="win notch">' + PixelIcon('trophy') + '<span>' + esc(T('work.winner')) + '</span></span>' : '') +
          '<h3>' + esc(p.name) + '</h3>' +
          '<p>' + esc(p.desc[lang] || p.desc.en) + '</p>' +
          '<div class="pactions">' + btns + '</div>' +
        '</div></article>';
    }).join('');
  }

  function renderJourney() {
    $('#quests').innerHTML = S.journey.map(function (q) {
      var cls = 'quest reveal' + (q.gold ? ' gold' : '') + (q.next ? ' next' : '');
      return '<li class="' + cls + '">' +
        '<span class="node notch">' + PixelIcon(q.next ? 'lock' : q.icon) + '</span>' +
        '<div class="quest-card panel notch">' +
        '<p class="when px">' + esc(q.when[lang] || q.when.en) + '</p>' +
        '<h3>' + esc(q.title[lang] || q.title.en) + '</h3>' +
        '<p>' + esc(q.text[lang] || q.text.en) + '</p>' +
        (q.image ? '<img class="quest-img" src="' + esc(q.image) + '" alt="" width="160" height="160" loading="lazy">' : '') +
        (q.link ? '<a class="link-arrow" href="' + esc(q.link.url) + '" target="_blank" rel="noopener">' + esc(q.link.label) + ' ↗</a>' : '') +
        '</div></li>';
    }).join('');
  }

  function renderCV() {
    var cv = S.cv, L = function (o) { return typeof o === 'string' ? o : (o[lang] || o.en); };
    var rows = function (list) {
      return '<ul class="cv-rows">' + list.map(function (r) {
        return '<li><span><strong>' + esc(L(r.title)) + '</strong> · ' + esc(r.place) + '</span>' + (r.years ? '<span class="years">' + esc(r.years) + '</span>' : '') + '</li>';
      }).join('') + '</ul>';
    };
    var card = function (key, body, wide) {
      return '<section class="cv-card panel notch reveal' + (wide ? ' wide' : '') + '"><h3 class="px">' + esc(T(key)) + '</h3>' + body + '</section>';
    };
    $('#cv').innerHTML =
      card('cv.experience', rows(cv.experience), true) +
      card('cv.activities', '<ul class="cv-rows stacked">' + cv.activities.map(function (r) {
        return '<li><strong>' + esc(L(r.name)) + '</strong><span>' + esc(L(r.role)) + '</span></li>';
      }).join('') + '</ul>') +
      card('cv.languages', '<ul class="cv-rows">' + cv.languages.map(function (l) {
        return '<li><strong>' + esc(L(l.name)) + '</strong><span class="years">' + esc(L(l.level)) + '</span></li>';
      }).join('') + '</ul>') +
      card('cv.certificates', '<ul class="cv-list">' + cv.certificates.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul>', true);
  }

  function renderStatic() {
    $('#heroes').innerHTML = S.heroes.map(function (h) { return '<li class="chip notch">' + esc(h) + '</li>'; }).join('');
    $('#socials').innerHTML = S.socials.map(function (s) {
      return '<li><a class="link-arrow" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + ' ↗</a></li>';
    }).join('');
    $('#gh-link').href = 'https://github.com/' + S.github;
    if (S.photo) $('#avatar').innerHTML = '<img src="' + esc(S.photo) + '" alt="' + esc(S.name) + '" width="240" height="240" loading="lazy">';
    if (!S.email) $('#email-btn').hidden = true;
  }

  function applyLang(l) {
    lang = S.i18n[l] ? l : 'en';
    doc.lang = lang;
    $$('[data-i18n]').forEach(function (el) { el.innerHTML = T(el.dataset.i18n); });
    $$('[data-i18n-label]').forEach(function (el) { el.setAttribute('aria-label', T(el.dataset.i18nLabel)); });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.lang === lang); });
    document.title = T('meta.title');
    renderProjects(); renderJourney(); renderCV(); updateHeatTotal();
    paintIcons(); observeReveals();
  }
  $$('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { store.set('lang', b.dataset.lang); applyLang(b.dataset.lang); blip([520]); });
  });

  /* ---------- reveal on scroll ---------- */
  var revealIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  function observeReveals() { $$('.reveal:not(.in)').forEach(function (el) { revealIO.observe(el); }); }

  /* ---------- GitHub heatmap ---------- */
  var heatTotal = null;
  function updateHeatTotal() {
    if (heatTotal === null) return;
    $('#heat-total').textContent = heatTotal < 0 ? T('code.error') : T('code.total').replace('{n}', heatTotal.toLocaleString(lang));
  }
  function renderHeat(days) {
    var first = new Date(days[0].date + 'T00:00:00').getDay(), html = '';
    for (var i = 0; i < first; i++) html += '<i class="pad"></i>';
    days.forEach(function (d, k) {
      var col = Math.floor((k + first) / 7);
      html += '<i class="l' + d.level + '" style="--c:' + col + '" title="' + d.count + ' · ' + d.date + '"></i>';
    });
    var heat = $('#heat'); heat.innerHTML = html;
    new IntersectionObserver(function (es, o) {
      if (es[0].isIntersecting) { heat.classList.add('placed'); o.disconnect(); }
    }, { threshold: 0.3 }).observe(heat);
    var sc = $('.heat-scroll'); sc.scrollLeft = sc.scrollWidth;
  }
  fetch('https://github-contributions-api.jogruber.de/v4/' + encodeURIComponent(S.github) + '?y=last')
    .then(function (r) { if (!r.ok) throw r; return r.json(); })
    .then(function (j) {
      heatTotal = (j.total && (j.total.lastYear != null ? j.total.lastYear : 0)) || 0;
      renderHeat(j.contributions); updateHeatTotal();
    })
    .catch(function () {
      heatTotal = -1; updateHeatTotal();
      var fake = [], d = new Date(); d.setDate(d.getDate() - 364);
      for (var i = 0; i < 365; i++) { fake.push({ date: d.toISOString().slice(0, 10), count: 0, level: 0 }); d.setDate(d.getDate() + 1); }
      renderHeat(fake);
    });

  /* ---------- hotbar ---------- */
  var slots = $$('.hotbar a'), sections = $$('[data-section]');
  var navIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var n = +e.target.dataset.section;
      slots.forEach(function (s, i) { s.classList.toggle('active', i === n); if (i === n) s.setAttribute('aria-current', 'true'); else s.removeAttribute('aria-current'); });
      if (n === 5 && once('explorer')) setTimeout(function () { toast(T('toast.title'), T('toast.explorer'), 'globe'); }, 600);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function (s) { navIO.observe(s); });
  slots.forEach(function (s) { s.addEventListener('click', function () { blip([600]); }); });
  addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey || /input|textarea|select/i.test(e.target.tagName)) return;
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= slots.length) { e.preventDefault(); slots[n - 1].click(); }
  });

  /* ---------- email ---------- */
  $('#email-btn').addEventListener('click', function () {
    if (!S.email) return;
    var go = function () { location.href = 'mailto:' + S.email; };
    if (navigator.clipboard) navigator.clipboard.writeText(S.email).then(function () { toast(T('contact.copied'), S.email, 'mail'); }, function () {});
    setTimeout(go, 300);
  });

  /* ---------- boot ---------- */
  renderStatic();
  applyLang(lang);
  paintIcons();
  requestAnimationFrame(function () { doc.classList.add('ready'); });
  if (once('ssc')) setTimeout(function () { toast(T('toast.title'), T('toast.ssc'), 'trophy'); }, 1600);
})();
