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
    
    const animateCounter = (element) =>
