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

// WhatsApp redirect for all products
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        const h4 = card.querySelector('h4');
        if (!h4) return;
        
        const productName = h4.textContent;
        const phone = "916382451476";
        const message = `Hello! I am interested in purchasing ${productName}. Could you please provide more details?`;
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
});

// Gallery Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryItems = document.querySelectorAll('.gallery-item');
const closeLightbox = document.querySelector('.close-lightbox');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentImageIndex = 0;
const allGalleryImages = Array.from(document.querySelectorAll('.gallery-item img')).map(img => img.src);

if (lightbox && galleryItems.length > 0) {
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const updateLightbox = () => {
        lightboxImg.src = allGalleryImages[currentImageIndex];
    };

    const showNext = () => {
        currentImageIndex = (currentImageIndex + 1) % allGalleryImages.length;
        updateLightbox();
    };

    const showPrev = () => {
        currentImageIndex = (currentImageIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
        updateLightbox();
    };

    const closeLightboxFunc = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeLightbox.addEventListener('click', closeLightboxFunc);
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightboxFunc();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
}
