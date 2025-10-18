// document.addEventListener("DOMContentLoaded", () => {

//   // ---------- SLIDE ANIMATION (Home Page Only) ----------
//   const slides = document.querySelectorAll(".slide");
//   if (slides.length > 0) {
//     const nextBtn = document.querySelector(".next");
//     const prevBtn = document.querySelector(".prev");
//     let index = 0;

//     function animateSlide(slide) {
//       if (!slide) return;
//       const text = slide.querySelector(".overlay");
//       if (text) {
//         gsap.fromTo(
//           text,
//           { y: 100, opacity: 0 },
//           { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
//         );
//       }
//     }

//     function showSlide(i) {
//       slides.forEach((slide, idx) => slide.classList.toggle("active", idx === i));
//       animateSlide(slides[i]);
//     }

//     nextBtn?.addEventListener("click", () => {
//       index = (index + 1) % slides.length;
//       showSlide(index);
//     });

//     prevBtn?.addEventListener("click", () => {
//       index = (index - 1 + slides.length) % slides.length;
//       showSlide(index);
//     });

//     setInterval(() => {
//       index = (index + 1) % slides.length;
//       showSlide(index);
//     }, 4000);

//     showSlide(index);
//   }

//   // ---------- VIDEO PLAY/PAUSE + CURSOR ANIMATION ----------
//   const video = document.getElementById('myVideo');
//   const playButton = document.getElementById('playButton');
//   const pauseOverlay = document.getElementById('pauseOverlay');
//   const videoContainer = document.getElementById('videoContainer');
//   if (video && playButton && videoContainer) {
//     let hideTimeout;
//     const HIDE_DELAY = 3000;

//     function updateButtonIcon() {
//       playButton.innerHTML = video.paused ? '▶' : '⏸';
//     }

//     function showPauseState() {
//       pauseOverlay?.classList.remove('hidden');
//       playButton.classList.remove('hidden');
//       clearTimeout(hideTimeout);
//     }

//     function hidePauseState() {
//       if (!video.paused) pauseOverlay?.classList.add('hidden');
//     }

//     function showButton() { playButton.classList.remove('hidden'); }
//     function hideButton() { if (!video.paused) playButton.classList.add('hidden'); }

//     function togglePlay() {
//       if (video.paused) {
//         video.play(); updateButtonIcon(); hidePauseState();
//       } else {
//         video.pause(); updateButtonIcon(); showPauseState();
//       }
//     }

//     playButton.addEventListener('click', togglePlay);

//     video.addEventListener('play', function() {
//       updateButtonIcon();
//       hidePauseState();
//       clearTimeout(hideTimeout);
//       showButton();
//       hideTimeout = setTimeout(hideButton, HIDE_DELAY);
//     });

//     video.addEventListener('pause', showPauseState);
//     video.addEventListener('ended', showPauseState);

//     videoContainer.addEventListener('mouseenter', () => {
//       videoContainer.style.cursor = 'default';
//       showButton();
//       clearTimeout(hideTimeout);
//       if (!video.paused) hideTimeout = setTimeout(hideButton, HIDE_DELAY);
//     });

//     videoContainer.addEventListener('mouseleave', () => {
//       videoContainer.style.cursor = 'default';
//       if (!video.paused) hideTimeout = setTimeout(hideButton, HIDE_DELAY);
//     });

//     // Initial state
//     updateButtonIcon();
//     showPauseState();
//   }

//   // ---------- COUNTER ANIMATION ----------
//   const counters = document.querySelectorAll(".counter");
//   if (counters.length > 0) {

//     function startCounter(counter) {
//       const target = +counter.getAttribute("data-target");
//       let count = 0;
//       const duration = 2000; 
//       const interval = 20;
//       const steps = duration / interval;
//       const increment = Math.ceil(target / steps);

//       function updateCount() {
//         count += increment;
//         if (count < target) {
//           counter.innerText = count + "+";
//           setTimeout(updateCount, interval);
//         } else {
//           counter.innerText = target + "+";
//         }
//       }
//       updateCount();
//     }

//     function animateCounters() {
//       counters.forEach(counter => startCounter(counter));
//     }

//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           animateCounters();
//           observer.unobserve(entry.target);
//         }
//       });
//     }, { threshold: 0.5 });

//     const reachCard = document.querySelector(".reach-card");
//     if (reachCard) observer.observe(reachCard);
//   }

//   // ---------- ACTIVE NAV LINK ----------
//   const navLinks = document.querySelectorAll(".nav-link");
//   let currentPath = window.location.pathname.split("/").pop();
//   if (currentPath === "" || currentPath === "index.html") currentPath = "home.html";

