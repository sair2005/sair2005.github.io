// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true, // Animation happens only once
        offset: 50, // Trigger offset
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Navbar Animation
    gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Hero Text Animation (if present)
    if (document.querySelector('#home h1') || document.querySelector('section h1')) {
        gsap.from('h1', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out'
        });
    }

    if (document.querySelector('#home p') || document.querySelector('section p')) {
        gsap.from('p', {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.8,
            ease: 'power3.out'
        });
    }

    if (document.querySelector('.hero-buttons')) {
        gsap.from('.hero-buttons', {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 1,
            ease: 'power3.out'
        });
    }

    // GSAP ScrollTrigger for specific sections if needed
    // Example: Stagger service cards if AOS isn't used (but we will use AOS for grids for simplicity)
    
});
