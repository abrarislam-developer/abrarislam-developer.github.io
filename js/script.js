// ===== Typing Effect =====
const typingText = document.querySelector(".typing-text");
const phrases = [
  "Backend Developer",
  "Angular Developer",
  "React Full Stack (in progress)",
  "Microservices Architect",
  "Problem Solver",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500; // Pause before next word
  }

  setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
typeEffect();

// ===== Mobile Navigation =====
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  updateActiveNavLink();
});

// ===== Active Nav Link on Scroll =====
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// ===== Counter Animation =====
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const increment = target / 60; // Complete in ~60 frames
    let current = 0;

    function updateCounter() {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current) + "+";
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + "+";
      }
    }

    updateCounter();
  });
}

// ===== Scroll Animation with Intersection Observer =====
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Trigger counter animation when stats section comes into view
      if (entry.target.classList.contains("about-text")) {
        animateCounters();
      }

      // Animate timeline items sequentially
      if (entry.target.classList.contains("timeline")) {
        const items = entry.target.querySelectorAll(".timeline-item");
        items.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateX(0)";
          }, index * 200);
        });
      }
    }
  });
}, observerOptions);

// Observe elements for scroll animation
document
  .querySelectorAll(
    ".about-text, .timeline, .achievements-grid, .value-container, .contact-content, .skills-grid, .resume-card",
  )
  .forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

// Also observe individual timeline items
document.querySelectorAll(".timeline-item").forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateX(-20px)";
  item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
});

// ===== Contact Form =====
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show success message (in production, this would send the form)
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Message Sent! ✓";
    submitBtn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = "";
      contactForm.reset();
    }, 3000);
  });
}

// ===== Smooth Reveal Animation for Cards =====
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".achievement-card, .value-item, .skill-category")
  .forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    cardObserver.observe(card);
  });

// ===== Particle Background Effect for Hero =====
function createParticles() {
  const hero = document.querySelector(".hero");
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float-particle ${5 + Math.random() * 10}s infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
        `;
    hero.appendChild(particle);
  }
}

// Add particle animation keyframes
const style = document.createElement("style");
style.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
        }
        25% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-15px) translateX(-15px);
            opacity: 0.3;
        }
        75% {
            transform: translateY(-45px) translateX(10px);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// ===== Resume Modal =====
const viewResumeBtn = document.getElementById("viewResumeBtn");
const resumeModal = document.getElementById("resumeModal");
const closeResumeModal = document.getElementById("closeResumeModal");

function openResumeModal() {
  resumeModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  resumeModal.classList.remove("active");
  document.body.style.overflow = "";
}

if (viewResumeBtn && resumeModal) {
  viewResumeBtn.addEventListener("click", openResumeModal);

  closeResumeModal.addEventListener("click", closeModal);

  // Close on overlay click
  resumeModal.addEventListener("click", (e) => {
    if (e.target === resumeModal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && resumeModal.classList.contains("active")) {
      closeModal();
    }
  });
}

console.log("🚀 Portfolio site loaded successfully!");
console.log("👋 Thanks for visiting!");