//   navLinks.forEach(link => {
//     const href = link.getAttribute("href");
//     if (href === currentPath) link.classList.add("active");
//     else link.classList.remove("active");

//     link.addEventListener("click", () => {
//       navLinks.forEach(l => l.classList.remove("active"));
//       link.classList.add("active");
//     });
//   });

//   // ---------- DEVELOPER TEAM BUTTON ----------
//   const developerBtn = document.getElementById("developerBtn");
//   if (developerBtn) developerBtn.addEventListener("click", () => {
//     window.location.href = "developer-team.html";
//   });

//   // ---------- NAVBAR HIDE/SHOW ----------
//   let lastScrollY = window.scrollY, ticking = false;
//   function updateNavbar() {
//     const navbar = document.getElementById('navbar');
//     const currentScrollY = window.scrollY;
//     if (currentScrollY > lastScrollY && currentScrollY > 50) navbar?.classList.add('hidden');
//     else if (currentScrollY < lastScrollY) navbar?.classList.remove('hidden');
//     lastScrollY = currentScrollY;
//     ticking = false;
//   }
//   window.addEventListener('scroll', () => {
//     if (!ticking) { requestAnimationFrame(updateNavbar); ticking = true; }
//   });

//   // ---------- MOBILE MENU TOGGLE ----------
//   const mobileMenu = document.getElementById('mobile-menu');
//   const navMenu = document.querySelector('.nav-menu');
//   mobileMenu?.addEventListener('click', () => {
//     mobileMenu.classList.toggle('active');
//     navMenu?.classList.toggle('active');
//   });

//   document.querySelectorAll('.nav-menu a').forEach(link => {
//     link.addEventListener('click', () => {
//       mobileMenu?.classList.remove('active');
//       navMenu?.classList.remove('active');
//     });
//   });

// });

// // ---------- SCROLL TO TOP & PAGE FADE ON RELOAD ----------
// window.addEventListener("pageshow", function () {
//   window.scrollTo({ top: 0, behavior: "smooth" });

//   document.body.style.opacity = 0;
//   setTimeout(() => {
//     document.body.style.transition = "opacity 1s ease";
//     document.body.style.opacity = 1;
//   }, 100);

//   // Reset and restart counters
//   document.querySelectorAll(".counter").forEach(counter => counter.innerText = "0");
//   document.querySelectorAll(".counter").forEach(counter => startCounter(counter));
// });

// // ---------- REUSABLE COUNTER FUNCTION ----------
// function startCounter(counter) {
//   const target = +counter.getAttribute("data-target");
//   let count = 0;
//   const duration = 2000; // total animation duration in ms
//   const interval = 20; // update every 20ms
//   const steps = duration / interval;
//   const increment = target / steps; // fractional increment

//   function updateCount() {
//     count += increment;
//     if (count < target) {
//       counter.innerText = Math.ceil(count) + "+";
//       setTimeout(updateCount, interval);
//     } else {
//       counter.innerText = target + "+";
//     }
//   }
//   updateCount();
// }




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
  let currentPath = window.location.pathname.split("/").pop();
  if (currentPath === "" || currentPath === "index.html") {
    currentPath = "index.html"; // adjust if homepage file name differs
  }

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath) link.classList.add("active");
    else link.classList.remove("active");

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

  
  // ---------- MOBILE CARD TAP BEHAVIOR ----------
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const link = card.querySelector("a");

    card.addEventListener("click", (e) => {
      // first tap shows overlay
      if (!card.classList.contains("active")) {
        e.preventDefault();
        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
      } 
      // second tap opens link
      else if (link) {
        window.open(link.href, "_blank");
      }
    });
  });

// ---------- FUNNY MOBILE TAP MESSAGE ----------
  // Only show on mobile screens
  if (window.innerWidth <= 768) {
    // Only show if we are on the activities page
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "activities.html") {  // replace with your Activities page filename
      const tapHint = document.createElement("div");
      tapHint.className = "tap-hint";
      tapHint.innerHTML = "👆 Tap once to see magic, tap twice to fly to Instagram! ✨";
      document.body.appendChild(tapHint);
    }
  }
  
   
  const reelVideo = document.getElementById("nssVideo");
  const soundToggle = document.getElementById("soundToggle");

  soundToggle.addEventListener("click", () => {
      if (reelVideo.muted) {
        reelVideo.muted = false;
        soundToggle.textContent = "🔊";
      } else {
        reelVideo.muted = true;
        soundToggle.textContent = "🔇";
      }
});


});

// ---------- SCROLL TO TOP ON PAGE RELOAD ----------
window.addEventListener("pageshow", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

