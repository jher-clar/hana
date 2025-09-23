(function(){
  // Run only if the section exists
  var root = document.getElementById('hb-animation');
  if (!root) return;

  var svg = root.querySelector('.hbMainSVG');
  var path1 = root.querySelector('#hbSpringStroke1');
  var path2 = root.querySelector('#hbSpringStroke2');
  var path3 = root.querySelector('#hbSpringStroke3');
  var mask1 = root.querySelector('#hbStrokeMask1');
  var mask2 = root.querySelector('#hbStrokeMask2');
  var mask3 = root.querySelector('#hbStrokeMask3');
  var merryText = root.querySelector('#hbMerryGroup text');
  var dot = root.querySelector('#hbDot');
  var ring = root.querySelector('#hbSplashRing');
  var particleContainer = root.querySelector('#hbParticleContainer');
  // New title references
  var title = root.querySelector('#hbTitle');
  var words = root.querySelectorAll('#hbTitle .hb-word');
  var nameEl = root.querySelector('#hbTitle .hb-name');
  var containerEl = root.querySelector('.hb-container');

  if (!svg || !path1 || !path2 || !path3 || !mask1 || !mask2 || !mask3 || !merryText || !dot || !ring || !particleContainer) return;

  // Ensure SVG is shown
  gsap.set(svg, {visibility: 'visible', opacity: 1});
  
  // Initial states for cute popup animation
  if (title) {
    gsap.set([].slice.call(words).concat(nameEl), {opacity: 0, y: 22, scale: 0.7, transformOrigin: '50% 60%'});
    gsap.set(title, {attr: {'letter-spacing': 0.2}});
  }

  // Responsive sizing for title
  function sizeTitle(){
    if (!title || !containerEl) return;
    var s = Math.min(containerEl.clientWidth || 600, containerEl.clientHeight || 400);
    var fs = Math.max(28, Math.min(96, s * 0.17)); // scale with smaller side for better landscape sizing
    title.setAttribute('font-size', Math.round(fs));
    var tspans = title.querySelectorAll('tspan');
    if (tspans[1]) tspans[1].setAttribute('dy', Math.round(fs * 0.6)); // Reduced from 0.9 to 0.6
    if (tspans[2]) tspans[2].setAttribute('dy', Math.round(fs * 0.7)); // Reduced from 1.05 to 0.7
  }
  sizeTitle();
  window.addEventListener('resize', sizeTitle);
  window.addEventListener('orientationchange', function(){ setTimeout(sizeTitle, 200); });

  // Utility
  function rand(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }

  // Build flowing mask rectangles that travel along a path using native SVG getPointAtLength
  function buildStrokeMask(count, maskEl, pathEl){
    var pathLen = pathEl.getTotalLength();
    for (var i = 0; i < count; i++){
      var r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      r.setAttribute('width', 16);
      r.setAttribute('height', 16);
      r.setAttribute('rx', 16);
      r.setAttribute('ry', 16);
      r.setAttribute('fill', '#fff'); // white reveals in masks
      r.setAttribute('opacity', '1');
      maskEl.appendChild(r);

      // individual animation object for this rect
      (function(rect, index){
        var obj = { l: 0 };
        var d = 1.52; // duration similar to original
        // Stagger by small increments
        var delay = index / 200;
        gsap.to(obj, {
          l: pathLen,
          duration: d,
          delay: delay,
          ease: 'none',
          onUpdate: function(){
            var p = pathEl.getPointAtLength(obj.l);
            var p2 = pathEl.getPointAtLength(Math.min(obj.l + 1, pathLen));
            var angle = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI;
            rect.setAttribute('x', p.x - 8);
            rect.setAttribute('y', p.y - 8);
            rect.setAttribute('transform', 'rotate(' + angle + ' ' + p.x + ' ' + p.y + ')');
          },
          onComplete: function(){
            gsap.to(rect, {duration: 0.1, attr: {opacity: 0}});
          }
        });
      })(r, i);
    }
  }

  // Particle pool
  var particleTypes = ['#flake1','#flake2','#flake3','#star','#heart'];
  var particleColors = ['#F3F1E2'];
  var particlePool = [];
  var numParticles = 256;
  var particleIndex = 0;

  function initParticles(){
    for (var i = 0; i < numParticles; i++){
      var u = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      u.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', particleTypes[i % particleTypes.length]);
      u.setAttribute('fill', particleColors[i % particleColors.length]);
      u.setAttribute('opacity', '0');
      u.setAttribute('class', 'hb-particle');
      particleContainer.appendChild(u);
      particlePool.push(u);
    }
  }

  function emitParticle(x, y){
    var a = particlePool[particleIndex];
    particleIndex = (particleIndex + 1) % numParticles;
    gsap.killTweensOf(a);
    gsap.set(a, {x: x, y: y, scale: rand(10,15)/10, transformOrigin: '50% 50%', opacity: 1, rotation: rand(0, 360)});
    var dx = rand(-80, 80);
    var dy = rand(-200, -60);
    gsap.to(a, {
      duration: rand(12,20)/10,
      x: x + dx,
      y: y + dy,
      rotation: rand(180, 780),
      scale: 0,
      ease: 'power2.in',
      onComplete: function(){ gsap.set(a, {opacity: 0}); }
    });
  }

  // Build masks
  buildStrokeMask(100, mask1, path1);
  buildStrokeMask(100, mask2, path2);
  buildStrokeMask(100, mask3, path3);

  // Init particles
  initParticles();

  // Master timeline
  var master = gsap.timeline({repeat: -1, repeatDelay: 0});

  // Skip splash on short/narrow viewports to avoid upper artifacts
  var skipSplash = window.matchMedia('(max-height: 600px)').matches || window.matchMedia('(max-width: 360px)').matches;
  if (!skipSplash) {
    master
      .to(dot, {duration: 0.4, attr:{cy: 420, rx: 12, ry: 12}, ease: 'power2.out'})
      .to(dot, {duration: 0.3, attr:{cy: 380}, ease: 'power2.in'})
      .set(ring, {opacity: 1})
      .to(dot, {duration: 1.0, attr:{rx: 76, ry: 76}, opacity: 0, ease: 'power1.out'})
      .to(ring, {duration: 1.0, attr:{r: 50}, strokeWidth: 0, ease: 'power1.out'}, '<');
  } else {
    gsap.set([dot, ring], {opacity: 0});
  }

  // Cute staggered multi-line popup with letter-spacing pulse
  master
    .add('textIn')
    .to(words, {
      duration: 0.9,
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: function(i){ return i % 2 ? 6 : -6; },
      ease: 'elastic.out(1, 0.6)',
      stagger: 0.12
    }, 'textIn')
    .to(words, {duration: 0.5, rotation: 0, ease: 'power2.out'}, 'textIn+=0.4')
    .to(title, {duration: 0.5, attr: {'letter-spacing': 2}, ease: 'power1.out'}, 'textIn')
    .to(title, {duration: 0.6, attr: {'letter-spacing': 1}, ease: 'power2.inOut'}, 'textIn+=0.5')
    .to(nameEl, {duration: 1.0, opacity: 1, y: 0, scale: 1.06, rotation: 0, ease: 'elastic.out(1.1, 0.5)'}, 'textIn+=0.3')
    .to(nameEl, {duration: 0.4, scale: 1, ease: 'power2.out'}, 'textIn+=1.2')
    // Particle emission along path2
    .add(function(){
      var len = path2.getTotalLength();
      var obj = {l: 0};
      gsap.to(obj, {
        duration: 1.4,
        l: len,
        ease: 'none',
        onUpdate: function(){
          var p = path2.getPointAtLength(obj.l);
          // spawn a bit lower to avoid top edge artifacts
          emitParticle(p.x, Math.min(p.y + 40, 600));
        }
      });
    }, '-=0.2')
    // Fade out text before looping
    .to([].slice.call(words).concat(nameEl), {duration: 0.6, y: -10, opacity: 0, stagger: {each: 0.05, from: 'end'}}, '+=1.2');
})();
