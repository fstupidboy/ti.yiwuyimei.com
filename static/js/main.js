/**
 * YiwuYimei B2B Website - Main JavaScript
 * Handles mobile menu, scroll effects, form validation, and animations
 */

(function() {
    'use strict';

    // =========================================
    // DOM Element References
    // =========================================
    const header = document.getElementById('header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const contactForm = document.getElementById('contact-form');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // =========================================
    // Mobile Menu Toggle
    // =========================================
    function initMobileMenu() {
        if (!mobileMenuToggle || !mobileNav) return;

        mobileMenuToggle.addEventListener('click', function() {
            const isOpen = mobileNav.classList.contains('active');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close menu when clicking on a link
        const mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');
        mobileNavLinks.forEach(function(link) {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileNav.contains(event.target) && 
                !mobileMenuToggle.contains(event.target) && 
                mobileNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobileNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    function openMobileMenu() {
        mobileNav.classList.add('active');
        mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    // =========================================
    // Header Scroll Effect
    // =========================================
    function initHeaderScroll() {
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateHeader() {
            const scrollY = window.scrollY;

            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollY = scrollY;
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    // =========================================
    // Smooth Scroll for Anchor Links
    // =========================================
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                const href = this.getAttribute('href');
                
                if (href === '#') return;

                const target = document.querySelector(href);
                
                if (target) {
                    event.preventDefault();
                    
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (mobileNav && mobileNav.classList.contains('active')) {
                        closeMobileMenu();
                    }
                }
            });
        });
    }

    // =========================================
    // Scroll Reveal Animation
    // =========================================
    function initScrollReveal() {
        if (!animatedElements.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(function(element) {
            observer.observe(element);
        });
    }

    // =========================================
    // Contact Form Handling
    // =========================================
    function initContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            if (!validateForm(data)) {
                return;
            }

            // Simulate form submission
            showFormSubmitting();

            // Simulate async submission (replace with actual API call)
            setTimeout(function() {
                showFormSuccess();
                contactForm.reset();
            }, 1500);
        });
    }

    function validateForm(data) {
        const requiredFields = ['name', 'email', 'message'];
        let isValid = true;

        requiredFields.forEach(function(field) {
            const input = contactForm.querySelector('[name="' + field + '"]');
            const value = data[field] ? data[field].trim() : '';

            if (!value) {
                showFieldError(input, 'This field is required');
                isValid = false;
            } else if (field === 'email' && !isValidEmail(value)) {
                showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearFieldError(input);
            }
        });

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFieldError(input, message) {
        if (!input) return;

        clearFieldError(input);

        input.style.borderColor = 'var(--color-error)';
        
        const errorElement = document.createElement('span');
        errorElement.className = 'form-error';
        errorElement.style.cssText = 'color: var(--color-error); font-size: 0.75rem; margin-top: 0.25rem;';
        errorElement.textContent = message;
        
        input.parentNode.appendChild(errorElement);
    }

    function clearFieldError(input) {
        if (!input) return;

        input.style.borderColor = '';
        
        const existingError = input.parentNode.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
    }

    function showFormSubmitting() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Sending...</span>';
        }
    }

    function showFormSuccess() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Reset button
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i data-lucide="send"></i><span>Send Message</span>';
            
            // Reinitialize Lucide icons
            if (window.lucide) {
                lucide.createIcons();
            }
        }

        // Show success message
        let successMessage = contactForm.querySelector('.form-success');
        
        if (!successMessage) {
            successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = '<h3>Thank you!</h3><p>Your message has been sent successfully. We\'ll get back to you within 24 hours.</p>';
            contactForm.appendChild(successMessage);
        }

        successMessage.classList.add('visible');

        // Hide success message after 5 seconds
        setTimeout(function() {
            successMessage.classList.remove('visible');
        }, 5000);
    }

    // =========================================
    // Active Navigation Link
    // =========================================
    function initActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        
        if (!sections.length) return;

        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const headerHeight = header ? header.offsetHeight : 0;

            sections.forEach(function(section) {
                const sectionTop = section.offsetTop - headerHeight - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    // Update navigation links
                    document.querySelectorAll('.nav-link').forEach(function(link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // =========================================
    // Initialize All Functions
    // =========================================
    function init() {
        initMobileMenu();
        initHeaderScroll();
        initSmoothScroll();
        initScrollReveal();
        initContactForm();
        initActiveNavLink();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
