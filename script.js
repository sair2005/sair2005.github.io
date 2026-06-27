window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('preloader-hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 900);
        }, 3200);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const bgVideo = document.querySelector('.bg-video');
    if (bgVideo) {
    }

    const roles = ["Graphic Designer", "Web Developer", "Java Developer"];
    const typingTextElement = document.querySelector('.typing-text');

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typingTextElement) {
        setTimeout(typeEffect, 1000);
    }

    const navItems = document.querySelectorAll('.floating-nav .nav-links li');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const floatingNav = document.querySelector('.floating-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuToggleIcon = document.querySelector('.menu-toggle i');

    if (floatingNav) {
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 768) {
                if (window.scrollY > 50) {
                    floatingNav.classList.add('shrink');
                } else {
                    floatingNav.classList.remove('shrink');
                    floatingNav.classList.remove('open');
                    if (menuToggleIcon) {
                        menuToggleIcon.className = 'fa-solid fa-bars';
                    }
                }
            } else {
                floatingNav.classList.remove('shrink');
                floatingNav.classList.remove('open');
            }
        });
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            floatingNav.classList.toggle('open');
            if (floatingNav.classList.contains('open')) {
                menuToggleIcon.className = 'fa-solid fa-xmark';
            } else {
                menuToggleIcon.className = 'fa-solid fa-bars';
            }
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                floatingNav.classList.remove('open');
                if (menuToggleIcon) {
                    menuToggleIcon.className = 'fa-solid fa-bars';
                }
            }
        });
    });

    const socialSidebar = document.querySelector('.social-sidebar');
    const socialToggle = document.querySelector('.social-toggle');
    const socialToggleIcon = document.querySelector('.social-toggle i');

    if (socialSidebar) {
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 768) {
                if (window.scrollY > 50) {
                    socialSidebar.classList.add('shrink');
                } else {
                    socialSidebar.classList.remove('shrink');
                    socialSidebar.classList.remove('open');
                    if (socialToggleIcon) {
                        socialToggleIcon.className = 'fa-solid fa-share-nodes';
                    }
                }
            } else {
                socialSidebar.classList.remove('shrink');
                socialSidebar.classList.remove('open');
            }
        });
    }

    if (socialToggle) {
        socialToggle.addEventListener('click', () => {
            socialSidebar.classList.toggle('open');
            if (socialSidebar.classList.contains('open')) {
                socialToggleIcon.className = 'fa-solid fa-xmark';
            } else {
                socialToggleIcon.className = 'fa-solid fa-share-nodes';
            }
        });
    }
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        const clickables = document.querySelectorAll('a, button, input, select, textarea, .menu-toggle, .social-toggle, .spinning-badge, .project-separator, .btn, .social-icon, .filter-btn, .project-card, .project-link');
        
        clickables.forEach(clickable => {
            clickable.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(255, 107, 0, 0.1)';
            });
            clickable.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }
});

const likeBtn = document.getElementById("likeBtn");
const likes = document.getElementById("likes");

let liked = false;
let count = 248;

likeBtn.addEventListener("click", () => {

    if(!liked){
        count++;
        likeBtn.innerHTML = `💙 <span id="likes">${count}</span> Liked`;
        liked = true;
    }else{
        count--;
        likeBtn.innerHTML = `❤️ <span id="likes">${count}</span> Likes`;
        liked = false;
    }

});
