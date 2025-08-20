// Navigation functionality
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
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;
                this.navigateToPage(page);
            });
        });

        // CTA button
        document.querySelector('.cta-button').addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            this.navigateToPage(page);
        });

        // Mobile menu
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Contact form
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                navLinks.classList.remove('active');
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const page = e.state?.page || 'home';
            this.navigateToPage(page, false);
        });
    }

    navigateToPage(page, pushState = true) {
        if (page === this.currentPage) return;

        // Hide current page
        document.getElementById(this.currentPage).classList.remove('active');

        // Show new page
        document.getElementById(page).classList.add('active');

        // Update current page
        this.currentPage = page;

        // Update navigation
        this.updateNavigation();

        // Update browser history
        if (pushState) {
            history.pushState({ page }, '', `#${page}`);
        }

        // Update document title
        this.updateTitle(page);

        // Scroll to top
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

        // Basic validation
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();

        if (!name || !email || !subject || !message) {
            this.showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        this.simulateFormSubmission(form, messageDiv, { name, email, subject, message });
    }

    simulateFormSubmission(form, messageDiv, data) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Show success message
            this.showFormMessage(
                `Thank you, ${data.name}! Your message has been received. I'll get back to you soon.`,
                'success'
            );

            // Reset form
            form.reset();

            // Auto-hide message after 5 seconds
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

        // Smooth scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    hideFormMessage() {
        const messageDiv = document.getElementById('formMessage');
        messageDiv.style.display = 'none';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Smooth scrolling for anchor links
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

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
});

// Enhanced accessibility
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        document.querySelector('.nav-links').classList.remove('active');
    }
});