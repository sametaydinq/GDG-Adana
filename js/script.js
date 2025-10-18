let currentTheme = 'dark';
let currentLang = 'tr';

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

function setLanguage(lang) {
    const desktopLangToggle = document.getElementById('desktopLangToggle');
    const mobileLangToggle = document.getElementById('mobileLangToggle');
    const elementsToTranslate = document.querySelectorAll('.translate');
    currentLang = lang;

    if (lang === 'tr') {
        desktopLangToggle.textContent = 'TR';
        mobileLangToggle.innerHTML = '<span class="translate" data-tr="Türkçe">Türkçe</span>';
        elementsToTranslate.forEach(el => {
            const trText = el.getAttribute('data-tr');
            if (trText) {
                el.textContent = trText;
            }
        });
    } else {
        desktopLangToggle.textContent = 'EN';
        mobileLangToggle.innerHTML = '<span class="translate" data-en="English">English</span>';
        elementsToTranslate.forEach(el => {
            const enText = el.getAttribute('data-en');
            if (enText) {
                el.textContent = enText;
            }
        });
    }
}

function toggleLanguage() {
    if (currentLang === 'en') {
        setLanguage('tr');
    } else {
        setLanguage('en');
    }
}

function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.toLowerCase().startsWith('tr')) {
        setLanguage('tr');
    } else {
        setLanguage('en');
    }
}

detectBrowserLanguage();

// Particle canvas animation
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    // Set canvas to full viewport size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}



class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = ['#4285f4', '#ea4335', '#fbbc04', '#34a853'][Math.floor(Math.random() * 4)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateParticles);
}

// Initialize canvas
resizeCanvas();
initParticles();
animateParticles();

// Also resize on load to ensure proper sizing
window.addEventListener('load', () => {
    resizeCanvas();
    initParticles();
});

// Debounce resize events for better performance
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        resizeCanvas();
        initParticles();
    }, 100);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Theme toggle
function toggleTheme() {
    const body = document.body;
    const theme = document.getElementById('theme');
    const mobileTheme = document.getElementById('mobileTheme');
    if (currentTheme === 'dark') {
        body.classList.add('light-mode');
        theme.setAttribute("src", "images/light-mode.png");
        mobileTheme.setAttribute("src", "images/light-mode.png");
        currentTheme = 'light';
    } else {
        body.classList.remove('light-mode');
        theme.setAttribute("src", "images/night-mode.png");
        mobileTheme.setAttribute("src", "images/night-mode.png");
        currentTheme = 'dark';
    }
}

// FAQ toggle
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const allFaqs = document.querySelectorAll('.faq-item');
    allFaqs.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    faqItem.classList.toggle('active');
}

// Smooth scroll
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



// Event listeners
document.getElementById('desktopLangToggle').addEventListener('click', toggleLanguage);
document.getElementById('mobileLangToggle').addEventListener('click', toggleLanguage);
document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('mobileThemeToggle').addEventListener('click', toggleTheme);
