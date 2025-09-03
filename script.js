
const allNavLinks = document.querySelectorAll('header nav a, .logo');

const smoothScroll = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

allNavLinks.forEach(link => link.addEventListener('click', smoothScroll));

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

const observerOptions = {
    root: null, 
    rootMargin: '0px',
    threshold: 0.6 
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
           
            const currentId = entry.target.getAttribute('id');
            
            navLinks.forEach(link => link.classList.remove('active'));
            
            const activeLink = document.querySelector(`header nav a[href="#${currentId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

const resumeTabsContainer = document.querySelector('.resume-box'); 
const resumeDetails = document.querySelectorAll('.resume-detailed');

if (resumeTabsContainer) {
    resumeTabsContainer.addEventListener('click', (e) => {
        
        const clickedBtn = e.target.closest('.resume-btn');
        if (!clickedBtn) return; 

        const allBtns = [...resumeTabsContainer.querySelectorAll('.resume-btn')];
        const idx = allBtns.indexOf(clickedBtn);

        allBtns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');

        resumeDetails.forEach(detail => detail.classList.remove('active'));
        if (resumeDetails[idx]) {
            resumeDetails[idx].classList.add('active');
        }
    });
}


const carousel = document.querySelector('.portfolio-carousel');
if (carousel) {
    const slideContainer = carousel.querySelector('.img-slide');
    const slides = carousel.querySelectorAll('.img-item');
    const nextBtn = carousel.querySelector('.arrow-right');
    const prevBtn = carousel.querySelector('.arrow-left');

    let currentIndex = 0;
    const totalSlides = slides.length;

    
    const goToSlide = (slideIndex) => {
        
        const slideWidthPercent = 100 / totalSlides;
        slideContainer.style.transform = `translateX(-${slideIndex * slideWidthPercent}%)`;
        currentIndex = slideIndex;
    };

   
    nextBtn.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % totalSlides;
        goToSlide(nextIndex);
    });

    prevBtn.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(prevIndex);
    });

    
    let touchStartX = 0;
    slideContainer.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true }); 

    slideContainer.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;
        const swipeDiff = touchStartX - touchEndX;

        if (swipeDiff > 50) { 
            nextBtn.click();
        } else if (swipeDiff < -50) { 
            prevBtn.click();
        }
    });
}