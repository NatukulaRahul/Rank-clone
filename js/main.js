const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const infoPanel = document.getElementById("infoPanel");
const overlay = document.getElementById("overlay");
const infoClose = document.getElementById("infoClose");
const header = document.querySelector(".header");
const logoDark = document.getElementById("logoDark");
const logoLight = document.getElementById("logoLight");

// --- COMBINED MENU TOGGLE LOGIC ---
menuToggle.onclick = function() {
  if (window.innerWidth <= 1024) {
    // MOBILE BEHAVIOR: Toggle the list menu
    mobileNav.classList.toggle("open");
    
    // Change icon only on mobile
    this.innerHTML = mobileNav.classList.contains('open') ? '✕' : '☰';
  } else {
    // LARGE SCREEN BEHAVIOR: Show the Info Panel
    if (infoPanel && overlay) {
      infoPanel.classList.add("active");
      overlay.classList.add("active");
    }
    // Keep hamburger as ☰ on large screens
    this.innerHTML = '☰';
  }
};

// Close Info Panel via X button
if (infoClose) {
  infoClose.onclick = () => {
    infoPanel.classList.remove("active");
    overlay.classList.remove("active");
  };
}

// Close everything when clicking the darkened overlay
if (overlay) {
  overlay.onclick = () => {
    if (infoPanel) infoPanel.classList.remove("active");
    if (mobileNav) {
        mobileNav.classList.remove("open");
        menuToggle.innerHTML = '☰'; // Reset icon when closed via overlay
    }
    overlay.classList.remove("active");
  };
}

// --- HEADER SCROLL LOGIC ---
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
    if (logoDark) logoDark.style.display = "none";
    if (logoLight) logoLight.style.display = "block";
  } else {
    header.classList.remove("scrolled");
    if (logoDark) logoDark.style.display = "block";
    if (logoLight) logoLight.style.display = "none";
  }
});

// --- MOBILE DROPDOWN & SUBMENU LOGIC ---
const dropdownLinks = document.querySelectorAll(".dropdown > a, .has-submenu > a");

dropdownLinks.forEach(link => {
  link.onclick = (e) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      const parent = link.parentElement;
      parent.classList.toggle("active");
      
      const nextMenu = link.nextElementSibling;
      if (nextMenu) {
        nextMenu.style.display = nextMenu.style.display === "block" ? "none" : "block";
      }
    }
  };
});

// --- COMPONENTS (Counters, FAQ, Slider) ---
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Success Counters
  const counters = document.querySelectorAll(".counter");
  const section = document.querySelector(".success-section");
  if (counters.length && section) {
    let hasAnimated = false;
    const runCounters = () => {
      if (hasAnimated) return;
      hasAnimated = true;
      counters.forEach(counter => {
        let current = 0;
        const target = parseInt(counter.dataset.target, 10);
        const step = Math.max(1, Math.floor(target / 50));
        const update = () => {
          current += step;
          if (current < target) {
            counter.textContent = current;
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        };
        update();
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        runCounters();
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(section);
  }

  // 2. Image Slider
  const track = document.getElementById('sliderTrack');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const slides = document.querySelectorAll('.slider-track img');
  if (track && nextBtn && prevBtn) {
    let index = 0;
    const updateSlide = () => { track.style.transform = `translateX(-${index * 100}%)`; };
    nextBtn.addEventListener('click', () => {
      index = (index < slides.length - 1) ? index + 1 : 0;
      updateSlide();
    });
    prevBtn.addEventListener('click', () => {
      index = (index > 0) ? index - 1 : slides.length - 1;
      updateSlide();
    });
  }

  // 3. FAQ / Accordion
  const faqItems = document.querySelectorAll(".faq-item, .accordion-item");
  faqItems.forEach(item => {
    const trigger = item.querySelector(".faq-question, .accordion-header");
    if (trigger) {
      trigger.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    }
  });
});




const track = document.querySelector('.blog-track');
  const slides = Array.from(document.querySelectorAll('.blog-item'));
  const dotsContainer = document.querySelector('.blog-dots');

  let visibleSlides = 3;
  let index = 0;

  function updateVisibleSlides() {
    if (window.innerWidth <= 768) {
      visibleSlides = 1;
    } else if (window.innerWidth <= 1024) {
      visibleSlides = 2;
    } else {
      visibleSlides = 3;
    }
  }

  updateVisibleSlides();
  window.addEventListener('resize', updateVisibleSlides);

  /* DUPLICATE SLIDES FOR INFINITE SCROLL */
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
  });

  const totalSlides = slides.length;

  /* CREATE DOTS (ONE PER SLIDE) */
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      index = i;
      moveSlider();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('span');

  function moveSlider() {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    dots.forEach(d => d.classList.remove('active'));
    dots[index % totalSlides].classList.add('active');
  }

  function autoSlide() {
    index++;

    if (index >= totalSlides * 2) {
      track.style.transition = 'none';
      index = totalSlides;
      track.style.transform = `translateX(-${index * slides[0].offsetWidth}px)`;
      requestAnimationFrame(() => {
        track.style.transition = 'transform 0.6s ease';
      });
    }

    moveSlider();
  }

  setInterval(autoSlide, 3500);


  document.addEventListener("DOMContentLoaded", function () {

  const slider = document.querySelector(".review-slider");
  if (!slider) return;

  const cards = slider.querySelectorAll(".review-card");
  const next = slider.querySelector(".review-next");
  const prev = slider.querySelector(".review-prev");

  let current = 0;

  function show(n) {
    cards.forEach(c => c.classList.remove("active"));
    cards[n].classList.add("active");
  }

  next.addEventListener("click", () => {
    current = (current + 1) % cards.length;
    show(current);
  });

  prev.addEventListener("click", () => {
    current = (current - 1 + cards.length) % cards.length;
    show(current);
  });

  setInterval(() => {
    current = (current + 1) % cards.length;
    show(current);
  }, 5000);

});


document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".rankon-accordion li");

  accordions.forEach(item => {
    const btn = item.querySelector(".accordion-btn");

    btn.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".web-faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".web-faq-question");

    question.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
});