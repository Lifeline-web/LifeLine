// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Add scroll animation for elements
    const animateOnScroll = function() {
        // Animate elements with animate-on-scroll class
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
        
        // Animate elements with animate-when-visible class
        const animateWhenVisible = document.querySelectorAll('.animate-when-visible');
        
        animateWhenVisible.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
                
                // If this is an impact stat, animate the counter
                const statNumbers = element.querySelectorAll('.stat-number');
                if (statNumbers.length > 0) {
                    animateCounters(statNumbers);
                }
            }
        });
        
        // Show/hide back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };
    
    // Animate counter function
    function animateCounters(counters) {
        counters.forEach(counter => {
            // Skip if already animated
            if (counter.classList.contains('animated')) return;
            
            counter.classList.add('animated');
            
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                counter.textContent = Math.round(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
    }
    
    // Apply initial styles for animation
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(element => {
        // Initial styles are set in CSS
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Trigger initial animations
    setTimeout(animateOnScroll, 100);
    
    // Modal functionality for Privacy Policy and Terms of Service
    const privacyPolicyLink = document.querySelector('.privacy-policy-link');
    const termsOfServiceLink = document.querySelector('.terms-of-service-link');
    const privacyPolicyModal = document.getElementById('privacy-policy-modal');
    const termsOfServiceModal = document.getElementById('terms-of-service-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Open Privacy Policy modal
    privacyPolicyLink.addEventListener('click', function(e) {
        e.preventDefault();
        privacyPolicyModal.classList.add('active');
        document.body.classList.add('modal-open');
    });
    
    // Open Terms of Service modal
    termsOfServiceLink.addEventListener('click', function(e) {
        e.preventDefault();
        termsOfServiceModal.classList.add('active');
        document.body.classList.add('modal-open');
    });
    
    // Close modals when clicking the close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            privacyPolicyModal.classList.remove('active');
            termsOfServiceModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });
    });
    
    // Close modals when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === privacyPolicyModal) {
            privacyPolicyModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
        if (e.target === termsOfServiceModal) {
            termsOfServiceModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            privacyPolicyModal.classList.remove('active');
            termsOfServiceModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
});