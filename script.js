// Check if mobile device
const isMobile = window.innerWidth <= 768;

// Add floating hearts animation (fewer on mobile for performance)
function createFloatingHeart() {
    const heartsContainer = document.querySelector('.hearts-background');
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = (isMobile ? Math.random() * 20 + 15 : Math.random() * 30 + 20) + 'px';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.opacity = Math.random() * 0.3 + 0.1;
    heart.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
    heart.style.animationDelay = Math.random() * 5 + 's';

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 20000);
}

// Create hearts periodically (less frequent on mobile)
const heartInterval = isMobile ? 3000 : 2000;
setInterval(createFloatingHeart, heartInterval);

// Initial hearts (fewer on mobile)
const initialHearts = isMobile ? 3 : 5;
for (let i = 0; i < initialHearts; i++) {
    setTimeout(createFloatingHeart, i * 400);
}

// Smooth scroll for any future navigation
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

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('.reason-card, .timeline-item, .photo-placeholder').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
