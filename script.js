// script.js - Humaira Pervaish Portfolio JavaScript

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const statNumbers = document.querySelectorAll('.stat-number');
const skillItems = document.querySelectorAll('.skill-list li');
const aiPatterns = document.querySelectorAll('.ai-pattern');

// Mobile Menu Toggle
function initMobileMenu() {
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Contact Form Submission
function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const interest = contactForm.querySelector('#interestSelect').value;
            
            // Simple validation
            if (!name || !email || !interest) {
                alert('Please fill in all fields before submitting.');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', { name, email, interest });
            
            // Show success message
            const interestText = {
                'ai-education': 'AI in Education',
                'research': 'Research Collaboration',
                'workshop': 'Workshop/Consultation',
                'other': 'General Inquiry'
            }[interest] || 'Your inquiry';
            
            alert(`Thank you ${name}! Your ${interestText} message has been sent. I'll get back to you within 24-48 hours.`);
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animated Counter for Stats
function initCounterAnimation() {
    if (statNumbers.length === 0) return;
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (target >= 100 ? '+' : '');
            }
        };
        
        updateCounter();
    };
    
    // Trigger counter animation when stats section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(animateCounter);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        observer.observe(statsGrid);
    }
}

// Add scroll effect to header
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
        }
    });
}

// Add interactive hover effects to skill items
function initSkillHoverEffects() {
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = '0 5px 15px rgba(157, 78, 221, 0.2)';
            this.style.borderLeft = '3px solid var(--accent-purple)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
            this.style.borderLeft = 'none';
        });
    });
}

// Animate AI patterns
function initAIPatterns() {
    aiPatterns.forEach((pattern, index) => {
        // Add animation
        pattern.style.animation = `float ${3 + index}s ease-in-out infinite alternate`;
        
        // Add subtle rotation
        pattern.style.transition = 'transform 0.5s ease';
        
        // Add mouse move effect
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 10;
            const y = (e.clientY / window.innerHeight) * 10;
            
            pattern.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Card hover effect enhancement
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.expertise-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.expertise-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Form input focus effects
function initFormEffects() {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-5px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

// Initialize all functions when DOM is loaded
function initPortfolio() {
    console.log('Humaira Pervaish Portfolio - Initializing...');
    
    // Initialize all components
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    initCounterAnimation();
    initHeaderScroll();
    initSkillHoverEffects();
    initAIPatterns();
    initCardHoverEffects();
    initFormEffects();
    
    // Add page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Console welcome message
    console.log('%c✨ Humaira Pervaish Portfolio Loaded Successfully! ✨', 
        'color: #9D4EDD; font-size: 16px; font-weight: bold;');
    console.log('%cMathematics Educator • AI Analyst • Innovative Thinker', 
        'color: #00B4D8; font-size: 14px;');
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileMenu,
        initContactForm,
        initSmoothScroll,
        initCounterAnimation,
        initHeaderScroll,
        initSkillHoverEffects,
        initAIPatterns,
        initCardHoverEffects,
        initFormEffects,
        initPortfolio
    };
}
