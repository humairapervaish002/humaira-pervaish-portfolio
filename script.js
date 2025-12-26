// JavaScript Code for Humaira Pervaish Portfolio

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Form submission
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demonstration, we'll just show a success message
            alert('Thank you for your message, ' + name + '! Humaira will get back to you soon.');
            this.reset();
        });
    }
    
    // Skill Bars Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0%';
            
            // Set the target width after a small delay for animation effect
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 300);
        });
    }
    
    // Animate skill bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    // Observe the skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Data Visualization
    const vizBox = document.getElementById('vizBox');
    const generateBtn = document.getElementById('generateBtn');
    const clusterBtn = document.getElementById('clusterBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    let dataPoints = [];
    let clusters = [];
    const colors = ['#6a11cb', '#2575fc', '#ff7e5f', '#4CAF50', '#FFC107'];
    
    function generateDataPoints() {
        // Clear existing points
        vizBox.innerHTML = '';
        dataPoints = [];
        clusters = [];
        
        // Generate random data points
        const numPoints = 60;
        const boxWidth = vizBox.clientWidth;
        const boxHeight = vizBox.clientHeight;
        
        // Create 3 natural clusters
        for (let i = 0; i < 3; i++) {
            const clusterCenterX = Math.random() * (boxWidth - 100) + 50;
            const clusterCenterY = Math.random() * (boxHeight - 100) + 50;
            
            for (let j = 0; j < numPoints/3; j++) {
                // Add some randomness around the cluster center
                const x = clusterCenterX + (Math.random() - 0.5) * 150;
                const y = clusterCenterY + (Math.random() - 0.5) * 150;
                
                // Ensure points stay within bounds
                const boundedX = Math.max(10, Math.min(boxWidth - 10, x));
                const boundedY = Math.max(10, Math.min(boxHeight - 10, y));
                
                createDataPoint(boundedX, boundedY);
            }
        }
    }
    
    function createDataPoint(x, y) {
        const point = document.createElement('div');
        point.className = 'data-point';
        point.style.left = x + 'px';
        point.style.top = y + 'px';
        point.style.backgroundColor = '#6a11cb';
        
        vizBox.appendChild(point);
        dataPoints.push({
            x, 
            y, 
            element: point, 
            cluster: -1,
            originalColor: '#6a11cb'
        });
    }
    
    function clusterData() {
        // If we already have clusters, remove them
        document.querySelectorAll('.cluster-center').forEach(el => el.remove());
        
        // Simple k-means clustering with 3 clusters
        const k = 3;
        clusters = [];
        
        // Initialize cluster centers at random positions
        const boxWidth = vizBox.clientWidth;
        const boxHeight = vizBox.clientHeight;
        
        for (let i = 0; i < k; i++) {
            clusters.push({
                x: Math.random() * (boxWidth - 40) + 20,
                y: Math.random() * (boxHeight - 40) + 20,
                color: colors[i % colors.length],
                points: []
            });
            
            // Create cluster center marker
            createClusterCenter(clusters[i], i);
        }
        
        // Run a few iterations of k-means
        runKMeansIterations(5);
    }
    
    function createClusterCenter(cluster, index) {
        const center = document.createElement('div');
        center.className = 'cluster-center';
        center.style.left = cluster.x + 'px';
        center.style.top = cluster.y + 'px';
        center.style.borderColor = cluster.color;
        center.dataset.index = index;
        vizBox.appendChild(center);
    }
    
    function runKMeansIterations(iterations) {
        let currentIteration = 0;
        
        function runIteration() {
            if (currentIteration >= iterations) return;
            
            // Assign points to nearest cluster
            assignPointsToClusters();
            
            // Update cluster centers
            updateClusterCenters();
            
            // Color points according to their cluster
            colorPointsByCluster();
            
            currentIteration++;
            
            // Run next iteration after delay for animation
            if (currentIteration < iterations) {
                setTimeout(runIteration, 800);
            }
        }
        
        runIteration();
    }
    
    function assignPointsToClusters() {
        dataPoints.forEach(point => {
            let minDist = Infinity;
            let closestClusterIndex = 0;
            
            clusters.forEach((cluster, index) => {
                const dx = point.x - cluster.x;
                const dy = point.y - cluster.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < minDist) {
                    minDist = dist;
                    closestClusterIndex = index;
                }
            });
            
            point.cluster = closestClusterIndex;
        });
    }
    
    function updateClusterCenters() {
        clusters.forEach((cluster, index) => {
            const clusterPoints = dataPoints.filter(p => p.cluster === index);
            
            if (clusterPoints.length > 0) {
                const avgX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
                const avgY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;
                
                // Update cluster position
                cluster.x = avgX;
                cluster.y = avgY;
                
                // Update visual representation
                const centerElement = document.querySelector(`.cluster-center[data-index="${index}"]`);
                if (centerElement) {
                    centerElement.style.left = avgX + 'px';
                    centerElement.style.top = avgY + 'px';
                }
            }
        });
    }
    
    function colorPointsByCluster() {
        dataPoints.forEach(point => {
            if (point.cluster !== -1) {
                point.element.style.backgroundColor = clusters[point.cluster].color;
            }
        });
    }
    
    function clearVisualization() {
        vizBox.innerHTML = '';
        dataPoints = [];
        clusters = [];
    }
    
    // Event listeners for visualization
    if (generateBtn) {
        generateBtn.addEventListener('click', generateDataPoints);
    }
    
    if (clusterBtn) {
        clusterBtn.addEventListener('click', clusterData);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearVisualization);
    }
    
    // Initialize with some data
    setTimeout(generateDataPoints, 500);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Regenerate data points on resize to fit new container size
            if (dataPoints.length > 0) {
                // Store current state
                const hasClusters = clusters.length > 0;
                
                // Regenerate with similar distribution
                generateDataPoints();
                
                // Reapply clustering if it was applied before
                if (hasClusters) {
                    setTimeout(clusterData, 100);
                }
            }
        }, 250);
    });
    
    // Add interactivity to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add animation to passion tags
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add click animation to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Initialize skill bars on page load if they're already in view
    const checkSkillsInView = () => {
        if (skillsSection) {
            const rect = skillsSection.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0) {
                animateSkillBars();
                window.removeEventListener('scroll', checkSkillsInView);
            }
        }
    };
    
    window.addEventListener('scroll', checkSkillsInView);
    checkSkillsInView(); // Check on initial load
});
