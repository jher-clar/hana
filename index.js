(function(){
  // Simple helper to create elements from HTML
  function html(str){
    var t = document.createElement('template');
    t.innerHTML = str.trim();
    return t.content.firstElementChild;
  }

  function initPoemCard(){
    var cardRoot = document.querySelector('.greeting-card');
    var cakeContainer = document.querySelector('.cake-container');
    var cake = document.getElementById('cake');
    if(!cardRoot || !cakeContainer || !cake) return;

    // Build Poem Card markup
    var poemCard = html(
      '<div class="poem-card" role="group" aria-label="Poem card" aria-hidden="true">\
        <div class="poem-card__content">\
          <p>My darling, my dear<br/>The love of my life<br/>I only want you to know</p>\
          <p>That when I am struggling<br/>Or dealing with strife<br/>To you is where I always go</p>\
          <p>When trouble is looming<br/>When problems draw near<br/>Just know that you\'ll always be</p>\
          <p>The one who I turn to<br/>The one who I call for<br/>The one I pull closest to me</p>\
        </div>\
        <fieldset class="poem-card__color-picker">\
          <legend class="sr-only">Select a color</legend>\
          <input type="radio" id="poem-color-red"   name="poem-color" value="#d44835" checked>\
          <label for="poem-color-red"   data-color="#f3b2af" title="Red">Red</label>\
          <input type="radio" id="poem-color-blue"  name="poem-color" value="#58b7ce">\
          <label for="poem-color-blue"  data-color="#b1f4fd" title="Blue">Blue</label>\
          <input type="radio" id="poem-color-green" name="poem-color" value="#229587">\
          <label for="poem-color-green" data-color="#d5fec5" title="Green">Green</label>\
          <input type="radio" id="poem-color-yellow" name="poem-color" value="#e7b843">\
          <label for="poem-color-yellow" data-color="#feffbe" title="Yellow">Yellow</label>\
          <input type="radio" id="poem-color-orange" name="poem-color" value="#e8874e">\
          <label for="poem-color-orange" data-color="#f9d7ac" title="Orange">Orange</label>\
        </fieldset>\
        <div class="poem-hearts">\
          <svg class="poem-heart-svg heart--top-left" viewBox="0 0 24 24" fill="none">\
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#e7b843"/>\
          </svg>\
          <svg class="poem-heart-svg heart--left-center" viewBox="0 0 24 24" fill="none">\
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#229587"/>\
          </svg>\
          <svg class="poem-heart-svg heart--top-center" viewBox="0 0 24 24" fill="none">\
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#d44835"/>\
          </svg>\
          <svg class="poem-heart-svg heart--bottom-center" viewBox="0 0 24 24" fill="none">\
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ce546d"/>\
          </svg>\
          <svg class="poem-heart-svg heart--bottom-right" viewBox="0 0 24 24" fill="none">\
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#e8874e"/>\
          </svg>\
          <svg class="poem-heart-svg heart--top-right" viewBox="0 0 24 24" fill="none">\
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#58b7ce"/>\
          </svg>\
        </div>\
      </div>'
    );

    // Insert poem card as a sibling to the cake container so it doesn't inherit its slide-out/opacity
    cardRoot.appendChild(poemCard);

    // Manage color selection by updating CSS variable --poem-accent on the card
    function applyAccent(hex){
      poemCard.style.setProperty('--poem-accent', hex);
    }
    // Initialize with default
    applyAccent('#d44835');

    var radios = poemCard.querySelectorAll('input[name="poem-color"]');
    radios.forEach(function(r){
      r.addEventListener('change', function(){ applyAccent(r.value); });
    });

    // State machine: toggling between cake and poem
    var state = { showing: 'cake' };

    function showPoem(){
      if(state.showing === 'poem') return;
      state.showing = 'poem';
      document.body.classList.add('poem-mode');
      cardRoot.classList.add('is-poem-active');
      poemCard.setAttribute('aria-hidden', 'false');
      cake.setAttribute('aria-hidden', 'true');
      // hide candles for clarity when poem is active
      document.querySelectorAll('.velas').forEach(function(v){ v.setAttribute('aria-hidden','true'); });
    }

    function showCake(){
      if(state.showing === 'cake') return;
      state.showing = 'cake';
      document.body.classList.remove('poem-mode');
      cardRoot.classList.remove('is-poem-active');
      poemCard.setAttribute('aria-hidden', 'true');
      cake.setAttribute('aria-hidden', 'false');
      document.querySelectorAll('.velas').forEach(function(v){ v.removeAttribute('aria-hidden'); });
    }

    // Swipe handling (touch + mouse)
    var startX = 0, startY = 0, tracking = false, moved = false;
    var threshold = Math.max(60, Math.round(window.innerWidth * 0.08)); // 8vw or 60px

    function onStart(x, y){ startX = x; startY = y; tracking = true; moved = false; }
    function onMove(x, y){
      if(!tracking) return;
      var dx = x - startX; var dy = y - startY;
      // ignore if mostly vertical
      if(Math.abs(dy) > Math.abs(dx) * 1.25) return;
      moved = true;
    }
    function onEnd(x){
      if(!tracking) return; tracking = false;
      if(!moved) return;
      var dx = x - startX;
      if(dx <= -threshold && state.showing === 'cake') { showPoem(); }
      else if(dx >= threshold && state.showing === 'poem') { showCake(); }
    }

    // Touch on cake (to reveal poem)
    cakeContainer.addEventListener('touchstart', function(e){ if(!e.touches[0]) return; onStart(e.touches[0].clientX, e.touches[0].clientY); }, {passive:true});
    cakeContainer.addEventListener('touchmove', function(e){ if(!e.touches[0]) return; onMove(e.touches[0].clientX, e.touches[0].clientY); }, {passive:true});
    cakeContainer.addEventListener('touchend', function(e){ var t = e.changedTouches && e.changedTouches[0]; onEnd(t ? t.clientX : startX); }, {passive:true});
    // Touch on poem (to bring cake back)
    poemCard.addEventListener('touchstart', function(e){ if(!e.touches[0]) return; onStart(e.touches[0].clientX, e.touches[0].clientY); }, {passive:true});
    poemCard.addEventListener('touchmove', function(e){ if(!e.touches[0]) return; onMove(e.touches[0].clientX, e.touches[0].clientY); }, {passive:true});
    poemCard.addEventListener('touchend', function(e){ var t = e.changedTouches && e.changedTouches[0]; onEnd(t ? t.clientX : startX); }, {passive:true});

    // Mouse (click-drag)
    cakeContainer.addEventListener('mousedown', function(e){ onStart(e.clientX, e.clientY); });
    poemCard.addEventListener('mousedown', function(e){ onStart(e.clientX, e.clientY); });
    window.addEventListener('mousemove', function(e){ onMove(e.clientX, e.clientY); });
    window.addEventListener('mouseup', function(e){ onEnd(e.clientX); });

    // Keyboard support
    window.addEventListener('keydown', function(e){
      if(e.key === 'ArrowLeft')   showPoem();
      if(e.key === 'ArrowRight')  showCake();
    });

    // Public API on window for simple programmatic control if needed
    window.__poemCard = { showPoem: showPoem, showCake: showCake, element: poemCard };
  }

  // Wait for DOM
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPoemCard);
  } else {
    initPoemCard();
  }
})();
