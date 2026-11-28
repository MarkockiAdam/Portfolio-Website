/* Pixel meadow at the bottom of the page. Grass sways in the wind and
   bends away from the cursor; fireflies come out at night. */
(function () {
  var cv = document.getElementById('meadow');
  if (!cv) return;
  var ctx = cv.getContext('2d');
  var CELL = 4, W = 0, H = 0, blades = [], flowers = [], flies = [];
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var px = -1e4, visible = false, paused = false, t = 0;

  function rnd(s) { var x = Math.sin(s * 127.1) * 43758.5453; return x - Math.floor(x); }

  function build() {
    var rect = cv.getBoundingClientRect();
    W = Math.ceil(rect.width / CELL); H = Math.ceil(rect.height / CELL);
    cv.width = W; cv.height = H;
    blades = []; flowers = []; flies = [];
    for (var x = 0; x < W; x++) {
      var hgt = 4 + Math.floor(rnd(x + 1) * (H * 0.55)) + (rnd(x * 3.1) > 0.85 ? 4 : 0);
      blades.push({ x: x, h: Math.min(hgt, H - 2), tone: rnd(x * 7.7), ph: rnd(x * 1.3) * 6.28 });
      if (rnd(x * 9.9) > 0.955 && x > 2 && x < W - 3) {
        flowers.push({ x: x, h: Math.min(H - 4, 8 + Math.floor(rnd(x * 4.4) * (H * 0.45))), kind: Math.floor(rnd(x * 2.2) * 3) });
      }
    }
    for (var i = 0; i < 14; i++) flies.push({ x: rnd(i * 5.1) * W, y: rnd(i * 3.3) * H * 0.7, p: rnd(i) * 6.28 });
  }

  var DAY = { g: ['#4fae3a', '#63c34a', '#7fd65e', '#3c8f2b'], base: '#2f7a22', fl: ['#ffffff', '#f7c948', '#6fa0ff'] };
  var NIGHT = { g: ['#1f4a2a', '#285a33', '#31693c', '#173c22'], base: '#123020', fl: ['#c9d6ff', '#c9a93d', '#5b7fd6'] };

  function draw() {
    var night = document.documentElement.dataset.theme === 'night';
    var P = night ? NIGHT : DAY;
    ctx.clearRect(0, 0, W, H);
    var pxCell = px / CELL;
    for (var i = 0; i < blades.length; i++) {
      var b = blades[i];
      var sway = reduce.matches ? 0 : Math.sin(t * 1.6 + b.x * 0.18 + b.ph) * 1.2;
      var push = 0, dx = b.x - pxCell;
      if (Math.abs(dx) < 10) push = (dx > 0 ? 1 : -1) * (10 - Math.abs(dx)) * 0.35;
      ctx.fillStyle = P.g[Math.floor(b.tone * 3.99)];
      for (var y = 0; y < b.h; y++) {
        var k = y / b.h; // 0 at root, 1 at tip
        var off = Math.round((sway + push) * k * k);
        ctx.fillRect(b.x + off, H - 1 - y, 1, 1);
      }
    }
    for (var j = 0; j < flowers.length; j++) {
      var f = flowers[j];
      var s2 = reduce.matches ? 0 : Math.round(Math.sin(t * 1.4 + f.x) * 0.8);
      var fx = f.x + s2, fy = H - f.h;
      ctx.fillStyle = P.g[3];
      for (var yy = fy + 2; yy < H; yy++) ctx.fillRect(f.x, yy, 1, 1);
      ctx.fillStyle = P.fl[f.kind];
      ctx.fillRect(fx - 1, fy, 3, 1); ctx.fillRect(fx, fy - 1, 1, 3);
      ctx.fillStyle = f.kind === 1 ? '#c0582b' : '#f7c948';
      ctx.fillRect(fx, fy, 1, 1);
    }
    ctx.fillStyle = P.base;
    ctx.fillRect(0, H - 1, W, 1);
    if (night) {
      for (var q = 0; q < flies.length; q++) {
        var fl = flies[q];
        var a = 0.5 + 0.5 * Math.sin(t * 2 + fl.p);
        if (a < 0.35) continue;
        var fx2 = (fl.x + Math.sin(t * 0.4 + fl.p) * 6 + W) % W;
        var fy2 = fl.y + Math.cos(t * 0.5 + fl.p) * 3;
        ctx.fillStyle = 'rgba(255,236,140,' + a.toFixed(2) + ')';
        ctx.fillRect(Math.round(fx2), Math.round(fy2), 1, 1);
      }
    }
  }

  var last = 0;
  function loop(now) {
    if (!visible || paused) return;
    requestAnimationFrame(loop);
    if (now - last < 50) return;
    last = now; t = now / 1000;
    draw();
  }

  new IntersectionObserver(function (es) {
    visible = es[0].isIntersecting;
    if (visible) requestAnimationFrame(loop);
  }).observe(cv);
  addEventListener('pointermove', function (e) {
    var r = cv.getBoundingClientRect();
    px = (e.clientY > r.top - 40) ? e.clientX - r.left : -1e4;
  }, { passive: true });
  addEventListener('resize', function () { build(); draw(); });
  window.Meadow = {
    redraw: draw,
    pause: function () { paused = true; },
    resume: function () { if (!paused) return; paused = false; build(); draw(); if (visible) requestAnimationFrame(loop); }
  };
  build(); draw();
})();
