/* Pixel sky — drifting clouds, dithered into a small ladder of blues.
   One WebGL pass rendered at "cell" resolution, then scaled up with crisp pixels.
   Three cloud decks parallax with scroll, the pointer is a soft light,
   and night mode swaps the ladder for deep navy with twinkling stars. */
(function () {
  var canvas = document.getElementById('sky');
  if (!canvas) return;
  var gl = canvas.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: false });
  if (!gl) { document.documentElement.classList.add('no-webgl'); return; }

  var VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FS = [
    'precision highp float;',
    'uniform vec2 uRes;uniform float uTime,uScroll,uNight;uniform vec2 uPtr;uniform vec4 uDim[8];',
    'float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
    'float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);',
    ' return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}',
    'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}',
    'float b2(vec2 a){a=floor(a);return fract(a.x/2.+a.y*a.y*.75);}',
    'float bayer(vec2 a){return b2(.5*a)*.25+b2(a);}',
    'vec3 lad(float i,float night){',
    ' vec3 d0=vec3(.157,.333,.80),d1=vec3(.239,.435,.878),d2=vec3(.384,.561,.925),d3=vec3(.635,.757,.965),d4=vec3(.925,.957,1.);',
    ' vec3 n0=vec3(.031,.051,.137),n1=vec3(.055,.098,.247),n2=vec3(.094,.165,.384),n3=vec3(.176,.290,.596),n4=vec3(.545,.647,.902);',
    ' vec3 d=i<.5?d0:i<1.5?d1:i<2.5?d2:i<3.5?d3:d4;',
    ' vec3 m=i<.5?n0:i<1.5?n1:i<2.5?n2:i<3.5?n3:n4;',
    ' return mix(d,m,night);}',
    'void main(){',
    ' vec2 c=gl_FragCoord.xy; vec2 uv=c/uRes.y; float t=uTime;',
    ' float far =fbm(vec2(uv.x*1.1+t*.004, uv.y*1.4+uScroll*.18));',
    ' float mid =fbm(vec2(uv.x*1.7+t*.011, uv.y*2.3+uScroll*.42)+vec2(0.,t*.003));',
    ' float near=fbm(vec2(uv.x*3.2+t*.022, uv.y*3.4+uScroll*.85));',
    ' float cloud=smoothstep(.42,.86,mid)*.95+smoothstep(.56,.94,near)*.55+smoothstep(.35,.8,far)*.3;',
    ' float y=c.y/uRes.y;',
    ' float v=.17+.20*y+cloud*.54;',
    /* sun / moon: top right, sinks as you scroll */
    ' vec2 sc=vec2(uRes.x*.80, uRes.y*(.80-uScroll*.22));',
    ' float d=length(c-sc)/uRes.y; float r=mix(.052,.04,uNight);',
    ' float set=1.-smoothstep(.25,.7,uScroll);',
    ' float disc=(1.-step(r,d))*step(.5,set);',
    ' v+=smoothstep(.32,.0,d)*mix(.22,.10,uNight)*set;',
    /* pointer light */
    ' if(uPtr.x>-500.){float pd=length(c-uPtr)/uRes.y; v+=exp(-pd*pd*28.)*(.10+cloud*.28);}',
    ' float dim=0.;',
    ' for(int i=0;i<8;i++){vec4 r=uDim[i]; if(r.z<=r.x) continue; vec2 o=max(max(r.xy-c,c-r.zw),0.); dim=max(dim,1.-smoothstep(0.,14.,length(o)));}',
    ' v=mix(v,min(v,mix(.34,.40,uNight)),dim); disc*=1.-dim;',
    ' float q=clamp(v,0.,1.)*4.; float lo=floor(q); float idx=min(lo+step(bayer(c),q-lo),4.);',
    ' vec3 col=lad(idx,uNight);',
    ' col=mix(col,mix(vec3(1.,.98,.9),vec3(.93,.95,1.),uNight),disc);',
    /* stars at night, only in clear sky */
    ' float s=h(floor(c)+7.3); float tw=.5+.5*sin(t*1.7+s*60.);',
    ' float star=step(.9975,s)*(1.-smoothstep(.15,.45,cloud))*step(.45,tw)*uNight;',
    ' col=mix(col,vec3(.9,.94,1.),star);',
    ' gl_FragColor=vec4(col,1.);}'
  ].join('\n');

  function sh(type, src) {
    var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  }
  var vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) { document.documentElement.classList.add('no-webgl'); return; }
  var pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr); gl.useProgram(pr);
  var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var U = {};
  ['uRes', 'uTime', 'uScroll', 'uNight', 'uPtr'].forEach(function (k) { U[k] = gl.getUniformLocation(pr, k); });
  U.uDim = gl.getUniformLocation(pr, 'uDim');
  var dimData = new Float32Array(32);

  /* Text marked [data-dim] gets calmer, deeper sky behind it so it stays readable. */
  function dims() {
    var els = document.querySelectorAll('[data-dim]'), k = 0, pad = 14;
    dimData.fill(0);
    for (var i = 0; i < els.length && k < 8; i++) {
      var r = els[i].getBoundingClientRect();
      if (r.bottom < -40 || r.top > innerHeight + 40 || !r.width) continue;
      dimData[k * 4] = (r.left - pad) / cell;
      dimData[k * 4 + 1] = H - (r.bottom + pad) / cell;
      dimData[k * 4 + 2] = (r.right + pad) / cell;
      dimData[k * 4 + 3] = H - (r.top - pad) / cell;
      k++;
    }
    gl.uniform4fv(U.uDim, dimData);
  }

  var cell = 4, W = 0, H = 0;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var ptr = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 };
  var night = document.documentElement.dataset.theme === 'night' ? 1 : 0, nightTarget = night;
  var paused = document.documentElement.dataset.skin === 'atlas';
  var running = !paused, last = 0, t0 = performance.now(), frozenT = 40;

  function resize() {
    cell = innerWidth < 700 ? 3 : 4;
    W = Math.ceil(innerWidth / cell); H = Math.ceil(innerHeight / cell);
    canvas.width = W; canvas.height = H;
    canvas.style.width = W * cell + 'px'; canvas.style.height = H * cell + 'px';
    gl.viewport(0, 0, W, H);
    draw(performance.now());
  }

  function draw(now) {
    var t = reduce.matches ? frozenT : (now - t0) / 1000 + 40;
    ptr.x += (ptr.tx - ptr.x) * 0.12; ptr.y += (ptr.ty - ptr.y) * 0.12;
    if (ptr.tx < -500) { ptr.x = ptr.tx; ptr.y = ptr.ty; }
    night += (nightTarget - night) * 0.08;
    if (Math.abs(nightTarget - night) < 0.002) night = nightTarget;
    gl.uniform2f(U.uRes, W, H);
    gl.uniform1f(U.uTime, t);
    gl.uniform1f(U.uScroll, scrollY / innerHeight);
    gl.uniform1f(U.uNight, night);
    gl.uniform2f(U.uPtr, ptr.x / cell, H - ptr.y / cell);
    dims();
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function loop(now) {
    if (!running) return;
    requestAnimationFrame(loop);
    if (now - last < 33) return; // ~30 fps is plenty for drifting clouds
    last = now;
    draw(now);
  }

  addEventListener('resize', resize);
  addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    if (ptr.tx < -500) { ptr.x = e.clientX; ptr.y = e.clientY; }
    ptr.tx = e.clientX; ptr.ty = e.clientY;
  }, { passive: true });
  document.addEventListener('pointerleave', function () { ptr.tx = ptr.ty = -1e4; });
  addEventListener('scroll', function () { if (reduce.matches) requestAnimationFrame(draw); }, { passive: true });
  document.addEventListener('visibilitychange', function () {
    var was = running;
    running = !document.hidden && !paused;
    if (running && !was) requestAnimationFrame(loop);
  });

  window.Sky = {
    pause: function () { paused = true; running = false; },
    resume: function () { if (!paused) return; paused = false; running = true; resize(); requestAnimationFrame(loop); },
    setNight: function (on) {
      nightTarget = on ? 1 : 0;
      if (reduce.matches) { night = nightTarget; draw(performance.now()); }
    }
  };

  resize();
  requestAnimationFrame(loop);
})();
