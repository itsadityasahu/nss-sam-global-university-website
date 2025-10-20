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

  // ---------- VIDEO PLAY/PAUSE + CURSOR ANIMATION ----------
  const video = document.getElementById('myVideo');
  const playButton = document.getElementById('playButton');
  const pauseOverlay = document.getElementById('pauseOverlay');
  const videoContainer = document.getElementById('videoContainer');
  if (video && playButton && videoContainer) {
    let hideTimeout;
    const HIDE_DELAY = 3000;

    function updateButtonIcon() {
      playButton.innerHTML = video.paused ? '▶' : '⏸';
    }

    function showPauseState() {
      pauseOverlay?.classList.remove('hidden');
      playButton.classList.remove('hidden');
      clearTimeout(hideTimeout);
    }

    function hidePauseState() {
      if (!video.paused) pauseOverlay?.classList.add('hidden');
    }

    function showButton() { playButton.classList.remove('hidden'); }
    function hideButton() { if (!video.paused) playButton.classList.add('hidden'); }

    function togglePlay() {
      if (video.paused) {
        video.play(); updateButtonIcon(); hidePauseState();
      } else {
        video.pause(); updateButtonIcon(); showPauseState();
      }
    }

    playButton.addEventListener('click', togglePlay);

    video.addEventListener('play', function() {
      updateButtonIcon();
      hidePauseState();
      clearTimeout(hideTimeout);
      showButton();
      hideTimeout = setTimeout(hideButton, HIDE_DELAY);
    });

    video.addEventListener('pause', showPauseState);
    video.addEventListener('ended', showPauseState);

    videoContainer.addEventListener('mouseenter', () => {
      videoContainer.style.cursor = 'default';
      showButton();
      clearTimeout(hideTimeout);
      if (!video.paused) hideTimeout = setTimeout(hideButton, HIDE_DELAY);
    });

    videoContainer.addEventListener('mouseleave', () => {
      videoContainer.style.cursor = 'default';
      if (!video.paused) hideTimeout = setTimeout(hideButton, HIDE_DELAY);
    });

    // Initial state
    updateButtonIcon();
    showPauseState();
  }

  // ---------- COUNTER ANIMATION ----------
  function startCounter(counter, duration = 2000) {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const interval = 20; // update every 20ms
    const steps = duration / interval;
    const increment = target / steps;

    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        counter.innerText = target + "+";
        clearInterval(timer);
      } else {
        counter.innerText = Math.ceil(count) + "+";
      }
    }, interval);
  }

  // Trigger counters when visible using Intersection Observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter(entry.target, 2000); // All counters finish in 2s
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".counter").forEach(counter => observer.observe(counter));

  const navbar = document.getElementById("navbar");
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  let lastScrollTop = 0;

  // ---------- MOBILE MENU TOGGLE ----------
  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Change color of hamburger when active
    if (mobileMenu.classList.contains("active")) {
      mobileMenu.style.filter = "invert(58%) sepia(99%) saturate(3633%) hue-rotate(2deg) brightness(102%) contrast(104%)";
    } else {
      mobileMenu.style.filter = "none";
    }
  });

  // ---------- CLOSE MENU ON LINK CLICK ----------
  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
      mobileMenu.style.filter = "none"; // reset color
    });
  });

  // ---------- NAVBAR HIDE/SHOW ON SCROLL ----------
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > 100) {
      // Scrolling down → hide navbar
      navbar.classList.add("hidden");
    } else {
      // Scrolling up → show navbar
      navbar.classList.remove("hidden");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

 // ---------- ACTIVE NAV LINK ----------
const navLinkss = document.querySelectorAll(".navbar a");

// Get the current page path
let currentPath = window.location.pathname.split("/").pop();

// Normalize for local + hosted URLs
if (currentPath === "" || currentPath === "index" || currentPath === "index.html") {
  currentPath = "index";
} else if (currentPath.endsWith(".html")) {
  currentPath = currentPath.replace(".html", "");
}

// Match and highlight the correct nav link
navLinkss.forEach(link => {
  let href = link.getAttribute("href") || "";
  href = href.replace(".html", "").replace("/", "");

  if (href === currentPath) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }

  // Instant highlight on click
  link.addEventListener("click", () => {
    navLinkss.forEach(l => l.classList.remove("active"));
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

   
  // ---------- NSS REEL VIDEO SOUND TOGGLE ----------
  const reelVideo = document.getElementById("nssVideo");
  const soundToggle = document.getElementById("soundToggle");

  if (reelVideo && soundToggle) {
    soundToggle.addEventListener("click", () => {
      if (reelVideo.muted) {
        reelVideo.muted = false;
        soundToggle.textContent = "🔊";
      } else {
        reelVideo.muted = true;
        soundToggle.textContent = "🔇";
      }
    });
  }

});

// ---------- SCROLL TO TOP ON PAGE RELOAD ----------
window.addEventListener("pageshow", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

