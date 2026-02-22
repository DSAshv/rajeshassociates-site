// Disclaimer Modal - Show only once per session
document.addEventListener('DOMContentLoaded', function() {
    const disclaimerModal = document.getElementById('disclaimerModal');
    const disclaimerAgree = document.getElementById('disclaimerAgree');

    // Check if disclaimer was already accepted in this session/browser
    if (!localStorage.getItem('disclaimerAcceptedRajesh')) {
        if (disclaimerModal) {
            disclaimerModal.style.display = 'flex';
        }
    } else {
        if (disclaimerModal) {
            disclaimerModal.style.display = 'none';
        }
    }

    // Handle disclaimer agreement
    if (disclaimerAgree) {
        disclaimerAgree.addEventListener('click', function() {
            localStorage.setItem('disclaimerAcceptedRajesh', 'true');
            if (disclaimerModal) {
                disclaimerModal.style.display = 'none';
            }
        });
    }

    // Close disclaimer when clicking outside
    if (disclaimerModal) {
        disclaimerModal.addEventListener('click', function(e) {
            if (e.target === disclaimerModal) {
                if (confirm('Are you sure? You need to agree to the disclaimer to continue.')) {
                    localStorage.setItem('disclaimerAcceptedRajesh', 'true');
                    disclaimerModal.style.display = 'none';
                }
            }
        });
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Shadow on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, testimonials, etc.
document.querySelectorAll('.service-card, .testimonial-card, .feature-card, .team-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section comes into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statCards = entry.target.querySelectorAll('.stat-card h3');
            statCards.forEach(card => {
                const target = parseInt(card.textContent);
                if (!isNaN(target)) {
                    animateCounter(card, target);
                }
            });
            entry.target.dataset.animated = 'true';
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Counter Animation for new clients-band-with-stats section
const clientsStatsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animatedCounters) {
            const counterElements = entry.target.querySelectorAll('.counter[data-target]');
            counterElements.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                if (!isNaN(target)) {
                    animateCounter(counter, target);
                }
            });
            entry.target.dataset.animatedCounters = 'true';
            clientsStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const clientsStatsSection = document.querySelector('.clients-band-with-stats');
if (clientsStatsSection) {
    clientsStatsObserver.observe(clientsStatsSection);
}

// Counter Animation for excellence badge
const excellenceBadgeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animatedBadge) {
            const badgeCounter = entry.target.querySelector('.badge-number.counter[data-target]');
            if (badgeCounter) {
                const target = parseInt(badgeCounter.getAttribute('data-target'));
                if (!isNaN(target)) {
                    animateCounter(badgeCounter, target, 2500);
                }
            }
            entry.target.dataset.animatedBadge = 'true';
            excellenceBadgeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const excellenceBadge = document.querySelector('.excellence-badge');
if (excellenceBadge) {
    excellenceBadgeObserver.observe(excellenceBadge);
}

// Counter Animation for stats-showcase section
const statsShowcaseObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animatedShowcase) {
            const counterElements = entry.target.querySelectorAll('.counter[data-target]');
            counterElements.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                if (!isNaN(target)) {
                    animateCounter(counter, target, 2000);
                }
            });
            entry.target.dataset.animatedShowcase = 'true';
            statsShowcaseObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsShowcaseSection = document.querySelector('.stats-showcase');
if (statsShowcaseSection) {
    statsShowcaseObserver.observe(statsShowcaseSection);
}

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 50px;
    height: 50px;
    background: #1a3a52;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
    this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
});

// Service carousel functionality
function setupCarousel() {
    const leftArrows = document.querySelectorAll('.carousel-arrow.left');
    const rightArrows = document.querySelectorAll('.carousel-arrow.right');

    leftArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            const track = this.parentElement.querySelector('.carousel-track');
            if (track) {
                track.scrollLeft -= 320;
            }
        });
    });

    rightArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            const track = this.parentElement.querySelector('.carousel-track');
            if (track) {
                track.scrollLeft += 320;
            }
        });
    });
}

setupCarousel();

// Add hover animation to service images
document.querySelectorAll('.service-image img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.transition = 'transform 0.4s ease';
    });
});

// Prevent accidental form submissions
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        // Add your form handling here
    });
});

// Add loading state to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Only for actual form submissions, not navigation
        if (this.tagName === 'BUTTON') {
            const oldText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = oldText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add smooth page transitions
window.addEventListener('beforeunload', function() {
    document.documentElement.style.opacity = '0';
});

window.addEventListener('load', function() {
    document.documentElement.style.transition = 'opacity 0.3s ease';
    document.documentElement.style.opacity = '1';
});

console.log('Website loaded successfully!');
