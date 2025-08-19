// Navigation and Mobile Menu
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Toggle mobile nav
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });

    // Close nav on link click (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll and active link
    navLinks.forEach(anchor => {
        if (anchor.getAttribute('href').startsWith('#')) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });

    // Highlight nav on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 120) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Skills Accordion
    document.querySelectorAll('.skill-category h3').forEach(category => {
        category.addEventListener('click', () => {
            const skillCategory = category.parentElement;
            skillCategory.classList.toggle('active');
        });
    });
    document.querySelectorAll('.skill-item').forEach(item => {
        const skillName = item.querySelector('.skill-name');
        skillName.addEventListener('click', () => {
            document.querySelectorAll('.skill-item').forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // Modal Logic (Java, Cisco, CSIH & AI)
    function setupModal(cardId, modalId, closeId) {
        const card = document.getElementById(cardId);
        const modal = document.getElementById(modalId);
        const closeBtn = document.getElementById(closeId);
        if (card && modal && closeBtn) {
            card.addEventListener('click', () => {
                modal.style.display = 'block';
                closeBtn.focus();
                modal.setAttribute('aria-modal', 'true');
                modal.setAttribute('role', 'dialog');
            });
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
            window.addEventListener('click', function (event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }
    setupModal('java-cert-card', 'javaModal', 'closeJavaModal');
    setupModal('cisco-cert-card', 'ciscoModal', 'closeCiscoModal');
    setupModal('csih-cert-card', 'csihModal', 'closeCsihModal');
    setupModal('ai-cert-card', 'aiModal', 'closeAiModal');


    // Contact Form AJAX (Formspree)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const statusEl = document.getElementById('formStatus');
            statusEl.textContent = 'Sending...';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    statusEl.textContent = 'Thanks! Your message was sent.';
                    contactForm.reset();
                    if (window.grecaptcha) grecaptcha.reset();
                } else {
                    statusEl.textContent = 'Oops! There was a problem sending your message.';
                }
            } catch (err) {
                statusEl.textContent = 'Network error. Please try again.';
            }
        });
    }

    // Experience Image Zoom/Fullscreen
    const experienceImage = document.querySelector('.experience-image');
    const imageOverlay = document.getElementById('imageOverlay');
    const fullImage = document.getElementById('fullImage');
    const closeFullscreen = document.querySelector('.close-fullscreen');

    if (experienceImage && imageOverlay && fullImage && closeFullscreen) {
        experienceImage.addEventListener('click', () => {
            fullImage.src = experienceImage.src;
            imageOverlay.classList.add('active');
            imageOverlay.setAttribute('aria-modal', 'true');
            imageOverlay.setAttribute('role', 'dialog');
            closeFullscreen.focus();
        });

        closeFullscreen.addEventListener('click', () => {
            imageOverlay.classList.remove('active');
        });

        imageOverlay.addEventListener('click', (e) => {
            if (e.target === imageOverlay) {
                imageOverlay.classList.remove('active');
            }
        });

        // Keyboard accessibility: Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageOverlay.classList.contains('active')) {
                imageOverlay.classList.remove('active');
            }
        });
    }
});


