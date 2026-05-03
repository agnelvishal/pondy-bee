// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;

        if (elTop < triggerBottom) {
            el.classList.add('active');
        } else {
            // Optional: remove class to repeat animation
            // el.classList.remove('active');
        }
    });
};

// Initial check and event listener
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Run on load

// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const nav = document.querySelector('nav');
const menuIcon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    // Toggle icon between bars and X
    if (nav.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Only prevent default if it's an internal link
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            // Close mobile menu if open
            nav.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for sticky header
                behavior: 'smooth'
            });
        }
    });
});

// WhatsApp redirect for specific products
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        const productName = card.querySelector('h4').textContent;
        const phone = "916382451476";
        
        // Products that should redirect to WhatsApp
        const targetProducts = ["Cashew Honey", "Honey Twigs"];
        
        if (targetProducts.includes(productName)) {
            const message = `Hello! I am interested in purchasing ${productName}. Could you please provide more details?`;
            const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
    });
});
