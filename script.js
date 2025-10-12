function slideAnimation(){
  const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let index = 0;

// GSAP Animation Function
function animateSlide(slide) {
  const text = slide.querySelector('.overlay');
//   const button = slide.querySelector('.join-btn');

  gsap.fromTo(text, { y: 100, stagger:0.25, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
//   gsap.fromTo(button, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
}

// Show Slide Function
function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === i);
  });
  animateSlide(slides[i]);
}

// Button Controls
nextBtn.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  showSlide(index);
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
});

// Auto Change Every 4 Seconds
setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 4000);

// Initialize First Slide
showSlide(index);
}
slideAnimation()

function cursorAnimation(){
      // Wait for DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('myVideo');
    const playButton = document.getElementById('playButton');
    const pauseOverlay = document.getElementById('pauseOverlay');
    const videoContainer = document.getElementById('videoContainer');

    let hideTimeout; // For auto-hiding button when playing (after hover)
    const HIDE_DELAY = 3000; // 3 seconds - adjust as needed

    function updateButtonIcon() {
        if (video.paused) {
            playButton.innerHTML = '▶'; // Play icon when paused
        } else {
            playButton.innerHTML = '⏸'; // Pause icon when playing
        }
    }

    function showPauseState() {
        // When paused: Show overlay image and play button
        pauseOverlay.classList.remove('hidden');
        playButton.classList.remove('hidden');
        clearTimeout(hideTimeout); // Clear any pending hide
    }

    function hidePauseState() {
        // When playing: Hide overlay image and play button (unless hovered)
        if (!video.paused) {
            pauseOverlay.classList.add('hidden');
            // Button hide is handled by timeout/events, not here
        }
    }

    function showButton() {
        playButton.classList.remove('hidden');
    }

    function hideButton() {
        if (!video.paused) { // Only hide if playing
            playButton.classList.add('hidden');
        }
    }

    function togglePlay() {
        if (video.paused) {
            video.play(); // Resumes from the current position
            // video.style.opacity = 1;
            updateButtonIcon(); // Update to pause icon
            hidePauseState(); // Hide image
            // Button will auto-hide via timeout if no hover
        } else {
            video.pause(); // Pauses at the current position (video stops)
            // video.style.opacity = 1;
            updateButtonIcon(); // Update to play icon
            showPauseState(); // Show image and button
        }
    }

    // Attach click event listener to the button (replaces onclick)
    playButton.addEventListener('click', togglePlay);

    // Event Listeners for play/pause
    video.addEventListener('play', function() {
        updateButtonIcon();
        hidePauseState(); // Hide image when playing
        clearTimeout(hideTimeout); // Reset timeout
        // Show button briefly on play start, then auto-hide
        showButton();
        hideTimeout = setTimeout(hideButton, HIDE_DELAY);
    });

    video.addEventListener('pause', function() {
        updateButtonIcon();
        showPauseState(); // Show image/button when paused
    });

    video.addEventListener('ended', function() {
        // When video ends, treat as paused: show image/button for replay
        updateButtonIcon();
        showPauseState();
    });

    // Mouse cursor control and button reveal on hover
    videoContainer.addEventListener('mouseenter', function() {
        videoContainer.style.cursor ='default';
        showButton(); // Always show button on hover (pause icon if playing)
        clearTimeout(hideTimeout); // Reset auto-hide
        if (!video.paused) {
            // If playing, restart auto-hide timeout after hover
            hideTimeout = setTimeout(hideButton, HIDE_DELAY);
        }
        // Note: Overlay stays hidden if playing; only button shows for pause
    });

    videoContainer.addEventListener('mouseleave', function() {
        videoContainer.style.cursor = 'default';
        if (!video.paused) {
            // If playing, start auto-hide timeout on leave
            hideTimeout = setTimeout(hideButton, HIDE_DELAY);
        }
    });

    // Initial state: Video is paused, so show overlay image and play button
    updateButtonIcon();
    showPauseState();
});

}
cursorAnimation()


// Function to animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100; // Adjust for speed (higher = faster)
        let current = 0;
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + (target >= 1000 ? '+' : (target >= 100 ? '+' : '+')); // Format: 1000+ or 400+ etc.
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (target >= 1000 ? '+' : (target >= 100 ? '+' : '+')); // Final format
            }
        };
        updateCounter();
    });
}

// Trigger animation on page load (or when card is visible)
document.addEventListener('DOMContentLoaded', () => {
    // Simple delay to simulate load
    setTimeout(animateCounters, 500);
});

// Optional: Use Intersection Observer for better performance (animates only when in view)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.reach-card'));




// Smart Navbar Hide/Show on Scroll
let lastScrollY = window.scrollY;
let ticking = false; // For throttling

function updateNavbar() {
    const navbar = document.getElementById('navbar');
    const currentScrollY = window.scrollY;

    // If scrolling down (current > last), hide navbar
    if (currentScrollY > lastScrollY && currentScrollY > 50) { // Threshold: hide only after 50px scroll
        navbar.classList.add('hidden');
    } 
    // If scrolling up (current < last), show navbar
    else if (currentScrollY < lastScrollY) {
        navbar.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}

// Listen to scroll event (throttled)
window.addEventListener('scroll', requestTick);

// Mobile Menu Toggle (Optional: For responsiveness)
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link (optional enhancement)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Initial check (show navbar on load)
window.addEventListener('load', () => {
    document.getElementById('navbar').classList.remove('hidden');
});