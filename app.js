class PortfolioApp {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateNavigation();
    }

    bindEvents() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;
                this.navigateToPage(page);
            });
        });

        document.querySelector('.cta-button').addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            this.navigateToPage(page);
        });

        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        document.getElementById('contactForm').addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                navLinks.classList.remove('active');
            }
        });

        window.addEventListener('popstate', (e) => {
            const page = e.state?.page || 'home';
            this.navigateToPage(page, false);
        });
    }

    navigateToPage(page, pushState = true) {
        if (page === this.currentPage) return;

        document.getElementById(this.currentPage).classList.remove('active');

        document.getElementById(page).classList.add('active');

        this.currentPage = page;

        this.updateNavigation();

        if (pushState) {
            history.pushState({ page }, '', `#${page}`);
        }

        this.updateTitle(page);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === this.currentPage) {
                link.classList.add('active');
            }
        });
    }

    updateTitle(page) {
        const titles = {
            home: 'Amrith Perera - Portfolio',
            blog: 'Blog - Amrith Perera',
            contact: 'Contact - Amrith Perera'
        };
        document.title = titles[page] || titles.home;
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const messageDiv = document.getElementById('formMessage');

        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();

        if (!name || !email || !subject || !message) {
            this.showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        this.simulateFormSubmission(form, messageDiv, { name, email, subject, message });
    }

    simulateFormSubmission(form, messageDiv, data) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            this.showFormMessage(
                `Thank you, ${data.name}! Your message has been received. I'll get back to you soon.`,
                'success'
            );

            form.reset();

            setTimeout(() => {
                this.hideFormMessage();
            }, 5000);
        }, 1500);
    }

    showFormMessage(text, type) {
        const messageDiv = document.getElementById('formMessage');
        messageDiv.textContent = text;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';

        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    hideFormMessage() {
        const messageDiv = document.getElementById('formMessage');
        messageDiv.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.startsWith('#/')) return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelector('.nav-links').classList.remove('active');
    }
});