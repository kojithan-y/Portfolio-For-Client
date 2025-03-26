/**
 * Professional animations enhancement for portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
  // Add scroll-based animations
  const animateOnScroll = function() {
    const elements = document.querySelectorAll(
      '.about-text h3, .project-card, .experience-item, .education-item, .contact-item'
    );
    
    elements.forEach(element => {
      // Add initial state class
      element.classList.add('animate-on-scroll');
      
      // Check if already visible
      if (isElementInViewport(element)) {
        element.classList.add('animate-visible');
      }
    });
    
    // On scroll event
    window.addEventListener('scroll', function() {
      elements.forEach(element => {
        if (isElementInViewport(element) && !element.classList.contains('animate-visible')) {
          element.classList.add('animate-visible');
        }
      });
    });
  };
  
  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
      rect.bottom >= 0
    );
  }
  
  // Enhance hero animation
  const enhanceHero = function() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
      heroContent.classList.add('hero-enhanced');
      heroImage.classList.add('hero-enhanced');
    }
  };
  
  // Enhance button hover effects
  const enhanceButtons = function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.classList.add('btn-hover');
      });
      
      button.addEventListener('mouseleave', function() {
        this.classList.remove('btn-hover');
      });
    });
  };
  
  // Initialize all enhancements
  animateOnScroll();
  enhanceHero();
  enhanceButtons();
  
  // Add style tag with CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .animate-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .hero-enhanced {
      transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
    }
    
    .btn-hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    }
    
    /* Enhanced section transitions */
    .section-header h2 {
      position: relative;
      display: inline-block;
    }
    
    .section-header h2::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 8px;
      bottom: 0;
      left: 0;
      background-color: rgba(108, 99, 255, 0.1);
      z-index: -1;
    }
    
    /* Professional card hover effect */
    .project-card:hover {
      transform: translateY(-10px) scale(1.01);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }
    
    /* Enhanced timeline animations */
    .experience-item::before,
    .education-item::before {
      transition: all 0.4s ease;
    }
    
    .experience-item:hover::before,
    .education-item:hover::before {
      transform: scale(1.3);
      box-shadow: 0 0 0 6px rgba(108, 99, 255, 0.2);
    }
  `;
  
  document.head.appendChild(style);
});
