(function(){
  // Simple helper to create elements from HTML
  function html(str){
    var t = document.createElement('template');
    return t.content.firstElementChild;
  }

  function escapeHTML(value){
    if(value === undefined || value === null) return '';
    return String(value).replace(/[&<>"']/g, function(match){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[match]);
    });
  }

  var POEM_THEMES = [
    {
      '--card-bg-top': '#fff0f6',
      '--card-bg-bottom': '#f8d6e4',
      '--card-radial': 'rgba(255, 255, 255, 0.65)',
      '--card-border': 'rgba(255, 195, 208, 0.68)',
      '--card-glow': 'rgba(255, 255, 255, 0.22)',
      '--line-color': 'rgba(238, 207, 215, 0.85)',
      '--text-color': 'rgba(44, 26, 45, 0.92)',
      '--meta-color': 'rgba(64, 33, 52, 0.75)',
      '--top-pattern': 'repeating-linear-gradient(90deg, rgba(255, 158, 173, 0.35) 0 26px, rgba(255, 116, 154, 0.55) 26px 52px)',
      '--scroll-thumb-start': '#ffd1dc',
      '--scroll-thumb-end': '#ff9fb6',
      '--scroll-thumb-hover-start': '#ffabc3',
      '--scroll-thumb-hover-end': '#ff7aa2',
      '--scroll-track': 'rgba(255, 255, 255, 0.65)',
      '--scroll-track-outline': 'rgba(255, 182, 193, 0.35)',
      '--tab-active-shadow': '0 0 0 3px rgba(255, 255, 255, 0.45)'
    },
    {
      '--card-bg-top': '#f0f7ff',
      '--card-bg-bottom': '#d7e8ff',
      '--card-radial': 'rgba(255, 255, 255, 0.72)',
      '--card-border': 'rgba(161, 204, 255, 0.7)',
      '--card-glow': 'rgba(255, 255, 255, 0.24)',
      '--line-color': 'rgba(193, 221, 255, 0.85)',
      '--text-color': 'rgba(37, 51, 76, 0.92)',
      '--meta-color': 'rgba(37, 51, 76, 0.75)',
      '--top-pattern': 'repeating-linear-gradient(90deg, rgba(177, 244, 253, 0.4) 0 26px, rgba(121, 212, 255, 0.6) 26px 52px)',
      '--scroll-thumb-start': '#b1f4fd',
      '--scroll-thumb-end': '#79d4ff',
      '--scroll-thumb-hover-start': '#8bdfff',
      '--scroll-thumb-hover-end': '#53c2ff',
      '--scroll-track': 'rgba(240, 249, 255, 0.85)',
      '--scroll-track-outline': 'rgba(161, 204, 255, 0.38)',
      '--tab-active-shadow': '0 0 0 3px rgba(171, 219, 255, 0.6)'
    },
    {
      '--card-bg-top': '#f3fff3',
      '--card-bg-bottom': '#d5f5df',
      '--card-radial': 'rgba(255, 255, 255, 0.7)',
      '--card-border': 'rgba(169, 219, 187, 0.7)',
      '--card-glow': 'rgba(255, 255, 255, 0.22)',
      '--line-color': 'rgba(193, 230, 205, 0.85)',
      '--text-color': 'rgba(41, 72, 57, 0.94)',
      '--meta-color': 'rgba(41, 72, 57, 0.75)',
      '--top-pattern': 'repeating-linear-gradient(90deg, rgba(213, 254, 197, 0.4) 0 26px, rgba(159, 224, 180, 0.6) 26px 52px)',
      '--scroll-thumb-start': '#d5fec5',
      '--scroll-thumb-end': '#9fe0b4',
      '--scroll-thumb-hover-start': '#b8f7c8',
      '--scroll-thumb-hover-end': '#85d6a6',
      '--scroll-track': 'rgba(244, 255, 244, 0.82)',
      '--scroll-track-outline': 'rgba(169, 219, 187, 0.4)',
      '--tab-active-shadow': '0 0 0 3px rgba(180, 235, 200, 0.6)'
    },
    {
      '--card-bg-top': '#fffbe8',
      '--card-bg-bottom': '#fceac0',
      '--card-radial': 'rgba(255, 255, 255, 0.7)',
      '--card-border': 'rgba(247, 212, 141, 0.72)',
      '--card-glow': 'rgba(255, 255, 255, 0.22)',
      '--line-color': 'rgba(247, 221, 165, 0.85)',
      '--text-color': 'rgba(82, 59, 19, 0.9)',
      '--meta-color': 'rgba(82, 59, 19, 0.75)',
      '--top-pattern': 'repeating-linear-gradient(90deg, rgba(254, 255, 190, 0.38) 0 26px, rgba(255, 219, 120, 0.58) 26px 52px)',
      '--scroll-thumb-start': '#feffbe',
      '--scroll-thumb-end': '#ffd86b',
      '--scroll-thumb-hover-start': '#ffe78a',
      '--scroll-thumb-hover-end': '#ffc94c',
      '--scroll-track': 'rgba(255, 250, 232, 0.85)',
      '--scroll-track-outline': 'rgba(247, 212, 141, 0.42)',
      '--tab-active-shadow': '0 0 0 3px rgba(255, 236, 170, 0.6)'
    },
    {
      '--card-bg-top': '#fff3e4',
      '--card-bg-bottom': '#ffd9b6',
      '--card-radial': 'rgba(255, 255, 255, 0.68)',
      '--card-border': 'rgba(255, 194, 146, 0.7)',
      '--card-glow': 'rgba(255, 255, 255, 0.22)',
      '--line-color': 'rgba(255, 214, 180, 0.85)',
      '--text-color': 'rgba(96, 54, 24, 0.92)',
      '--meta-color': 'rgba(96, 54, 24, 0.75)',
      '--top-pattern': 'repeating-linear-gradient(90deg, rgba(249, 215, 172, 0.4) 0 26px, rgba(255, 173, 106, 0.58) 26px 52px)',
      '--scroll-thumb-start': '#f9d7ac',
      '--scroll-thumb-end': '#ffad6a',
      '--scroll-thumb-hover-start': '#ffbf86',
      '--scroll-thumb-hover-end': '#ff9852',
      '--scroll-track': 'rgba(255, 244, 232, 0.85)',
      '--scroll-track-outline': 'rgba(255, 194, 146, 0.42)',
      '--tab-active-shadow': '0 0 0 3px rgba(255, 210, 170, 0.6)'
    }
  ];

  function applyPoemTheme(card, index){
    var theme = POEM_THEMES[index] || POEM_THEMES[0];
    Object.keys(theme).forEach(function(varName){
      card.style.setProperty(varName, theme[varName]);
    });
    var tabs = card.querySelectorAll('.tab');
    tabs.forEach(function(tab, tabIndex){
      var isActive = tabIndex === index;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    card.dataset.themeIndex = String(index);
  }

  function initPoemCardThemes(card){
    var tabs = card.querySelectorAll('.tab');
    if(!tabs.length) return;

    function handleActivate(index){
      applyPoemTheme(card, index);
    }

    tabs.forEach(function(tab, index){
      tab.dataset.themeIndex = String(index);
      tab.setAttribute('role', 'button');
      tab.setAttribute('tabindex', '0');
      tab.setAttribute('aria-pressed', 'false');

      tab.addEventListener('click', function(){ handleActivate(index); });
      tab.addEventListener('keydown', function(event){
        if(event.key === 'Enter' || event.key === ' '){
          event.preventDefault();
          handleActivate(index);
        }
      });
    });

    applyPoemTheme(card, 0);
  }

  function createPoemCard(poem, isTop){
    var card = document.createElement('div');
    card.className = isTop ? 'poem-card top-poem' : 'poem-card';

    var poemCopy = poem && poem.poem ? poem.poem : '';
    var poemTitle = escapeHTML(poem && poem.title ? poem.title : 'Untitled');
    var authorName = escapeHTML(poem && poem.author ? poem.author : 'Unknown');
    var poemLines = escapeHTML(poemCopy)
      .split('\n')
      .map(function(line){
        return line ? '<p>' + line + '</p>' : '<p>&nbsp;</p>';
      })
      .join('');

    card.innerHTML =
      '<div class="card__content">' +
        '<h3>' + poemTitle + '</h3>' +
        '<div class="poem-body">' + poemLines + '</div>' +
        '<p class="poem-meta"><em>&mdash; ' + authorName + '</em></p>' +
      '</div>' +
      '<div class="card__tabs">' +
        '<div class="tab"></div>' +
        '<div class="tab"></div>' +
        '<div class="tab"></div>' +
        '<div class="tab"></div>' +
        '<div class="tab"></div>' +
      '</div>' +
      '<div class="hearts">' +
        '<div class="heart heart--is-yellow heart--top-left"></div>' +
        '<div class="heart heart--with-dots heart--is-green heart--left-center"></div>' +
        '<div class="heart heart--with-dots heart--is-red heart--top-center"></div>' +
        '<div class="heart heart--is-pink heart--bottom-center"></div>' +
        '<div class="heart heart--is-orange heart--bottom-right"></div>' +
        '<div class="heart heart--is-blue heart--with-lines heart--top-right"></div>' +
      '</div>';

    initPoemCardThemes(card);
    return card;
  }

  function collectExternalNodes(){
    var selectors = [
      '[data-online-only]',
      'img[src^="http"], img[src^="//"]',
      'image[href^="http"], image[href^="//"]',
      'a[href^="http"], a[href^="//"]'
    ];
    var seen = new Set();
    var nodes = [];
    selectors.forEach(function(selector){
      document.querySelectorAll(selector).forEach(function(node){
        if(seen.has(node)) return;
        seen.add(node);
        nodes.push(node);
      });
    });
    return nodes;
  }

  function initPoemCard(){
    var cardRoot = document.querySelector('.greeting-card');
    var cakeContainer = document.querySelector('.cake-container');
    var cake = document.getElementById('cake');
    var offlineBanner = document.querySelector('.offline-banner');
    var bodyEl = document.body;
    if(!cardRoot || !cakeContainer || !cake) return;

    var externalAssets = collectExternalNodes();
    var offlineGuardEnabled = true;
    var isOffline = false;

    function updateOfflineState(nextOffline){
      if(nextOffline === isOffline) return;
      isOffline = nextOffline;

      if(offlineBanner){
        offlineBanner.classList.toggle('offline-banner--visible', isOffline);
      }
      if(bodyEl){
        bodyEl.classList.toggle('is-offline', isOffline);
      }

      externalAssets.forEach(function(node){
        if(isOffline){
          if(node.tagName === 'IMG' || node.tagName === 'IMAGE'){
            if(node.dataset.offlineDisplay === undefined){
              node.dataset.offlineDisplay = node.style.display || '';
            }
            node.style.display = 'none';
          }
          if(node.tagName === 'A'){
            node.setAttribute('aria-disabled', 'true');
            node.setAttribute('tabindex', '-1');
          }
        } else {
          if(node.tagName === 'IMG' || node.tagName === 'IMAGE'){
            node.style.display = node.dataset.offlineDisplay || '';
          }
          if(node.tagName === 'A'){
            node.removeAttribute('aria-disabled');
            node.removeAttribute('tabindex');
          }
        }
      });
    }

    function handleOnline(){ updateOfflineState(false); }
    function handleOffline(){ updateOfflineState(true); }

    if(offlineGuardEnabled){
      handleOnline();
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      if(!navigator.onLine){ handleOffline(); }
      document.addEventListener('click', function(event){
        if(!isOffline) return;
        var anchor = event.target.closest('a[href^="http"], a[href^="//"]');
        if(anchor){
          event.preventDefault();
          event.stopPropagation();
        }
      }, true);
    }

    var poemData = {
      title: 'My Darling, My Dear',
      poem: [
        'My darling, my dear',
        'The love of my life',
        'I only want you to know',
        '',
        'That when I am struggling',
        'Or dealing with strife',
        'To you is where I always go',
        '',
        'When trouble is looming',
        'When problems draw near',
        "Just know that you'll always be",
        '',
        'The one who I turn to',
        'The one who I call for',
        'The one I pull closest to me'
      ].join('\n'),
      author: 'Nimfa'
    };

    var poemCard = createPoemCard(poemData);
    poemCard.setAttribute('role', 'group');
    poemCard.setAttribute('aria-label', 'Poem card');
    poemCard.setAttribute('aria-hidden', 'true');

    // Insert poem card as a sibling to the cake container so it doesn't inherit its slide-out/opacity
    cardRoot.appendChild(poemCard);

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
