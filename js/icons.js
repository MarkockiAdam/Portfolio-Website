/* Pixel icons drawn from 8x8 maps. Each letter is a colour, "." is empty. */
(function () {
  var P = {
    Y: '#f7c948', y: '#d9a21b', W: '#ffffff', w: '#dbe6ff', B: '#3d6fe0', b: '#2a4fb0',
    G: '#5fbf45', g: '#3e8f2c', D: '#9a6a3a', d: '#6f4a26', R: '#ef5a5a', r: '#b73a3a',
    S: '#d5def0', K: '#24324f', C: '#7fd8ff', L: '#0a66c2', P: '#e1306c', O: '#f9a03f'
  };
  var M = {
    trophy: ['Y.YYYY.Y', 'Y.YWYY.Y', '.YYWYYY.', '..YYYy..', '...Yy...', '...Yy...', '..DDDD..', '.DDDDDD.'],
    globe:  ['..BBBB..', '.BGGBBB.', 'BGGGBBGB', 'BBGGBGGB', 'BBBGBBGB', 'BGBBBBBB', '.BGGBBB.', '..BBBB..'],
    block:  ['GGGGGGGG', 'GgGGgGGG', 'DgDDgDgD', 'DDDDDDDD', 'DdDDDdDD', 'DDDdDDDD', 'DDDDDDdD', 'DdDDDDDD'],
    book:   ['RRRRRRR.', 'RWWWWWR.', 'RWbbbWR.', 'RWWWWWR.', 'RWbbWWR.', 'RWWWWWR.', 'RRRRRRRr', '.rrrrrrr'],
    heart:  ['.RR..RR.', 'RRRRRRRR', 'RWRRRRRR', 'RRRRRRRR', '.RRRRRR.', '..RRRR..', '...RR...', '........'],
    chart:  ['......CC', '......CC', '...CC.CC', '...CC.CC', 'CC.CC.CC', 'CC.CC.CC', 'CC.CC.CC', 'WWWWWWWW'],
    star:   ['...Y....', '...Y....', '..YYY...', 'YYYWYYY.', '..YYY...', '...Y....', '...Y....', '........'],
    flag:   ['KRRRRR..', 'KRRWRRR.', 'KRRRRRR.', 'KRRRRR..', 'K.......', 'K.......', 'K.......', 'KK......'],
    crown:  ['........', 'Y..Y..Y.', 'YY.Y.YY.', 'YYYYYYY.', 'YRYCYRY.', 'YYYYYYY.', '........', '........'],
    pick:   ['...SSSS.', '......SS', '.....DSS', '....D..S', '...D...S', '..D.....', '.D......', 'D.......'],
    grid:   ['G.g.G.C.', '........', 'g.G.C.G.', '........', 'G.C.g.G.', '........', 'C.G.G.g.', '........'],
    mail:   ['........', 'WWWWWWWW', 'WbWWWWbW', 'WWbWWbWW', 'WWWbbWWW', 'WWWWWWWW', 'WWWWWWWW', '........'],
    x:      ['W......W', '.W....W.', '..W..W..', '...WW...', '...WW...', '..W..W..', '.W....W.', 'W......W'],
    linkedin: ['LLLLLLLL', 'LWLLLLLL', 'LLLLLLLL', 'LWLWWWLL', 'LWLWLLWL', 'LWLWLLWL', 'LWLWLLWL', 'LLLLLLLL'],
    instagram: ['.PPPPPP.', 'P.....OP', 'P.OOOO.P', 'P.O..O.P', 'P.O..O.P', 'P.OOOO.P', 'P......P', '.PPPPPP.'],
    calc:   ['SSSSSSSS', 'SCCCCCCS', 'SCKKKKCS', 'SSSSSSSS', 'SKSKSKSS', 'SSSSSSSS', 'SKSKSYYS', 'SSSSSSSS'],
    map:    ['BBGGGBBB', 'BGGGGGBB', 'BGGRGGBB', 'BBGGGGBB', 'BBBGGBBB', 'BBBBGGGB', 'BBBBGGGB', 'BBBBBBBB'],
    ballot: ['..WWWW..', '..WRWW..', '..WWWW..', 'KKKKKKKK', 'KBBBBBBK', 'KBBKKBBK', 'KBBBBBBK', 'KKKKKKKK'],
    lock:   ['..SSSS..', '.S....S.', '.S....S.', 'SSSSSSSS', 'SSSKKSSS', 'SSSKKSSS', 'SSSSSSSS', '........']
  };
  function svg(name) {
    var m = M[name] || M.block, r = '';
    for (var y = 0; y < 8; y++) for (var x = 0; x < 8; x++) {
      var c = m[y][x];
      if (c !== '.') r += '<rect x="' + x + '" y="' + y + '" width="1.02" height="1.02" fill="' + P[c] + '"/>';
    }
    return '<svg class="pxi" viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true">' + r + '</svg>';
  }
  window.PixelIcon = svg;
  window.paintIcons = function (root) {
    (root || document).querySelectorAll('[data-icon]').forEach(function (el) {
      if (!el.firstChild) el.innerHTML = svg(el.dataset.icon);
    });
  };
})();
