// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Hide custom cursor on touch devices
if ('ontouchstart' in window) {
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
}

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline with smooth trailing
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 400, fill: "forwards", easing: "ease-out" });
});

// Interactive hover effect for links and buttons
const interactives = document.querySelectorAll('a, button, .project-card, .skill-item');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.width = '12px';
        cursorDot.style.height = '12px';
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
        cursorOutline.style.borderColor = 'var(--accent-2)';
        cursorDot.style.backgroundColor = 'var(--accent-2)';
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorOutline.style.width = '30px';
        cursorOutline.style.height = '30px';
        cursorOutline.style.borderColor = 'var(--accent-1)';
        cursorDot.style.backgroundColor = 'var(--accent-1)';
    });
});




// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Intersection Observer for Scroll Animations
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.classList.add('active');
        
        // Trigger animations for sections
        
        if (entry.target.classList.contains('about')) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + '+';
                    }
                };
                updateCounter();
            });
        }
        
        observer.unobserve(entry.target);
    });
}, revealOptions);

// Removed direct observer call, moved to preloader completion logic
// document.querySelectorAll('.section-reveal').forEach(section => {
//     revealObserver.observe(section);
// });


// Real-time Clock and Date
function updateDateTime() {
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');
    
    if (!timeElement || !dateElement) return;

    const now = new Date();
    
    // Format Time: 12:45:06 PM
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    });
    
    // Format Date: Sat, Apr 25, 2026
    const dateString = now.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });

    timeElement.textContent = timeString;
    dateElement.textContent = dateString;
}

setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call

// Typewriter Effect
const typingText = document.querySelector('.typing-text');
const roles = ['Web Developer', 'Graphic Designer', 'Java Developer', '.NET Developer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 100;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 200;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);

// 3D Tilt Effect on Cards
const tiltCards = document.querySelectorAll('.tilt-effect');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// Project Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === cardCategory) {
                card.classList.remove('hide');
                // Small delay for animation feel
                setTimeout(() => {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.classList.add('hide');
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                // Wait for animation then hide
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Preloader & Main Content Loading
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('.loader-progress');
    const mainContent = document.getElementById('main-content');
    const loaderContent = document.querySelector('.loader-content');
    const curtains = document.querySelectorAll('.loader-curtain');

    if (!preloader || !mainContent) return;

    // Start progress bar (1.2 sec)
    setTimeout(() => {
        if (progressBar) progressBar.style.width = '100%';
    }, 100);

    // After 1.2s + small buffer, start the slide-up sequence
    setTimeout(() => {
        // Step 1: Hide the loading text/logo
        if (loaderContent) {
            loaderContent.style.opacity = '0';
            loaderContent.style.transition = 'opacity 0.3s ease';
        }

        // Step 2: Slide up curtains sequentially
        setTimeout(() => {
            curtains.forEach((curtain, index) => {
                setTimeout(() => {
                    curtain.style.transform = 'translateY(-100%)';
                }, index * 120); // 120ms delay between curtains for a snappier feel
            });

            // Step 3: Slide up the main preloader and reveal content
            setTimeout(() => {
                preloader.style.transform = 'translateY(-100%)';
                mainContent.classList.add('content-visible');
                
                // Trigger animations for sections
                document.querySelectorAll('.section-reveal').forEach(section => {
                    if (typeof revealObserver !== 'undefined') {
                        revealObserver.observe(section);
                    }
                });
            }, 600); // Wait for curtains to start their journey

        }, 300);

    }, 1300); // 1.2s progress + 100ms delay
});
