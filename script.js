document.addEventListener("DOMContentLoaded", () => {

  // ---------- SLIDE ANIMATION (Home Page Only) ----------
  const slides = document.querySelectorAll(".slide");
  if (slides.length > 0) {
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    let index = 0;

    function animateSlide(slide) {
      if (!slide) return;
      const text = slide.querySelector(".overlay");
      if (text) {
        gsap.fromTo(
          text,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
      }
    }

    function showSlide(i) {
      slides.forEach((slide, idx) => slide.classList.toggle("active", idx === i));
      animateSlide(slides[i]);
    }

    nextBtn?.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      showSlide(index);
    });

    prevBtn?.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    });

    setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(index);
    }, 4000);

    showSlide(index);
  }

  // ---------- COUNTER ANIMATION (About or Stats Page) ----------
  const counters = document.querySelectorAll(".counter");
  if (counters.length > 0) {
    function animateCounters() {
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute("data-target"));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current) + "+";
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + "+";
          }
        };
        updateCounter();
      });
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const reachCard = document.querySelector(".reach-card");
    if (reachCard) observer.observe(reachCard);
  }

  // ---------- ACTIVE NAV LINK (Works on All Pages) ----------
  const navLinks = document.querySelectorAll(".nav-link");
  let currentPath = window.location.pathname.split("/").pop();

  // Fix for home or index
  if (currentPath === "" || currentPath === "index.html") {
    currentPath = "home.html"; // Change if your homepage file name is different
  }

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }

    // Add instant active effect when clicking (before reload)
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // ---------- DEVELOPER TEAM BUTTON ----------
  const developerBtn = document.getElementById("developerBtn");
  if (developerBtn) {
    developerBtn.addEventListener("click", () => {
      window.location.href = "developer-team.html";
    });
  }

});






// ✅ Scroll to top + fade-in effect on reload or page open
window.addEventListener("pageshow", function () {
  // Scroll to top smoothly
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  // Fade-in animation for the body
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = "opacity 1s ease";
    document.body.style.opacity = 1;
  }, 100);
});




// ✅ NSS Loader + Scroll to Top + Fade In Effect
window.addEventListener("pageshow", function () {
  const loader = document.getElementById("page-loader");

  // Show loader initially
  if (loader) loader.classList.remove("hidden");

  // Scroll to top on reload
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Fade in the body
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = "opacity 1s ease";
    document.body.style.opacity = 1;

    // Hide loader after animation
    setTimeout(() => {
      if (loader) loader.classList.add("hidden");
    }, 5000);
  }, 600);
});


// 🌟 Typewriter effect for loader
function typewriterEffect() {
  const textEl = document.getElementById("typewriter-text");
  const text = "Please wait... Loading NSS, SAM Global University";
  let index = 0;

  function type() {
    if (index < text.length) {
      textEl.textContent += text.charAt(index);
      index++;
      setTimeout(type, 80); // typing speed in ms
    }
  }

  type();
}

// Initialize typewriter when loader is visible
window.addEventListener("pageshow", () => {
  typewriterEffect();
});
