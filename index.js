// Birthday Cake Animation Script
// Original author: Marco Barría 
// https://twitter.com/marco_bf
// Enhanced for 19th birthday celebration with realistic animations

document.addEventListener('DOMContentLoaded', function() {
    const candles = document.querySelectorAll('.velas');
    const celebrationContainer = document.querySelector('.celebration-container');
    const counter = document.querySelector('.counter');
    const cakeContainer = document.querySelector('.cake-container');
    const cake = document.querySelector('#cake');
    let candlesBlownOut = 0;
    let celebrationTriggered = false;
    
    // Strawberry theme colors for confetti
    const strawberryColors = ['#ff8fa3', '#ffb6c1', '#ffd1dc', '#ffe0e6', '#ffc0cb'];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Responsive scaling system
    let currentScale = 1;
    let resizeTimeout;
    
    // Initialize responsive behavior
    initResponsiveFeatures();
    
    // Auto-trigger celebration after decorations appear (around 8s)
    setTimeout(() => {
        if (!celebrationTriggered) {
            triggerCelebration();
        }
    }, 8000);
    
    // Add click interaction to blow out candles
    candles.forEach((candle, index) => {
        candle.addEventListener('click', function() {
            const flames = this.querySelectorAll('.fuego');
            const isBlownOut = flames[0].style.opacity === '0';
            
            if (!isBlownOut) {
                // Blow out candle
                flames.forEach(flame => {
                    flame.style.animation = 'none';
                    flame.style.opacity = '0';
                    flame.style.transition = 'opacity 0.3s ease';
                });
                
                candlesBlownOut++;
                
                // Check if all candles are blown out
                if (candlesBlownOut === candles.length) {
                    setTimeout(() => {
                        triggerCelebration();
                    }, 500);
                }
                
                // Restart flames after 3 seconds
                setTimeout(() => {
                    flames.forEach(flame => {
                        flame.style.animation = '';
                        flame.style.opacity = '1';
                    });
                    candlesBlownOut--;
                }, 3000);
            }
        });
        
        // Add hover effect
        candle.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
    
    // Main celebration function with realistic animation
    function triggerCelebration() {
        if (celebrationTriggered) return;
        celebrationTriggered = true;
        
        // Show celebration container
        celebrationContainer.classList.add('active');
        
        // Animate text with realistic scaling and weight changes
        animateText();
        
        // Trigger confetti
        createStrawberryConfetti();
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            hideCelebration();
        }, 8000);
    }
    
    // Enhanced cute text animation with multiple stages
    function animateText() {
        // Stage 1: Initial appearance with bounce
        counter.classList.add('active');
        
        // Stage 2: Add celebration effects
        setTimeout(() => {
            counter.classList.add('celebrate');
            
            // Stage 3: Create floating hearts effect
            setTimeout(() => {
                createFloatingHearts();
            }, 1000);
            
            // Stage 4: Add text shake for extra cuteness
            setTimeout(() => {
                addTextShake();
            }, 2000);
            
        }, reducedMotion ? 0 : 1200);
    }
    
    // Create floating SVG hearts around the text
    function createFloatingHearts() {
        const heartTypes = ['heart', 'star', 'flower'];
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const heartContainer = document.createElement('div');
                const type = heartTypes[Math.floor(Math.random() * heartTypes.length)];
                const size = Math.random() * 15 + 20;
                
                heartContainer.innerHTML = getSVGHeart(type, size);
                heartContainer.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    z-index: 999;
                    pointer-events: none;
                    animation: floatingHearts ${3 + Math.random() * 1.5}s ease-out forwards;
                `;
                
                document.body.appendChild(heartContainer);
                
                setTimeout(() => {
                    heartContainer.remove();
                }, 4500);
            }, i * 300);
        }
    }
    
    // Generate SVG hearts, stars, and flowers
    function getSVGHeart(type, size) {
        const colors = ['#ff8fa3', '#ffb6c1', '#ffd1dc', '#ffe0e6'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        switch(type) {
            case 'heart':
                return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>`;
            case 'star':
                return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>`;
            case 'flower':
                return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>`;
        }
    }
    
    // Add cute text shake effect
    function addTextShake() {
        if (!reducedMotion) {
            counter.style.animation += ', cuteShake 0.5s ease-in-out';
        }
    }
    
    // Enhanced confetti with strawberry theme
    function createStrawberryConfetti() {
        // Main confetti burst
        if (window.confetti) {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: strawberryColors,
                disableForReducedMotion: true,
                shapes: ['circle', 'square'],
                scalar: 1.2,
                gravity: 0.8,
                drift: 0.1
            });
            
            // Secondary burst after 300ms
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    spread: 80,
                    origin: { y: 0.7 },
                    colors: strawberryColors,
                    disableForReducedMotion: true,
                    scalar: 0.8
                });
            }, 300);
            
            // Third burst for extra celebration
            setTimeout(() => {
                confetti({
                    particleCount: 80,
                    spread: 120,
                    origin: { y: 0.5 },
                    colors: strawberryColors,
                    disableForReducedMotion: true,
                    shapes: ['circle'],
                    scalar: 1.5
                });
            }, 600);
        }
        
        // Fallback confetti if library doesn't load
        createFallbackConfetti();
    }
    
    // Fallback confetti effect
    function createFallbackConfetti() {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                const color = strawberryColors[Math.floor(Math.random() * strawberryColors.length)];
                const size = Math.random() * 10 + 4;
                
                confetti.style.cssText = `
                    position: fixed;
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                    z-index: 999;
                    pointer-events: none;
                    animation: strawberryFall ${2.5 + Math.random() * 2}s linear forwards;
                `;
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 4500);
            }, i * 25);
        }
    }
    
    // Hide celebration with proper cleanup
    function hideCelebration() {
        celebrationContainer.classList.remove('active');
        counter.classList.remove('celebrate', 'active');
        counter.style.transform = 'scale(0.6) rotate(-5deg)';
        counter.style.fontWeight = '300';
        counter.style.animation = '';
        celebrationTriggered = false;
    }
    
    // Add CSS for enhanced animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes strawberryFall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes floatingHearts {
            0% {
                opacity: 0;
                transform: translateY(0) scale(0.5) rotate(0deg);
            }
            20% {
                opacity: 1;
                transform: translateY(-20px) scale(1) rotate(10deg);
            }
            80% {
                opacity: 1;
                transform: translateY(-80px) scale(1.2) rotate(-10deg);
            }
            100% {
                opacity: 0;
                transform: translateY(-120px) scale(0.8) rotate(20deg);
            }
        }
        
        @keyframes cuteShake {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            10% { transform: translateX(-2px) rotate(-1deg); }
            20% { transform: translateX(2px) rotate(1deg); }
            30% { transform: translateX(-2px) rotate(-1deg); }
            40% { transform: translateX(2px) rotate(1deg); }
            50% { transform: translateX(-1px) rotate(-0.5deg); }
            60% { transform: translateX(1px) rotate(0.5deg); }
            70% { transform: translateX(-1px) rotate(-0.5deg); }
            80% { transform: translateX(1px) rotate(0.5deg); }
            90% { transform: translateX(0) rotate(0deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Add keyboard interaction
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            // Blow out a random candle or trigger celebration
            const litCandles = Array.from(candles).filter(candle => 
                candle.querySelector('.fuego').style.opacity !== '0'
            );
            if (litCandles.length > 0) {
                const randomCandle = litCandles[Math.floor(Math.random() * litCandles.length)];
                randomCandle.click();
            } else {
                triggerCelebration();
            }
        }
        
        if (e.code === 'Enter') {
            e.preventDefault();
            triggerCelebration();
        }
    });
    
    // Responsive scaling function
    function initResponsiveFeatures() {
        updateScale();
        
        // Handle window resize with debouncing
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateScale();
                adjustCandlePositions();
            }, 150);
        });
        
        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                updateScale();
                adjustCandlePositions();
            }, 300);
        });
        
        // Initial candle position adjustment
        adjustCandlePositions();
    }
    
    function updateScale() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const isLandscape = viewportWidth > viewportHeight;
        
        // Calculate optimal scale based on viewport
        let optimalScale;
        
        if (viewportWidth <= 480) {
            optimalScale = isLandscape ? 0.75 : 0.95;
        } else if (viewportWidth <= 768) {
            optimalScale = isLandscape ? 0.85 : 1.0;
        } else if (viewportWidth <= 1024) {
            optimalScale = 1.05;
        } else {
            optimalScale = 1.1;
        }
        
        // Apply scale with smooth transition
        if (Math.abs(currentScale - optimalScale) > 0.05) {
            currentScale = optimalScale;
            if (cakeContainer) {
                cakeContainer.style.transition = 'transform 0.3s ease';
                cakeContainer.style.transform = `scale(${currentScale})`;
                
                // Ensure candles maintain proper positioning after scaling
                setTimeout(() => {
                    adjustCandlePositions();
                }, 300);
            }
        }
    }
    
    function adjustCandlePositions() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const isLandscape = viewportWidth > viewportHeight;
        const candle1 = document.querySelector('.candle-1.velas');
        const candle9 = document.querySelector('.candle-9.velas');
        
        if (candle1 && candle9) {
            let topOffset, leftOffset1, rightOffset9;
            
            if (viewportWidth <= 480) {
                topOffset = isLandscape ? '5%' : '6%';
                leftOffset1 = isLandscape ? '37%' : '32%';
                rightOffset9 = isLandscape ? '37%' : '32%';
            } else if (viewportWidth <= 768) {
                topOffset = '7%';
                leftOffset1 = '34%';
                rightOffset9 = '34%';
            } else if (viewportWidth <= 1024) {
                topOffset = '8%';
                leftOffset1 = '35%';
                rightOffset9 = '35%';
            } else {
                topOffset = '8%';
                leftOffset1 = '35%';
                rightOffset9 = '35%';
            }
            
            // Apply positioning with smooth transition
            candle1.style.top = topOffset;
            candle1.style.left = leftOffset1;
            candle9.style.top = topOffset;
            candle9.style.right = rightOffset9;
            
            // Ensure candles maintain their drop-in animation state
            if (!candle1.style.transform.includes('translateY(-500px)')) {
                candle1.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            }
            if (!candle9.style.transform.includes('translateY(-500px)')) {
                candle9.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            }
        }
    }
    
    // Enhanced confetti with responsive particle count and positioning
    function getResponsiveParticleCount() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const isLandscape = viewportWidth > viewportHeight;
        
        if (viewportWidth <= 480) {
            return isLandscape ? 
                { main: 60, secondary: 40, third: 25 } : 
                { main: 80, secondary: 60, third: 40 };
        }
        if (viewportWidth <= 768) {
            return isLandscape ? 
                { main: 100, secondary: 70, third: 50 } : 
                { main: 120, secondary: 80, third: 60 };
        }
        return { main: 150, secondary: 100, third: 80 };
    }
    
    // Get optimal confetti origin based on candle positions
    function getConfettiOrigin() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const isLandscape = viewportWidth > viewportHeight;
        
        // Adjust origin based on cake and candle positioning
        if (isLandscape && viewportHeight <= 600) {
            return { x: 0.5, y: 0.4 }; // Higher up for landscape
        } else if (viewportWidth <= 480) {
            return { x: 0.5, y: 0.5 }; // Centered for mobile
        }
        return { x: 0.5, y: 0.6 }; // Default position
    }
    
    // Update confetti function to use responsive particle count and positioning
    const originalCreateStrawberryConfetti = createStrawberryConfetti;
    createStrawberryConfetti = function() {
        const particleCounts = getResponsiveParticleCount();
        const origin = getConfettiOrigin();
        
        // Main confetti burst
        if (window.confetti) {
            confetti({
                particleCount: particleCounts.main,
                spread: 100,
                origin: origin,
                colors: strawberryColors,
                disableForReducedMotion: true,
                shapes: ['circle', 'square'],
                scalar: currentScale * 1.2,
                gravity: 0.8,
                drift: 0.1
            });
            
            // Secondary burst after 300ms
            setTimeout(() => {
                confetti({
                    particleCount: particleCounts.secondary,
                    spread: 80,
                    origin: { x: origin.x, y: origin.y + 0.1 },
                    colors: strawberryColors,
                    disableForReducedMotion: true,
                    scalar: currentScale * 0.8
                });
            }, 300);
            
            // Third burst for extra celebration
            setTimeout(() => {
                confetti({
                    particleCount: particleCounts.third,
                    spread: 120,
                    origin: { x: origin.x, y: origin.y - 0.1 },
                    colors: strawberryColors,
                    disableForReducedMotion: true,
                    shapes: ['circle'],
                    scalar: currentScale * 1.5
                });
            }, 600);
        }
        
        // Fallback confetti if library doesn't load
        createFallbackConfetti();
    };
    
    // Touch-friendly interactions for mobile
    if ('ontouchstart' in window) {
        candles.forEach(candle => {
            candle.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.click();
            });
        });
    }
    
    // Performance optimization: Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-viewport');
                } else {
                    entry.target.classList.remove('in-viewport');
                }
            });
        }, { threshold: 0.1 });
        
        if (cake) observer.observe(cake);
        if (celebrationContainer) observer.observe(celebrationContainer);
    }
    
    // Welcome message
    console.log('🎉 Happy 19th Birthday! 🎂');
    console.log('💡 Click candles to blow them out or press SPACE/ENTER to celebrate!');
    console.log('📱 Fully responsive design - works on any screen size!');
    console.log('🕯️ Candles now drop from above and land perfectly on cake top!');
    console.log('✨ Enhanced drop-in animation with realistic physics!');
});