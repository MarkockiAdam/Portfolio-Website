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
  var App = window.App = { S: S, T: T, lang: function () { return lang; }, heat: { total: null, days: null } };
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

  function renderCollab() {
    var C = S.collab; if (!C) return;
    var L = function (o) { return typeof o === 'string' ? o : (o[lang] || o.en); };
    var arrow = '<svg class="arr" viewBox="0 0 8 8" aria-hidden="true"><path d="M2 1h5v5H6V3H5v1H4v1H3v1H2V5h1V4h1V3h1V2H2z"/></svg>';
    $('#collab').innerHTML =
      '<header class="collab-head reveal" data-dim>' +
        '<img class="crest" src="' + esc(C.logo) + '" alt="" width="64" height="64" loading="lazy">' +
        '<div class="collab-title"><p class="kicker px">' + esc(T('collab.kicker')) + '</p><h3>' + esc(C.name) + '</h3></div>' +
        '<p class="collab-text">' + esc(T('collab.text')) + '</p>' +
        '<a class="pbtn notch" href="' + esc(C.url) + '" target="_blank" rel="noopener"><span>' + esc(T('collab.all')) + '</span>' + arrow + '</a>' +
      '</header>' +
      '<div class="tools">' + C.items.map(function (t, i) {
        return '<article class="tool panel notch reveal" style="--i:' + (i % 3) + '">' +
          '<div class="tool-top"><span class="tool-icon notch">' + PixelIcon(t.icon) + '</span><span class="tool-kind px">' + esc(L(t.kind)) + '</span></div>' +
          '<h4>' + esc(L(t.name)) + '</h4><p>' + esc(L(t.desc)) + '</p>' +
          '<div class="pactions">' + t.links.map(function (l, k) {
            return '<a class="pbtn notch' + (k === 0 ? ' main' : '') + '" href="' + esc(l.url) + '" target="_blank" rel="noopener"><span>' + esc(L(l.label)) + '</span>' + arrow + '</a>';
          }).join('') + '</div></article>';
      }).join('') + '</div>';
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
    var k = 0;
    var card = function (key, body, wide) {
      return '<section class="cv-card panel notch' + (wide ? ' wide' : '') + '" style="--k:' + (k++) + '"><h3 class="px">' + esc(T(key)) + '</h3>' + body + '</section>';
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
    var soc = { 'X / Twitter': ['x', 'X'], 'LinkedIn': ['linkedin', 'LinkedIn'], 'Instagram': ['instagram', 'Instagram'] };
    $('#about-socials').innerHTML = S.socials.filter(function (s) { return soc[s.label]; }).map(function (s) {
      return '<li><a class="sbtn notch" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + PixelIcon(soc[s.label][0]) + '<span>' + esc(soc[s.label][1]) + '</span></a></li>';
    }).join('');
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
    renderProjects(); renderCollab(); renderJourney(); renderCV(); updateHeatTotal();
    syncChest();
    paintIcons(); observeReveals();
    if (window.Atlas) Atlas.render();
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
    App.heat.total = heatTotal; if (window.Atlas) Atlas.onHeat();
    if (heatTotal === null) return;
    $('#heat-total').textContent = heatTotal < 0 ? T('code.error') : T('code.total').replace('{n}', heatTotal.toLocaleString(lang));
  }
  function renderHeat(days) {
    App.heat.days = days; if (window.Atlas) Atlas.onHeat();
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
  /* data/contributions.json is refreshed every day by a GitHub Action (.github/workflows/contributions.yml).
     It renders instantly; the live API then replaces it if it answers. */
  var heatShown = false;
  fetch('data/contributions.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw r; return r.json(); })
    .then(function (j) { if (heatShown) return; heatShown = true; heatTotal = j.total; renderHeat(j.contributions); updateHeatTotal(); })
    .catch(function () {});
  fetch('https://github-contributions-api.jogruber.de/v4/' + encodeURIComponent(S.github) + '?y=last')
    .then(function (r) { if (!r.ok) throw r; return r.json(); })
    .then(function (j) {
      heatTotal = (j.total && (j.total.lastYear != null ? j.total.lastYear : 0)) || 0;
      heatShown = true; renderHeat(j.contributions); updateHeatTotal();
    })
    .catch(function () {
      if (heatShown) return;
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
    if (doc.dataset.skin === 'atlas' || doc.dataset.picker || e.metaKey || e.ctrlKey || e.altKey || /input|textarea|select/i.test(e.target.tagName)) return;
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

  /* ---------- the CV chest ---------- */
  var chest = $('#chest'), drawer = $('#cv-drawer'), chestOpen = false;
  function syncChest() {
    if (!chest) return;
    $('.chest-title', chest).textContent = T(chestOpen ? 'cv.close' : 'cv.open');
    chest.setAttribute('aria-expanded', chestOpen);
  }
  function burst() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var loot = $('#loot'), colors = ['#f7c948', '#ffffff', '#7fd8ff', '#5fbf45', '#ffe27a', '#ef5a5a'];
    for (var i = 0; i < 22; i++) {
      var p = document.createElement('i');
      var ang = (-90 + (Math.random() * 150 - 75)) * Math.PI / 180, dist = 50 + Math.random() * 90;
      p.style.setProperty('--dx', Math.round(Math.cos(ang) * dist) + 'px');
      p.style.setProperty('--dy', Math.round(Math.sin(ang) * dist) + 'px');
      p.style.setProperty('--s', (4 + Math.floor(Math.random() * 3) * 2) + 'px');
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = Math.round(Math.random() * 120) + 'ms';
      loot.appendChild(p);
      setTimeout(function (el) { el.remove(); }.bind(null, p), 1200);
    }
  }
  function toggleChest(force) {
    chestOpen = typeof force === 'boolean' ? force : !chestOpen;
    chest.classList.toggle('open', chestOpen);
    drawer.classList.toggle('open', chestOpen);
    drawer.inert = !chestOpen;
    syncChest();
    if (chestOpen) {
      burst(); blip([392, 523, 659, 784]);
      if (once('loot')) setTimeout(function () { toast(T('toast.title'), T('toast.loot'), 'star'); }, 500);
      setTimeout(function () {
        var r = chest.getBoundingClientRect();
        if (r.top > innerHeight * 0.45) scrollBy({ top: r.top - 120, behavior: 'smooth' });
      }, 250);
    } else { blip([523, 392]); }
  }
  chest.addEventListener('click', function () { toggleChest(); });
  addEventListener('keydown', function (e) {
    if (doc.dataset.skin === 'atlas' || doc.dataset.picker || e.metaKey || e.ctrlKey || e.altKey || /input|textarea|select/i.test(e.target.tagName)) return;
    if (e.key === 'e' || e.key === 'E') {
      var r = $('#journey').getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) { e.preventDefault(); toggleChest(); }
    }
  });
  if (location.hash === '#cv') toggleChest(true);

  /* ---------- styles: PIXEL / ATLAS ---------- */
  var reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
  function syncSkinButtons() {
    $$('[data-skin-set]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.skinSet === doc.dataset.skin); });
  }
  function applySkin(k) {
    doc.dataset.skin = k;
    $('#atlas').hidden = k !== 'atlas';
    if (k === 'atlas') {
      if (window.Sky && Sky.pause) Sky.pause();
      if (window.Meadow && Meadow.pause) Meadow.pause();
      if (window.Atlas) Atlas.show();
    } else {
      if (window.Atlas) Atlas.hide();
      if (window.Sky && Sky.resume) Sky.resume();
      if (window.Meadow && Meadow.resume) Meadow.resume();
    }
    var m = $('meta[name="theme-color"]');
    if (m) m.content = k === 'atlas' ? '#0a0e13' : (doc.dataset.theme === 'night' ? '#0e1940' : '#3d6fe0');
    syncSkinButtons();
  }
  function rememberSkin(k) {
    store.set('skin', k);
    if (/[?&]skin=/.test(location.search)) {
      var q = location.search.replace(/([?&]skin=)(pixel|atlas)/, '$1' + k);
      history.replaceState(null, '', location.pathname + q + location.hash);
    }
  }
  function bootThen(done) {
    var box = $('#boot'), lines = [
      'ATLAS · secure session',
      '> resolving subject … MARKOCKI, ADAM',
      '> sources: github · app store · terracracovianum.org',
      '> building link graph … ' + (S.projects.length + (S.collab ? S.collab.items.length : 0) + 6) + ' nodes',
      '> ACCESS GRANTED'
    ];
    var step = 150, end = 110 + lines.length * step;
    box.innerHTML = ''; box.classList.add('on');
    lines.forEach(function (t, i) {
      setTimeout(function () {
        var p = document.createElement('p'); p.textContent = t;
        if (i === lines.length - 1) p.className = 'ok';
        box.appendChild(p); blip([880 + i * 60]);
      }, 110 + i * step);
    });
    setTimeout(function () { done(); box.classList.add('out'); }, end + 180);
    setTimeout(function () { box.classList.remove('on', 'out'); box.innerHTML = ''; }, end + 700);
  }
  function dissolveThen(done) {
    var cv = $('#dissolve'), ctx = cv.getContext('2d'), C = 28;
    var w = Math.ceil(innerWidth / C), h = Math.ceil(innerHeight / C), cells = [];
    cv.width = w; cv.height = h; cv.classList.add('on');
    for (var i = 0; i < w * h; i++) cells.push(i);
    for (var j = cells.length - 1; j > 0; j--) { var r = Math.floor(Math.random() * (j + 1)), t = cells[j]; cells[j] = cells[r]; cells[r] = t; }
    var tones = ['#3d6fe0', '#6290ec', '#2855cc', '#a2c1f6'];
    var start = performance.now(), D = 340, phase = 0;
    (function frame(now) {
      var k = Math.min(1, (now - start) / D), n = Math.floor(k * cells.length);
      if (phase === 0) {
        for (var a = 0; a < n; a++) { var c = cells[a]; ctx.fillStyle = tones[c % 4]; ctx.fillRect(c % w, Math.floor(c / w), 1, 1); }
        if (k >= 1) { phase = 1; done(); start = now; }
      } else {
        for (var b = 0; b < n; b++) { var c2 = cells[b]; ctx.clearRect(c2 % w, Math.floor(c2 / w), 1, 1); }
        if (k >= 1) { cv.classList.remove('on'); return; }
      }
      requestAnimationFrame(frame);
    })(start);
  }
  function setSkin(k, opts) {
    opts = opts || {};
    if (k !== 'pixel' && k !== 'atlas') return;
    rememberSkin(k);
    if (k === doc.dataset.skin && !opts.force) return;
    var go = function () { applySkin(k); scrollTo(0, 0); };
    if (reduceMQ.matches || opts.instant) return go();
    if (k === 'atlas') bootThen(go); else dissolveThen(go);
  }
  $$('[data-skin-set]').forEach(function (b) {
    b.addEventListener('click', function () { setSkin(b.dataset.skinSet); });
  });

  /* first-visit picker */
  function openPicker() {
    var pk = $('#skin-picker'); pk.hidden = false;
    requestAnimationFrame(function () { pk.classList.add('on'); });
    var mapCv = $('.pick-map', pk);
    if (mapCv && window.WORLD) {
      var g = mapCv.getContext('2d'), W = window.WORLD, cw = mapCv.width / W.cols, ch = mapCv.height / W.rows.length;
      g.fillStyle = '#2b3b4d';
      W.rows.forEach(function (row, y) {
        for (var x = 0; x < W.cols; x++) {
          if ((parseInt(row[x >> 2], 16) >> (3 - (x & 3))) & 1) g.fillRect(x * cw + cw * 0.25, y * ch + ch * 0.25, cw * 0.5, ch * 0.5);
        }
      });
      g.fillStyle = '#4c9aff';
      g.fillRect(mapCv.width * (199.94 / 360) - 2, mapCv.height * ((80 - 50.06) / 138) - 2, 4, 4);
    }
    var cards = $$('.pick', pk); cards[0].focus();
    pk.addEventListener('keydown', function (e) {
      var i = cards.indexOf(document.activeElement);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); cards[(i + 1) % cards.length].focus(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); cards[(i + cards.length - 1) % cards.length].focus(); }
    });
    cards.forEach(function (c) {
      c.addEventListener('click', function () {
        var k = c.dataset.pick;
        doc.removeAttribute('data-picker');
        pk.classList.remove('on');
        setTimeout(function () { pk.hidden = true; }, 350);
        if (k === 'atlas') setSkin('atlas', { force: true }); else { rememberSkin('pixel'); applySkin('pixel'); }
        if (once('ssc')) setTimeout(function () { toast(T('toast.title'), T('toast.ssc'), 'trophy'); }, k === 'atlas' ? 2200 : 1200);
      });
    });
  }

  /* ---------- boot ---------- */
  renderStatic();
  applyLang(lang);
  paintIcons();
  requestAnimationFrame(function () { doc.classList.add('ready'); });
  App.setLang = function (l) { store.set('lang', l); applyLang(l); blip([520]); };
  App.setSkin = setSkin; App.toast = toast; App.blip = blip; App.once = once; App.store = store; App.esc = esc;
  applySkin(doc.dataset.skin);
  if (doc.dataset.picker) openPicker();
  else if (once('ssc')) setTimeout(function () { toast(T('toast.title'), T('toast.ssc'), 'trophy'); }, 1600);
})();
