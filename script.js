document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth Scrolling
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
    
    // Highlight active nav item on scroll
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
    
    // Certificate Modals
    function setupModal(cardId, modalId, closeId) {
        const card = document.getElementById(cardId);
        const modal = document.getElementById(modalId);
        const closeBtn = document.getElementById(closeId);
        
        if (card && modal && closeBtn) {
            card.addEventListener('click', () => {
                modal.style.display = 'block';
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
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const statusEl = document.getElementById('formStatus');
            statusEl.textContent = 'Sending...';
            
            // Form submission logic would go here
            // For now, simulate successful submission
            setTimeout(() => {
                statusEl.textContent = 'Message sent successfully!';
                contactForm.reset();
            }, 1500);
        });
    }
    
    // Image Zoom
    const experienceImage = document.querySelector('.experience-image');
    const imageOverlay = document.createElement('div');
    imageOverlay.className = 'image-fullscreen-overlay';
    document.body.appendChild(imageOverlay);
    
    const fullImage = document.createElement('img');
    fullImage.className = 'experience-image-fullscreen';
    imageOverlay.appendChild(fullImage);
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-fullscreen';
    closeBtn.innerHTML = '&times;';
    imageOverlay.appendChild(closeBtn);
    
    if (experienceImage) {
        experienceImage.addEventListener('click', () => {
            fullImage.src = experienceImage.src;
            imageOverlay.style.display = 'flex';
        });
    }
    
    closeBtn.addEventListener('click', () => {
        imageOverlay.style.display = 'none';
    });
    
    imageOverlay.addEventListener('click', (e) => {
        if (e.target === imageOverlay) {
            imageOverlay.style.display = 'none';
        }
    });
});
