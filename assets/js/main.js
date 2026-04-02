/* ===================================
   Shahroz Rahman - Personal Portfolio
   Sci-Fi Cyber Matrix Theme - JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===================================
    // Matrix Rain Background
    // ===================================
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - including bio/genomic symbols
    const matrixChars = 'ACGT01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    // Draw matrix rain
    function drawMatrix() {
        // Semi-transparent black background for trail effect
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Matrix text
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            // Random character
            const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];

            // Gradient color for depth effect
            const gradient = ctx.createLinearGradient(0, drops[i] * fontSize, 0, (drops[i] + 1) * fontSize);
            gradient.addColorStop(0, '#00ff41');
            gradient.addColorStop(1, 'rgba(0, 255, 65, 0.5)');
            ctx.fillStyle = gradient;

            // Draw character
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            // Reset drop to top randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // Animate matrix
    setInterval(drawMatrix, 50);

    // ===================================
    // Navigation
    // ===================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navLogo = document.querySelector('.nav-logo');

    // Logo glitch effect on load
    if (navLogo) {
        const originalLogo = navLogo.textContent;
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        let glitchCount = 0;

        const logoGlitch = setInterval(() => {
            if (glitchCount < 15) {
                const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                navLogo.textContent = originalLogo.split('').map(() => randomChar).join('');
                glitchCount++;
            } else {
                navLogo.textContent = originalLogo;
                clearInterval(logoGlitch);
            }
        }, 50);

        // Occasional random glitch
        setInterval(() => {
            if (Math.random() > 0.95) {
                const temp = navLogo.textContent;
                navLogo.textContent = glitchChars[Math.floor(Math.random() * glitchChars.length)].repeat(temp.length);
                setTimeout(() => {
                    navLogo.textContent = temp;
                }, 100);
            }
        }, 3000);
    }

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navToggle) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ===================================
    // Cyber Typewriter Effect
    // ===================================
    const typewriter = document.getElementById('typewriter');
    const words = [
        'Professional Bioinformatician.',
        'Genomics Consultant.',
        'Pipeline Developer.',
        'Data Analysis Expert.',
        'Bioinformatics Service Provider.'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 30;
        } else {
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typewriter
    if (typewriter) {
        setTimeout(type, 1000);
    }

    // ===================================
    // Glitch Effect on Section Titles
    // ===================================
    const sectionTitles = document.querySelectorAll('.section-title');

    sectionTitles.forEach(title => {
        const originalText = title.textContent.replace('_', '');

        title.addEventListener('mouseenter', function() {
            let iterations = 0;
            const maxIterations = 10;

            const glitchInterval = setInterval(() => {
                this.textContent = this.textContent
                    .split('')
                    .map((char, index) => {
                        if (char === ' ' || char === '_') return char;
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return matrixChars[Math.floor(Math.random() * matrixChars.length)];
                    })
                    .join('');

                if (iterations >= originalText.length) {
                    clearInterval(glitchInterval);
                    this.textContent = originalText + '_';
                }

                iterations += 1 / 3;
            }, 30);
        });
    });

    // ===================================
    // Nav Link Text Distortion Effect
    // ===================================
    navLinks.forEach(link => {
        const originalText = link.textContent.trim();

        link.addEventListener('mouseenter', function() {
            if (this.dataset.glitching === 'true') return;

            let iterations = 0;
            this.dataset.glitching = 'true';

            const glitchInterval = setInterval(() => {
                this.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return matrixChars[Math.floor(Math.random() * matrixChars.length)];
                    })
                    .join('');

                if (iterations >= originalText.length) {
                    clearInterval(glitchInterval);
                    this.textContent = originalText;
                    this.dataset.glitching = 'false';
                }

                iterations += 0.6;
            }, 28);
        });

        link.addEventListener('mouseleave', function() {
            this.textContent = originalText;
            this.dataset.glitching = 'false';
        });
    });

    // ===================================
    // Scroll Animations (Intersection Observer)
    // ===================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // ===================================
    // Cyber Card Glitch Effect
    // ===================================
    const cyberCards = document.querySelectorAll('.cyber-card, .course-card, .stat-card, .skill-category');

    cyberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Random glitch effect on hover
            if (Math.random() > 0.7) {
                this.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                setTimeout(() => {
                    this.style.transform = '';
                }, 50);
            }
        });
    });

    // ===================================
    // Works Filter
    // ===================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            workItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.display = '';
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });

    // ===================================
    // Publications Sort
    // ===================================
    const publicationsSort = document.getElementById('publications-sort');
    const publicationsList = document.querySelector('.publications-list');

    if (publicationsSort && publicationsList) {
        publicationsSort.addEventListener('change', function() {
            const items = Array.from(publicationsList.querySelectorAll('.publication-item'));
            const sortBy = this.value;

            items.sort((a, b) => {
                const yearA = parseInt(a.dataset.year, 10) || 0;
                const yearB = parseInt(b.dataset.year, 10) || 0;
                const titleA = (a.dataset.title || '').toLowerCase();
                const titleB = (b.dataset.title || '').toLowerCase();

                if (sortBy === 'oldest') {
                    return yearA - yearB;
                }

                if (sortBy === 'title') {
                    return titleA.localeCompare(titleB);
                }

                return yearB - yearA;
            });

            items.forEach(item => publicationsList.appendChild(item));
        });
    }

    // ===================================
    // Back to Top Button
    // ===================================
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Form Handling with Cyber Effect
    // ===================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span>TRANSMITTING...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            submitBtn.style.borderColor = '#00ff41';
            submitBtn.style.color = '#00ff41';

            // Re-enable after form submits (Formspree handles the actual submission)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.borderColor = '';
                submitBtn.style.color = '';
            }, 3000);
        });
    }

    // ===================================
    // Parallax Effect for Hero Shapes
    // ===================================
    const heroShapes = document.querySelectorAll('.hero-shape');

    if (heroShapes.length > 0) {
        window.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            heroShapes.forEach((shape, index) => {
                const speed = (index + 1) * 30;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;

                shape.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // ===================================
    // Counter Animation for Stats with Cyber Effect
    // ===================================
    const statCards = document.querySelectorAll('.stat-card h4');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        statCards.forEach(stat => {
            const target = stat.textContent;
            const isNumber = /^\d+/.test(target);

            if (isNumber) {
                const num = parseInt(target);
                const suffix = target.replace(/\d+/, '');
                let current = 0;
                const increment = Math.ceil(num / 20);
                const duration = 1500;
                const stepTime = duration / (num / increment);

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= num) {
                        stat.textContent = target;
                        clearInterval(counter);
                        // Flash effect on completion
                        stat.style.textShadow = '0 0 30px #00ffff, 0 0 40px #00ffff';
                        setTimeout(() => {
                            stat.style.textShadow = '';
                        }, 300);
                    } else {
                        stat.textContent = current + suffix;
                    }
                }, stepTime);
            }
        });

        statsAnimated = true;
    }

    // Observe stats section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(aboutSection);
    }

    // ===================================
    // Random Glitch Effect on Page Elements
    // ===================================
    function randomGlitch() {
        const glitchElements = document.querySelectorAll('.cyber-card, .publication-item, .timeline-item');
        if (glitchElements.length === 0) return;

        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        const originalTransform = randomElement.style.transform;

        randomElement.style.transform = `translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px)`;
        randomElement.style.filter = 'hue-rotate(180deg)';

        setTimeout(() => {
            randomElement.style.transform = originalTransform;
            randomElement.style.filter = '';
        }, 100);
    }

    // Trigger random glitch every 10-15 seconds
    setInterval(randomGlitch, Math.random() * 5000 + 10000);

    // ===================================
    // Cursor Trail Effect (Cyber Glow)
    // ===================================
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 255, 255, 0.5), transparent);
        pointer-events: none;
        z-index: 9998;
        transition: 0.1s ease-out;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    // ===================================
    // Terminal Boot Sequence (Optional)
    // ===================================
    function bootSequence() {
        const hero = document.querySelector('.hero-greeting');
        if (!hero) return;

        const bootMessages = [
            '> INITIALIZING SYSTEM...',
            '> LOADING BIOINFORMATICS MODULE...',
            '> ACCESSING DATABASE...',
            '> SYSTEM READY.'
        ];

        let messageIndex = 0;
        const originalText = hero.textContent;

        const bootInterval = setInterval(() => {
            if (messageIndex < bootMessages.length) {
                hero.textContent = bootMessages[messageIndex];
                messageIndex++;
            } else {
                clearInterval(bootInterval);
                setTimeout(() => {
                    hero.textContent = originalText;
                }, 500);
            }
        }, 400);
    }

    // Run boot sequence on load (optional - can be removed if not wanted)
    // bootSequence();

    // ===================================
    // Social Icons Cyber Pulse Effect
    // ===================================
    const socialIcons = document.querySelectorAll('.social-icon');

    socialIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.1}s`;

        icon.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.8)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // ===================================
    // Console ASCII Art
    // ===================================
    console.log(`
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║   ███████╗██╗  ██╗ █████╗ ██╗  ██╗██████╗  ██████╗ ███████║
    ║   ██╔════╝██║  ██║██╔══██╗██║  ██║██╔══██╗██╔═══██╗╚══███║
    ║   ███████╗███████║███████║███████║██████╔╝██║   ██║  ███║ ║
    ║   ╚════██║██╔══██║██╔══██║██╔══██║██╔══██╗██║   ██║ ███║  ║
    ║   ███████║██║  ██║██║  ██║██║  ██║██║  ██║╚██████╔╝███████║
    ║   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
    ║                                                           ║
    ║              BIOINFORMATICS • DATA SCIENCE                ║
    ║              Portfolio v3.0 - Matrix Edition              ║
    ║                                                           ║
    ║   > SYSTEM STATUS: ONLINE                                ║
    ║   > THEME: SCI-FI CYBER MATRIX                          ║
    ║   > DESIGNED BY: Shahroz Rahman & Claude AI             ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    `);

    console.log('%c Welcome to the Matrix! 🧬', 'color: #00ff41; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ff41;');
    console.log('%c System initialized successfully.', 'color: #00ffff; font-size: 14px;');

    // ===================================
    // Initialize Complete
    // ===================================
    console.log('%c [✓] Portfolio loaded - Cyber Matrix Theme Active', 'color: #00ff41; font-weight: bold;');
});
