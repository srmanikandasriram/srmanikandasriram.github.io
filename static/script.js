// Navigation initialization function for modular components
function initializeNavigation() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
}

// Legacy initialization for non-modular pages
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if elements exist (non-modular pages)
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        initializeNavigation();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.research-card, .publication-item, .credential-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// // Typing animation for hero subtitle (optional enhancement)
// const heroSubtitle = document.querySelector('.hero-subtitle');
// if (heroSubtitle) {
//     const text = heroSubtitle.textContent;
//     heroSubtitle.textContent = '';
    
//     let i = 0;
//     const typeWriter = () => {
//         if (i < text.length) {
//             heroSubtitle.textContent += text.charAt(i);
//             i++;
//             setTimeout(typeWriter, 100);
//         }
//     };
    
//     // Start typing animation after a short delay
//     setTimeout(typeWriter, 1000);
// }

// Scroll to top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Add scroll to top button
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: #2563eb;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    `;
    
    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
};

// Initialize scroll to top button
createScrollToTopButton();

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Preload images
const preloadImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const imageUrl = img.src;
        const imageElement = new Image();
        imageElement.src = imageUrl;
    });
};

preloadImages();

// Thumbs Up Counter with GoatCounter
document.addEventListener('DOMContentLoaded', function() {
    const thumbsButton = document.getElementById('thumbs-button');
    const thumbsCount = document.getElementById('thumbs-count');
    
    if (thumbsButton && thumbsCount) {
        // Configuration
        const config = {
            baseCount: 42, // Starting count to make the site look more established
            apiEndpoint: null, // Set this to your backend API if you implement one
            localStorageKey: 'marvils_thumbs'
        };
        
        // Check if user has already liked (using localStorage for client-side check)
        const userData = JSON.parse(localStorage.getItem(config.localStorageKey) || '{}');
        let hasLiked = userData.hasLiked || false;
        let lastLikeTime = userData.lastLikeTime || null;
        
        // Initialize display count
        let displayCount = userData.displayCount || config.baseCount;
        
        // Function to update counter display
        const updateCounterDisplay = (count) => {
            thumbsCount.textContent = count;
            // Store the updated count
            const updatedData = JSON.parse(localStorage.getItem(config.localStorageKey) || '{}');
            updatedData.displayCount = count;
            localStorage.setItem(config.localStorageKey, JSON.stringify(updatedData));
        };
        
        // Function to fetch real count from backend (if available)
        const fetchRealCount = async () => {
            if (config.apiEndpoint) {
                try {
                    const response = await fetch(config.apiEndpoint);
                    const data = await response.json();
                    if (data.count && data.count > displayCount) {
                        displayCount = data.count;
                        updateCounterDisplay(displayCount);
                    }
                } catch (error) {
                    console.log('Could not fetch real count, using local count');
                }
            }
        };
        
        // Initialize display
        updateCounterDisplay(displayCount);
        
        // Try to fetch real count on load
        fetchRealCount();
        
        // Update button appearance if already liked
        if (hasLiked) {
            thumbsButton.style.background = 'rgba(0, 0, 0, 0.8)';
            thumbsButton.style.color = '#fff';
            thumbsButton.style.borderColor = '#000';
        }
        
        // Handle thumbs up click
        thumbsButton.addEventListener('click', function() {
            const now = Date.now();
            
            // Check if user can like (prevent spam)
            if (hasLiked && lastLikeTime && (now - lastLikeTime) < 86400000) { // 24 hours
                // Already liked recently - show message
                const originalText = thumbsButton.innerHTML;
                thumbsButton.innerHTML = '<i class="fas fa-check" style="margin-right: 8px;"></i>Already liked!';
                
                setTimeout(() => {
                    thumbsButton.innerHTML = originalText;
                }, 1500);
                return;
            }
            
            // Send event to GoatCounter
            if (typeof goatcounter !== 'undefined' && goatcounter.count) {
                goatcounter.count({
                    path: 'thumbs-up-click',
                    title: 'Thumbs Up Click',
                    event: true
                });
            } else if (window.goatcounter) {
                // Alternative method if goatcounter is available
                window.goatcounter.count({
                    path: 'thumbs-up-click',
                    title: 'Thumbs Up Click',
                    event: true
                });
            } else {
                console.log('GoatCounter not loaded, but thumbs up recorded locally');
            }
            
            // Increment display counter
            displayCount = parseInt(displayCount) + 1;
            updateCounterDisplay(displayCount);
            
            // Save user state
            const userData = {
                hasLiked: true,
                lastLikeTime: now,
                displayCount: displayCount
            };
            localStorage.setItem(config.localStorageKey, JSON.stringify(userData));
            hasLiked = true;
            lastLikeTime = now;
            
            // Update button appearance
            thumbsButton.style.background = 'rgba(0, 0, 0, 0.8)';
            thumbsButton.style.color = '#fff';
            thumbsButton.style.borderColor = '#000';
            thumbsButton.style.transform = 'scale(1.1)';
            
            // Add animation
            setTimeout(() => {
                thumbsButton.style.transform = 'scale(1)';
            }, 200);
            
            // Show thank you message
            const originalText = thumbsButton.innerHTML;
            thumbsButton.innerHTML = '<i class="fas fa-heart" style="margin-right: 8px;"></i>Thanks!';
            
            setTimeout(() => {
                thumbsButton.innerHTML = originalText.replace(displayCount - 1, displayCount);
            }, 1500);
        });
        
        // Track page view for additional analytics (GoatCounter does this automatically)
        // But we can track custom events if needed
        if (typeof goatcounter !== 'undefined' && goatcounter.count) {
            goatcounter.count({
                path: 'home-page-interaction',
                title: 'Home Page Interaction',
                event: true
            });
        }
        
        // Optional: Periodically sync with backend (if implemented)
        if (config.apiEndpoint) {
            setInterval(fetchRealCount, 300000); // Check every 5 minutes
        }
    }
});
