// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');
const cursor = document.querySelector('.cursor');
const skillLevels = document.querySelectorAll('.skill-level');
const contactForm = document.getElementById('contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const sections = document.querySelectorAll('section');

// Initialize Animation
document.addEventListener('DOMContentLoaded', () => {
  // Update page title
  document.title = "Ragulan Karunanithy | Mechanical Engineer & AI Enthusiast";
  
  // Initialize skill animations
  animateSkills();
  
  // Initialize typing animation
  const typingElement = document.querySelector('.typing');
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    typeText(typingElement, text);
  }
  
  // Check if there's a stored theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
  }
  
  // Set active navigation link based on scroll position
  updateActiveNavLink();
});

// Custom Cursor
if (window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.addEventListener('mousedown', () => {
    cursor.style.width = '15px';
    cursor.style.height = '15px';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
  });

  // Enlarge cursor when hovering over links and buttons
  const interactiveElements = document.querySelectorAll('a, button, .theme-toggle, .project-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '30px';
      cursor.style.height = '30px';
      cursor.style.backgroundColor = 'rgba(108, 99, 255, 0.2)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.backgroundColor = 'rgba(108, 99, 255, 0.5)';
    });
  });
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  // Save theme preference
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.querySelector('i').classList.toggle('fa-bars');
  menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.querySelector('i').classList.add('fa-bars');
    menuToggle.querySelector('i').classList.remove('fa-times');
  });
});

// Typing Animation
function typeText(element, text, index = 0) {
  if (index < text.length) {
    element.textContent += text.charAt(index);
    index++;
    setTimeout(() => typeText(element, text, index), 100);
  }
}

// Animate skills on scroll
function animateSkills() {
  skillLevels.forEach(skill => {
    skill.style.width = '0';
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skills = entry.target.querySelectorAll('.skill-level');
        skills.forEach(skill => {
          const width = skill.textContent;
          skill.style.width = width;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
}

// Update active navigation link on scroll
function updateActiveNavLink() {
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// Project filtering
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else {
        const category = card.getAttribute('data-category');
        if (category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      }
    });
  });
});

// Form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the data to a server
    // For this demo, we'll just log it and show a success message
    console.log({ name, email, subject, message });
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Message sent successfully!';
    successMessage.style.backgroundColor = '#4CAF50';
    successMessage.style.color = 'white';
    successMessage.style.padding = '10px';
    successMessage.style.borderRadius = '5px';
    successMessage.style.marginTop = '20px';
    
    contactForm.appendChild(successMessage);
    contactForm.reset();
    
    // Remove success message after 3 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  });
}

// Smooth reveal animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.section-header, .about-image, .about-text, .project-card, .contact-info, .contact-form').forEach(el => {
  el.classList.add('fade-in-element');
  observer.observe(el);
});

// Add fade-in-element class styles
const style = document.createElement('style');
style.textContent = `
  .fade-in-element {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .fade-in-element.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

document.head.appendChild(style);

// Enhance animations for experience and education sections
document.querySelectorAll('.experience-item, .education-item').forEach((el, index) => {
  el.classList.add('fade-in-element');
  el.style.animationDelay = `${0.3 * index}s`;
  observer.observe(el);
});

// Add parallax effect for a more cinematic feel
window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  
  // Parallax for hero section
  if (document.querySelector('.hero')) {
    document.querySelector('.shape').style.transform = `translateY(${scrollPosition * 0.15}px) rotate(${scrollPosition * 0.02}deg)`;
  }
  
  // Subtle parallax for section headers
  document.querySelectorAll('.section-header').forEach(header => {
    const headerPosition = header.getBoundingClientRect().top + window.pageYOffset;
    const distance = scrollPosition - headerPosition;
    if (Math.abs(distance) < 500) {
      header.style.transform = `translateY(${distance * 0.05}px)`;
    }
  });
});

// Enhance the smooth scroll for a more cinematic experience
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Add IntersectionObserver for profile image animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  animatedElements.forEach((el) => observer.observe(el));
});
