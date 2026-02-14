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
document.querySelectorAll('.reason-card, .timeline-item, .photo-placeholder, .photo-item, .dream-card, .quote-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Countdown Timer - Count up from first meeting
const firstMeetingDate = new Date('2025-02-21T22:00:00'); // Feb 21, 2025, 10 PM

function updateCountdown() {
    const now = new Date();
    const diff = now - firstMeetingDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById('countdownTimer');
    if (countdownElement) {
        countdownElement.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds since we first met ❤️`;
    }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Secret Message Reveal
const revealBtn = document.getElementById('revealBtn');
const hiddenMessage = document.getElementById('hiddenMessage');

if (revealBtn && hiddenMessage) {
    revealBtn.addEventListener('click', () => {
        if (hiddenMessage.classList.contains('revealed')) {
            hiddenMessage.classList.remove('revealed');
            revealBtn.textContent = 'Click to reveal my secret message ❤️';
        } else {
            hiddenMessage.classList.add('revealed');
            revealBtn.textContent = 'Hide message';

            // Smooth scroll to the message
            setTimeout(() => {
                hiddenMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        }
    });
}

// Typewriter effect for love letter
function typeWriterEffect() {
    const letterParagraphs = document.querySelectorAll('.love-letter .card p');

    letterParagraphs.forEach((p, index) => {
        // Skip signature
        if (p.classList.contains('signature')) return;

        const text = p.textContent;
        p.textContent = '';
        p.style.opacity = '1';

        let charIndex = 0;
        const speed = isMobile ? 30 : 50; // Faster on mobile

        setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    p.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                }
            }, speed);
        }, index * 1000); // Stagger each paragraph by 1s
    });
}

// Trigger when love letter scrolls into view
const letterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeWriterEffect();
            letterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const loveLetterSection = document.querySelector('.love-letter');
if (loveLetterSection) {
    letterObserver.observe(loveLetterSection);
}

// Number counter animation for reason cards
function animateCounter(element, target) {
    const duration = 800; // 0.8s
    const start = 0;
    const startTime = performance.now();

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const current = Math.floor(start + (target - start) * easedProgress);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target; // Ensure final value
        }
    }

    requestAnimationFrame(updateCounter);
}

// Observe reason cards for counter animation
const reasonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target.querySelector('.reason-number');
            if (numberElement && !numberElement.dataset.animated) {
                const targetNumber = parseInt(numberElement.textContent);
                numberElement.dataset.animated = 'true';
                animateCounter(numberElement, targetNumber);
            }
            reasonObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.reason-card').forEach(card => {
    reasonObserver.observe(card);
});

// Timeline sliding animation
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// Gallery lightbox
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.photo-item').forEach(photo => {
    photo.addEventListener('click', () => {
        const bgImage = photo.style.backgroundImage;
        const imageUrl = bgImage.slice(5, -2); // Extract URL from url("...")

        lightboxImage.src = imageUrl;
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
});

// Close lightbox
function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

// Close on backdrop click
lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
        closeLightbox();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
        closeLightbox();
    }
});

// Easter Egg: Confetti on double-click dream icons
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas ? confettiCanvas.getContext('2d') : null;

function resizeCanvas() {
    if (confettiCanvas) {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Confetti {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.color = ['#ff6b9d', '#c86dd7', '#ffd700', '#ff69b4', '#00bfff'][Math.floor(Math.random() * 5)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.opacity = 1;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        this.speedY += 0.1; // Gravity
        this.opacity -= 0.01;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

let confettiParticles = [];

function animateConfetti() {
    if (!ctx) return;

    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiParticles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.opacity <= 0 || particle.y > confettiCanvas.height) {
            confettiParticles.splice(index, 1);
        }
    });

    if (confettiParticles.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
}

function triggerConfetti(x, y) {
    const particleCount = isMobile ? 150 : 300;

    for (let i = 0; i < particleCount; i++) {
        confettiParticles.push(new Confetti(x, y));
    }

    animateConfetti();
}

// Add double-click listeners to dream icons
document.querySelectorAll('.dream-icon').forEach(icon => {
    icon.addEventListener('dblclick', (e) => {
        const rect = icon.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        triggerConfetti(x, y);

        // Bonus: Icon bounce animation
        icon.style.transform = 'scale(1.3)';
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 200);
    });

    // Make it easier to discover on mobile
    icon.style.cursor = 'pointer';
    icon.style.transition = 'transform 0.2s ease';
});
