// Portfolio JavaScript - Modern Parallax Effects and Smooth Animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initParallax();
    initScrollProgress();
    initDevParticles();
    initDevElements();
    initBackToTop();
    initScrollAnimations();
    initPortfolioFilters();
    initSmoothScrolling();
    initContactForm();
    initPreloader();
    adjustAboutLayout();
    initSectionParticles();
});

// Ajusta la disposición de la sección "Acerca de mí" si la columna de imagen está vacía
function adjustAboutLayout() {
    const aboutImage = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    if (!aboutContent) return;
    // Si no existe o no tiene contenido visible, aplicamos una sola columna
    if (!aboutImage || aboutImage.innerHTML.trim() === '' || aboutImage.offsetHeight === 0) {
        aboutContent.classList.add('one-column');
    } else {
        aboutContent.classList.remove('one-column');
    }
}

// Navigation Functions
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Advanced Parallax Effects
function initParallax() {
    const heroImage = document.querySelector('.hero-image');
    const heroText = document.querySelector('.hero-text');
    const hero = document.querySelector('.hero');

    let currentScrollY = window.pageYOffset;
    let mouseX = 0;
    let mouseY = 0;
    let ticking = false;

    function updatePositions() {
        const scrollY = window.pageYOffset;

        // Hero elements parallax
        if (heroImage) {
            const imageScrollEffect = scrollY * 0.3;
            const imageMouseEffectX = mouseX * 0.02;
            const imageMouseEffectY = mouseY * 0.02;
            heroImage.style.transform = `translate3d(${imageMouseEffectX}px, ${-imageScrollEffect + imageMouseEffectY}px, 0)`;
        }
        if (heroText) {
            const textScrollEffect = scrollY * 0.15;
            const textMouseEffectX = mouseX * 0.01;
            const textMouseEffectY = mouseY * 0.01;
            heroText.style.transform = `translate3d(${textMouseEffectX}px, ${-textScrollEffect + textMouseEffectY}px, 0)`;
        }
        
        // Fade out hero content on scroll
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const opacity = 1 - scrollY / (window.innerHeight * 0.8);
            heroContent.style.opacity = Math.max(0, opacity);
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updatePositions);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { offsetWidth: width, offsetHeight: height } = hero;
            mouseX = clientX - width / 2;
            mouseY = clientY - height / 2;
            requestTick();
        });
    }
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Stagger animation for portfolio items
                if (entry.target.classList.contains('portfolio-item')) {
                    const items = document.querySelectorAll('.portfolio-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('active');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll(`
        .portfolio-item,
        .resume-item,
        .about-text,
        .about-image,
        .contact-content,
        .section-title
    `);

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Special animation for hero elements
    setTimeout(() => {
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroText) heroText.classList.add('slide-in-left', 'active');
        if (heroImage) heroImage.classList.add('slide-in-right', 'active');
    }, 500);
}

// Portfolio Filter System
function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items with smooth animation
            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                setTimeout(() => {
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(-20px)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }, index * 50);
            });
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple form validation and submission
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            
            // Disable button and show loading state
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                submitBtn.textContent = '¡Mensaje enviado!';
                submitBtn.style.background = '#4CAF50';
                
                // Reset form
                form.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = 'Enviar mensaje';
                    submitBtn.style.background = '#000';
                    submitBtn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }
}

// Preloader
function initPreloader() {
    // Create preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">MR</div>
            <div class="preloader-progress">
                <div class="preloader-bar"></div>
            </div>
        </div>
    `;
    
    // Add preloader styles
    const preloaderStyles = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .preloader-content {
            text-align: center;
        }
        
        .preloader-logo {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 600;
            margin-bottom: 2rem;
            color: #000;
        }
        
        .preloader-progress {
            width: 200px;
            height: 2px;
            background: #f0f0f0;
            overflow: hidden;
        }
        
        .preloader-bar {
            width: 0%;
            height: 100%;
            background: #000;
            transition: width 0.3s ease;
        }
        
        .preloader.hidden {
            opacity: 0;
            pointer-events: none;
        }
    `;
    
    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = preloaderStyles;
    document.head.appendChild(styleSheet);
    
    // Add preloader to body
    document.body.appendChild(preloader);
    
    // Simulate loading progress
    const progressBar = preloader.querySelector('.preloader-bar');
    let progress = 0;
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        if (progress === 100) {
            clearInterval(progressInterval);
            
            setTimeout(() => {
                preloader.classList.add('hidden');
                
                setTimeout(() => {
                    preloader.remove();
                    styleSheet.remove();
                }, 500);
            }, 500);
        }
    }, 200);
}

// Advanced scroll effects (reserved for future use)
window.addEventListener('scroll', () => {
    // handled by specific modules (parallax, progress, back-to-top)
});

// Scroll progress bar at the top
function initScrollProgress() {
    // Inject styles
    const styles = `
        .scroll-progress {
            position: fixed;
            top: 0; left: 0;
            height: 3px;
            width: 100%;
            background: rgba(255,255,255,0.08);
            z-index: 2000;
            pointer-events: none;
        }
        .scroll-progress__bar {
            height: 100%;
            width: 0%;
            background: #fff;
            transform-origin: left center;
            transition: transform 0.08s linear;
        }
    `;
    const sheet = document.createElement('style');
    sheet.textContent = styles;
    document.head.appendChild(sheet);

    // Create DOM
    const track = document.createElement('div');
    track.className = 'scroll-progress';
    const bar = document.createElement('div');
    bar.className = 'scroll-progress__bar';
    track.appendChild(bar);
    document.body.appendChild(track);

    const update = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        // Use transform for better perf
        bar.style.transform = `scaleX(${progress})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
}

// Developer-themed particles on hero using Canvas
function initDevParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Inject styles for canvas
    const styles = `
        #dev-particles {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
            opacity: 0.35;
        }
    `;
    const sheet = document.createElement('style');
    sheet.textContent = styles;
    document.head.appendChild(sheet);

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'dev-particles';
    hero.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const dpr = window.devicePixelRatio || 1;
    let width, height, particles = [], mouse = { x: null, y: null };

    const symbols = ['</>', '<>', '{}', '[]', '()','01', 'λ', 'π', 'Σ', '⚙'];

    function resize() {
        width = hero.clientWidth;
        height = hero.clientHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        // Rebuild particles to fit
        buildParticles();
    }

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function buildParticles() {
        const density = Math.max(30, Math.floor((width * height) / 45000)); // responsive count
        particles = new Array(density).fill(0).map(() => ({
            x: rand(0, width),
            y: rand(0, height),
            vx: rand(-0.15, 0.15),
            vy: rand(0.1, 0.5),
            size: rand(10, 22),
            sym: symbols[Math.floor(rand(0, symbols.length))],
            rot: rand(0, Math.PI * 2),
            rotSpeed: rand(-0.002, 0.002),
            alpha: rand(0.25, 0.7)
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        particles.forEach(p => {
            // Mouse repulsion
            if (mouse.x !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist2 = dx*dx + dy*dy;
                const radius = 120;
                if (dist2 < radius*radius) {
                    const force = (radius*radius - dist2) / (radius*radius);
                    p.vx += (dx / Math.sqrt(dist2 + 0.001)) * force * 0.02;
                    p.vy += (dy / Math.sqrt(dist2 + 0.001)) * force * 0.02;
                }
            }

            // Update
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.rotSpeed;

            // Wrap
            if (p.x < -50) p.x = width + 50;
            if (p.x > width + 50) p.x = -50;
            if (p.y > height + 50) {
                p.y = -50;
                p.x = rand(0, width);
            }

            // Draw
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = '#fff';
            ctx.font = `${p.size}px SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
            ctx.fillText(p.sym, 0, 0);
            ctx.restore();
        });

        requestAnimationFrame(draw);
    }

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', () => {
        mouse.x = mouse.y = null;
    });

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(draw);
}

// Floating dev/programming/engineering elements
function initDevElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const styles = `
        .dev-elements {
            position: absolute;
            inset: 0;
            z-index: 2;
            pointer-events: none;
        }
        .dev-element {
            position: absolute;
            color: rgba(255,255,255,0.25);
            font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            font-weight: 500;
            text-shadow: 0 2px 8px rgba(0,0,0,0.5);
            animation: devFloat 8s ease-in-out infinite;
            will-change: transform;
        }
        @keyframes devFloat {
            0%, 100% { transform: translateY(0) }
            50% { transform: translateY(-12px) }
        }
    `;
    const sheet = document.createElement('style');
    sheet.textContent = styles;
    document.head.appendChild(sheet);

    const container = document.createElement('div');
    container.className = 'dev-elements';
    const items = [
        { txt: '</>', top: '18%', left: '12%', size: '28px', delay: '0s' },
        { txt: '{}', top: '28%', left: '78%', size: '26px', delay: '0.6s' },
        { txt: '[]', top: '64%', left: '10%', size: '24px', delay: '0.3s' },
        { txt: 'λ', top: '70%', left: '75%', size: '30px', delay: '0.9s' },
        { txt: '⚙', top: '40%', left: '50%', size: '34px', delay: '0.2s' },
        { txt: '01', top: '22%', left: '52%', size: '22px', delay: '0.4s' }
    ];
    items.forEach(it => {
        const span = document.createElement('span');
        span.className = 'dev-element';
        span.textContent = it.txt;
        span.style.top = it.top;
        span.style.left = it.left;
        span.style.fontSize = it.size;
        span.style.animationDelay = it.delay;
        container.appendChild(span);
    });
    hero.appendChild(container);

    // light parallax on mouse move
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        container.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    });
    hero.addEventListener('mouseleave', () => {
        container.style.transform = 'translate(0,0)';
    });
}

// Partículas sutiles para secciones con fondo oscuro
function initSectionParticles() {
    const selectors = ['.portfolio', '.resume', '.about', '.contact', '.footer'];

    selectors.forEach((sel, idx) => {
        const container = document.querySelector(sel);
        if (!container) return;

        // No duplicar canvas si ya existe
        if (container.querySelector('.section-particles')) return;

        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.className = 'section-particles';
        canvas.style.position = 'absolute';
        canvas.style.inset = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = 1; // behind text but above background
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.12';
        container.style.position = container.style.position || 'relative';
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let width, height, particles = [];

        function rand(min, max) { return Math.random() * (max - min) + min; }

        function resize() {
            width = container.clientWidth;
            height = container.clientHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            buildParticles();
        }

        function buildParticles() {
            const density = Math.max(12, Math.floor((width * height) / 120000));
            particles = new Array(density).fill(0).map(() => ({
                x: rand(0, width),
                y: rand(0, height),
                vx: rand(-0.15, 0.15),
                vy: rand(-0.05, 0.15),
                size: rand(1.5, 4),
                alpha: rand(0.05, 0.18)
            }));
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                // wrap around
                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;
                if (p.y > height + 10) p.y = -10;

                ctx.beginPath();
                ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(draw);
        }

        // Subtle mouse parallax
        let mouse = { x: null, y: null };
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            mouse.x = (e.clientX - rect.left) / rect.width - 0.5;
            mouse.y = (e.clientY - rect.top) / rect.height - 0.5;
            // apply tiny shift to particles
            particles.forEach(p => {
                p.x += mouse.x * 0.3;
                p.y += mouse.y * 0.3;
            });
        });
        container.addEventListener('mouseleave', () => { mouse.x = mouse.y = null; });

        window.addEventListener('resize', resize);
        resize();
        requestAnimationFrame(draw);
    });
}

// Back-to-top button
function initBackToTop() {
    const styles = `
        .back-to-top {
            position: fixed;
            right: 20px;
            bottom: 20px;
            width: 42px; height: 42px;
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.3);
            background: rgba(0,0,0,0.4);
            color: #fff;
            display: grid; place-items: center;
            font-size: 18px;
            cursor: pointer;
            z-index: 1500;
            opacity: 0; transform: translateY(10px);
            transition: opacity .25s ease, transform .25s ease;
            backdrop-filter: blur(6px);
        }
        .back-to-top.visible { opacity: 1; transform: translateY(0); }
    `;
    const sheet = document.createElement('style');
    sheet.textContent = styles;
    document.head.appendChild(sheet);

    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Volver arriba');
    btn.textContent = '↑';
    document.body.appendChild(btn);

    const onScroll = () => {
        if (window.scrollY > window.innerHeight * 0.8) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth mouse cursor effect
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorStyles = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 2px solid #000;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        }
        
        .custom-cursor.hover {
            transform: scale(2);
        }
    `;
    
    const cursorStyleSheet = document.createElement('style');
    cursorStyleSheet.textContent = cursorStyles;
    document.head.appendChild(cursorStyleSheet);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Hover effects for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .portfolio-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Initialize custom cursor on desktop
if (window.innerWidth > 768) {
    initCustomCursor();
}

// Resize handler
window.addEventListener('resize', () => {
    // Reinitialize some effects on resize
    if (window.innerWidth <= 768) {
        const customCursor = document.querySelector('.custom-cursor');
        if (customCursor) customCursor.remove();
    }
});