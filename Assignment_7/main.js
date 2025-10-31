// main.js - Main JavaScript file for interactivity

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            console.log('Nav toggle clicked - Menu active:', navMenu.classList.contains('active'));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Animated counter for statistics
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };
    
    // Intersection Observer for statistics animation
    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // Mission filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const missionCards = document.querySelectorAll('.mission-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            
            // Filter mission cards
            missionCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
    
    // Add fade-in animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .timeline-item, .mission-card, .tech-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    };
    
    // CSS class for fade-in animation and mobile navigation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        /* Navigation styles */
        .nav-toggle {
            display: none;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            background: transparent;
            border: none;
            cursor: pointer;
            z-index: 1001;
            padding: 5px;
        }
        
        .nav-toggle span {
            display: block;
            width: 25px;
            height: 3px;
            background: #f5f5f5;
            margin: 3px 0;
            transition: all 0.3s ease;
            border-radius: 2px;
        }
        
        @media (max-width: 768px) {
            .nav-toggle {
                display: flex !important;
            }
            
            .nav-menu {
                display: none;
                position: fixed;
                top: 60px;
                left: 0;
                right: 0;
                flex-direction: column;
                background: rgba(26, 26, 46, 0.98);
                padding: 2rem 1rem;
                backdrop-filter: blur(15px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                z-index: 999;
                transform: translateY(-20px);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .nav-menu.active {
                display: flex !important;
                transform: translateY(0);
                opacity: 1;
            }
            
            .nav-menu li {
                width: 100%;
                text-align: center;
                margin: 0.5rem 0;
            }
            
            .nav-menu .nav-link {
                display: block;
                width: 100%;
                padding: 1rem;
                border-radius: 8px;
                transition: all 0.3s ease;
            }
            
            .nav-menu .nav-link:hover,
            .nav-menu .nav-link.active {
                background: rgba(233, 69, 96, 0.2);
            }
            
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(6px, 6px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
                transform: scale(0);
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
        
        @media (min-width: 769px) {
            .nav-toggle {
                display: none !important;
            }
            
            .nav-menu {
                display: flex !important;
                opacity: 1 !important;
                transform: none !important;
                position: relative !important;
                background: transparent !important;
                padding: 0 !important;
                box-shadow: none !important;
                flex-direction: row !important;
            }
            
            .nav-menu li {
                margin: 0 !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize animations
    animateOnScroll();
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.feature-card, .mission-card, .tech-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Add active page highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Add smooth reveal for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Console message
    console.log('🚀 Space Exploration Website Loaded Successfully!');
    console.log('This project demonstrates CSS Grid, Flexbox, and SASS/SCSS features.');
});

// Add some interactive space particles
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            star.style.animationDuration = `${2 + Math.random() * 3}s`;
            starsContainer.appendChild(star);
        }
    }
}

// Initialize stars on page load
window.addEventListener('load', createStars);

// Add dynamic star CSS
const starStyle = document.createElement('style');
starStyle.textContent = `
    .stars {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    
    .star {
        position: absolute;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        animation: twinkle linear infinite;
    }
    
    @keyframes twinkle {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(starStyle);