// Loading Screen Animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate loading bar
    const loadingProgress = document.querySelector('.loading-progress');
    loadingProgress.style.width = '100%';

    // Hide loading screen after animation
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.visibility = 'hidden';
        }, 250);
    }, 600);

    // Initialize animations and events
    initScrollAnimations();
    initHeaderScroll();
    initMobileMenu();
});




// Scroll Animations
function initScrollAnimations() {
    // GSAP ScrollTrigger setup
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations are handled with CSS animations

    // Categories section cards animation
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        gsap.fromTo(
            card,
            {
                y: 100,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                delay: index * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom-=100",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Featured items animation
    const featuredItems = document.querySelectorAll('.featured-item');
    featuredItems.forEach((item, index) => {
        gsap.fromTo(
            item,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.4,
                delay: index * 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.featured',
                    start: "top center+=100",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // About section animation
    gsap.fromTo(
        '.about-content',
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.about-us',
                start: "top center+=100",
                toggleActions: "play none none none"
            }
        }
    );

    // Section headers animation
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        gsap.fromTo(
            header,
            {
                y: 30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: header,
                    start: "top bottom-=100",
                    toggleActions: "play none none none"
                }
            }
        );
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPos = window.scrollY;

    if (scrollPos <= hero.offsetHeight) {
        const yPos = scrollPos * 0.4;
        hero.style.backgroundPosition = `center ${yPos}px`;
    }
});

// WhatsApp button functionality
document.querySelectorAll('.whatsapp-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();

        // Get product details
        const productName = this.closest('.featured-item').querySelector('h3').textContent;
        const message = `Hi, I'm interested in the ${productName} from Miruthvin's   Creattion!`;

        // Encode message for WhatsApp
        const encodedMessage = encodeURIComponent(message);

        // WhatsApp link with pre-filled message (replace with actual number)
        window.open(`https://wa.me/919876543210?text=${encodedMessage}`, '_blank');
    });
});






const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const body = document.body;

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// Close menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

// Handle escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

// Update active link based on current page
function updateActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Call on page load
updateActiveLink();