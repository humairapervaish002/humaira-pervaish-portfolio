// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change menu icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show a success message
            const submitButton = this.querySelector('.btn-form');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                submitButton.style.backgroundColor = '#26a69a';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.backgroundColor = '';
                    submitButton.disabled = false;
                    contactForm.reset();
                    
                    // Show a success message
                    alert(`Thank you, ${name}! Your message has been sent. Humaira will get back to you soon.`);
                }, 2000);
            }, 1500);
        });
    }
    
    // Function visualizer demo
    const demoBtn = document.getElementById('demoBtn');
    const demoModal = document.getElementById('demoModal');
    const closeModal = document.querySelector('.close-modal');
    const functionSelect = document.getElementById('functionSelect');
    const colorSelect = document.getElementById('colorSelect');
    const functionCanvas = document.getElementById('functionCanvas');
    
    if (demoBtn && demoModal) {
        // Open modal
        demoBtn.addEventListener('click', function() {
            demoModal.style.display = 'flex';
            drawFunction(); // Draw initial function
        });
        
        // Close modal
        closeModal.addEventListener('click', function() {
            demoModal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === demoModal) {
                demoModal.style.display = 'none';
            }
        });
        
        // Update function when selection changes
        functionSelect.addEventListener('change', drawFunction);
        colorSelect.addEventListener('change', drawFunction);
        
        // Function to draw the selected mathematical function
        function drawFunction() {
            const ctx = functionCanvas.getContext('2d');
            const width = functionCanvas.width;
            const height = functionCanvas.height;
            const selectedFunction = functionSelect.value;
            const color = colorSelect.value;
            
            // Clear canvas
            ctx.clearRect(0, 0, width, height);
            
            // Draw grid
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 1;
            
            // Vertical lines
            for (let x = 0; x <= width; x += width / 20) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            
            // Horizontal lines
            for (let y = 0; y <= height; y += height / 20) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
            
            // Draw axes
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            
            // X axis
            ctx.beginPath();
            ctx.moveTo(0, height / 2);
            ctx.lineTo(width, height / 2);
            ctx.stroke();
            
            // Y axis
            ctx.beginPath();
            ctx.moveTo(width / 2, 0);
            ctx.lineTo(width / 2, height);
            ctx.stroke();
            
            // Draw function
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            const scaleX = width / 20; // 20 units in x direction
            const scaleY = height / 4; // 4 units in y direction
            const centerX = width / 2;
            const centerY = height / 2;
            
            for (let i = 0; i <= width; i++) {
                const x = (i - centerX) / scaleX;
                let y;
                
                switch(selectedFunction) {
                    case 'quadratic':
                        y = x * x;
                        break;
                    case 'sine':
                        y = Math.sin(x * 2);
                        break;
                    case 'exponential':
                        y = Math.exp(x) / 50; // Scale down for visibility
                        break;
                    case 'logarithmic':
                        y = x > 0 ? Math.log(x) / 2 : -10; // Handle log(0)
                        break;
                    default:
                        y = x * x;
                }
                
                const pixelY = centerY - y * scaleY;
                
                if (i === 0) {
                    ctx.moveTo(i, pixelY);
                } else {
                    ctx.lineTo(i, pixelY);
                }
            }
            
            ctx.stroke();
            
            // Add labels
            ctx.fillStyle = '#333';
            ctx.font = '14px Arial';
            ctx.fillText('x', width - 10, centerY - 10);
            ctx.fillText('y', centerX + 10, 20);
            
            // Function name
            ctx.font = '16px Arial';
            ctx.fillStyle = color;
            let functionName = '';
            switch(selectedFunction) {
                case 'quadratic': functionName = 'f(x) = x²'; break;
                case 'sine': functionName = 'f(x) = sin(2x)'; break;
                case 'exponential': functionName = 'f(x) = e^x'; break;
                case 'logarithmic': functionName = 'f(x) = log(x)'; break;
            }
            ctx.fillText(functionName, 20, 30);
        }
    }
    
    // Animate skill bars on scroll
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-in-out';
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Trigger animation when skills section is in view
    const observerOptions = {
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.project-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.project-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
});
