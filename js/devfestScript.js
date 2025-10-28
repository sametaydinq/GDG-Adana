let currentTheme = 'light';

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function toggleTheme() {
    const body = document.body;
    const theme = document.getElementById('theme');
    const mobileTheme = document.getElementById('mobileTheme');
    const devfestLogo = document.querySelector('.devfest-logo');
    const lightIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fff'%3E%3Ccircle cx='12' cy='12' r='5'/%3E%3Cpath d='M12 1v2m0 18v2M4.2 4.2l1.4 1.4m12.8 12.8l1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E";
    const darkIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fff'%3E%3Cpath d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'/%3E%3C/svg%3E";
    
    if (currentTheme === 'light') {
        body.classList.add('dark-mode');
        theme.setAttribute("src", lightIcon);
        mobileTheme.setAttribute("src", lightIcon);
        devfestLogo.setAttribute("src", "images/Devfest Logo Dark.png");
        currentTheme = 'dark';
    } else {
        body.classList.remove('dark-mode');
        theme.setAttribute("src", darkIcon);
        mobileTheme.setAttribute("src", darkIcon);
        devfestLogo.setAttribute("src", "images/Devfest Logo.png");
        currentTheme = 'light';
    }
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('mobileThemeToggle').addEventListener('click', toggleTheme);

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

// Initialize logo based on current theme
function initializeLogo() {
    const devfestLogo = document.querySelector('.devfest-logo');
    const body = document.body;
    
    if (body.classList.contains('dark-mode')) {
        devfestLogo.setAttribute("src", "images/Devfest Logo Dark.png");
    } else {
        devfestLogo.setAttribute("src", "images/Devfest Logo.png");
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeLogo);