const menuToggle = document.getElementById("menuToggle")
const mobileNav = document.getElementById("mobileNav")
const infoPanel = document.getElementById("infoPanel")
const overlay = document.getElementById("overlay")
const infoClose = document.getElementById("infoClose")

const header = document.querySelector(".header")
const logoDark = document.getElementById("logoDark")
const logoLight = document.getElementById("logoLight")

menuToggle.onclick = () => {
  if (window.innerWidth <= 1024) {
    mobileNav.classList.toggle("open")
  } else {
    infoPanel.classList.add("active")
    overlay.classList.add("active")
  }
}

infoClose.onclick = () => {
  infoPanel.classList.remove("active")
  overlay.classList.remove("active")
}

overlay.onclick = () => {
  infoPanel.classList.remove("active")
  overlay.classList.remove("active")
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled")
    logoDark.style.display = "none"
    logoLight.style.display = "block"
  } else {
    header.classList.remove("scrolled")
    logoDark.style.display = "block"
    logoLight.style.display = "none"
  }
})

const dropdownLinks = document.querySelectorAll(".dropdown > a")

dropdownLinks.forEach(link => {
  link.onclick = e => {
    if (window.innerWidth <= 1024) {
      e.preventDefault()
      link.parentElement.classList.toggle("open")
    }
  }
})


document.addEventListener("DOMContentLoaded", () => {

  const counters = document.querySelectorAll(".counter");
  const section = document.querySelector(".success-section");

  if (!counters.length || !section) return;

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

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        runCounters();
        observer.disconnect();
      }
    },
    { threshold: 0.35 }
  );

  observer.observe(section);

});

const track = document.getElementById('sliderTrack');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const slides = document.querySelectorAll('.slider-track img');

let index = 0;

function updateSlide() {
  // Slides the track left by 100% of the container width per index
  track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  if (index < slides.length - 1) {
    index++;
  } else {
    index = 0; // Loops back to the first image
  }
  updateSlide();
});

prevBtn.addEventListener('click', () => {
  if (index > 0) {
    index--;
  } else {
    index = slides.length - 1; // Loops to the last image
  }
  updateSlide();
});

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
});









document.querySelectorAll('.accordion-header').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    item.classList.toggle('active');
  });
});




