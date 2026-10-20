/**
 * ═══════════════════════ INFO TECH FLY ═══════════════════════
 * Main JavaScript - Handles all interactivity
 * ══════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTypingAnimation();
    initScrollReveal();
    initContactForm();
    initMobileMenu();
    initSmoothScroll();
    initActiveNavLink();
});

// ──────────────────────── NAVBAR SCROLL EFFECT ────────────────────────
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ──────────────────────── TYPING ANIMATION ────────────────────────
function initTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const words = [
        'Ethical Hacking Tools',
        'Developer Utilities',
        'Web Development',
        'Cyber Security',
        'Python Programming',
        'AI & Machine Learning',
        'Full Stack Solutions',
        'Cloud Deployment'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 120;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 3000);
}

// ──────────────────────── SCROLL REVEAL ────────────────────────
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.about-card, .training-card, .service-card, .contact-card, .section-header, [data-reveal]'
    ); // CHANGED: added [data-reveal] so any page can opt in
    if (!revealElements.length) return;

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ──────────────────────── CONTACT FORM - WHATSAPP ────────────────────────
// CHANGED: works for #contactForm (home page) AND any <form data-whatsapp>.
// Optional fields are included only when filled: service, features (checkboxes), message.
function initContactForm() {
    document.querySelectorAll('#contactForm, form[data-whatsapp]').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const data = new FormData(form);
            const get = key => (data.get(key) || '').toString().trim();
            const name = get('name');
            const email = get('email');
            const phone = get('phone');
            const message = get('message');
            const service = get('service');
            const features = data.getAll('features');

            const missing = [...form.elements].some(el => el.required && !el.value.trim());
            if (missing) {
                showFormToast('Please fill in all required fields.', 'error');
                return;
            }
            if (email && !isValidEmail(email)) {
                showFormToast('Please enter a valid email address.', 'error');
                return;
            }

            const lines = [
                `🆕 *New Inquiry - Info Tech Fly*`,
                '',
                service ? `🛠 *Service:* ${service}` : null,
                `👤 *Name:* ${name}`,
                email ? `📧 *Email:* ${email}` : null,
                `📞 *Phone:* ${phone}`,
                features.length ? `✅ *Needs:* ${features.join(', ')}` : null,
                message ? `\n💬 *Message:*\n${message}` : null,
                '',
                `_Sent via Info Tech Fly Website_`
            ].filter(line => line !== null);

            const whatsappNumber = '917225880469';
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
            window.open(whatsappURL, '_blank', 'noopener,noreferrer');
            showFormToast('Opening WhatsApp... Redirecting now! ✅', 'success');
            form.reset();
            form.dispatchEvent(new CustomEvent('whatsapp-sent', { bubbles: true }));
        });
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormToast(msg, type) {
    const existing = document.querySelector('.form-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `form-toast form-toast-${type}`;
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 1.4rem 2.4rem;
        border-radius: 8px;
        font-size: 1.4rem;
        font-weight: 600;
        z-index: 9999;
        animation: slideInUp 0.4s ease;
        color: #fff;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    `;

    (document.querySelector('dialog[open]') || document.body).appendChild(toast); // CHANGED: visible above popups
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// Dynamically add toast animation
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideInUp {
        from { transform: translateY(60px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(toastStyle);

// ──────────────────────── MOBILE MENU ────────────────────────
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu) return;

    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ──────────────────────── SMOOTH SCROLL ────────────────────────
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navbar = document.getElementById('navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                window.scrollTo({
                    top: target.offsetTop - navHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ──────────────────────── ACTIVE NAV LINK ON SCROLL ────────────────────
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href.startsWith('#')) return; // CHANGED: keep page links (e.g. Services) active
            link.classList.remove('active');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

console.log('%c🚀 Info Tech Fly %cReady for Takeoff!',
    'color: #87CEEB; font-size: 2rem; font-weight: bold;',
    'color: #1E3A5F; font-size: 1.4rem;');