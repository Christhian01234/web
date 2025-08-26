// Navigation and Mobile Menu
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Toggle mobile nav (with guard)
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
    }

    // Close nav on link click (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
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

        if (!(card && modal && closeBtn)) return;

        const open = () => {
            modal.style.display = 'block';
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('role', 'dialog');
            closeBtn.focus();
            document.addEventListener('keydown', onEsc);
        };

        const close = () => {
            modal.style.display = 'none';
            document.removeEventListener('keydown', onEsc);
        };

        const onEsc = (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') close();
        };

        card.addEventListener('click', open);
        closeBtn.addEventListener('click', close);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });
    }
    setupModal('java-cert-card', 'javaModal', 'closeJavaModal');
    setupModal('cisco-cert-card', 'ciscoModal', 'closeCiscoModal');
    setupModal('csih-cert-card', 'csihModal', 'closeCsihModal');
    setupModal('ai-cert-card', 'aiModal', 'closeAiModal');

    // Contact email js
    document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const statusEl = document.getElementById('formStatus');
  statusEl.textContent = 'Sending...';

  emailjs.sendForm('service_3i0lwzn', 'template_vef3awi', this)
    .then(() => {
      statusEl.textContent = 'Thanks! Your message was sent.';
      this.reset();
    }, (err) => {
      console.error('EmailJS error:', err);
      statusEl.textContent = 'Oops! Something went wrong.';
    });
});
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
