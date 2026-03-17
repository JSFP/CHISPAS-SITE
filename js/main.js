document.addEventListener("DOMContentLoaded", () => {
  /* ==================================================
   ELEMENTOS GENERALES
================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuLinks = document.querySelectorAll(".menu-link");
  const themeToggle = document.getElementById("themeToggle");
  const scrollBtn = document.getElementById("scrollTop");
  const contactForm = document.getElementById("contactForm");
  const navbar = document.getElementById("navbar");

  /* ==================================================
   DARK MODE
================================================== */

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");

      if (document.documentElement.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }

  /* ==================================================
   MENU MOBILE
================================================== */

  const bars = document.querySelectorAll(".bar");

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains("translate-x-0");

    mobileMenu.classList.toggle("translate-x-0");
    mobileMenu.classList.toggle("translate-x-full");

    document.body.classList.toggle("overflow-hidden");

    if (bars.length === 3) {
      bars[0].classList.toggle("rotate-45");
      bars[0].classList.toggle("translate-y-2");

      bars[1].classList.toggle("opacity-0");

      bars[2].classList.toggle("-rotate-45");
      bars[2].classList.toggle("-translate-y-2");
    }

    menuToggle.setAttribute("aria-expanded", !isOpen);
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("translate-x-0")) {
        toggleMenu();
      }
    });
  });

  /* ==================================================
   BOTÓN SCROLL TOP
================================================== */

  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.remove("scale-0");
        scrollBtn.classList.add("scale-100");
      } else {
        scrollBtn.classList.remove("scale-100");
        scrollBtn.classList.add("scale-0");
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* ==================================================
   NAVBAR SCROLL
================================================== */

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("bg-black/70", "shadow-xl");
        navbar.classList.remove("bg-white/10");
      } else {
        navbar.classList.remove("bg-black/70", "shadow-xl");
        navbar.classList.add("bg-white/10");
      }
    });
  }

  /* ==================================================
   FORM WHATSAPP
================================================== */

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const message = document.getElementById("message").value;

      const url = `https://wa.me/573212131862?text=${encodeURIComponent(
        `Hola, soy ${name}. ${message}`,
      )}`;

      window.open(url, "_blank");
    });
  }

  /* ==================================================
   SCROLL REVEAL (ARREGLADO)
================================================== */

  const revealItems = document.querySelectorAll(".reveal");

  if (revealItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return;

          setTimeout(() => {
            entry.target.classList.remove("opacity-0", "translate-y-12");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }, index * 120);

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    revealItems.forEach((el) => observer.observe(el));
  }

  /* ==================================================
   PREMIUM GALLERY MODAL
================================================== */

  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
  const modal = document.getElementById("galleryModal");
  const modalContent = document.getElementById("modalContent");
  const closeModalBtn = document.getElementById("closeModal");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const modalCounter = document.getElementById("modalCounter");

  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function renderMedia(index) {
    const item = galleryItems[index];
    const type = item.dataset.type;
    const src = item.dataset.src;

    modalContent.innerHTML = "";

    let element;

    if (type === "image") {
      element = document.createElement("img");
      element.src = src;
      element.className = "max-h-[85vh] w-auto rounded-xl shadow-2xl";
    }

    if (type === "video") {
      element = document.createElement("video");
      element.src = src;
      element.controls = true;
      element.autoplay = true;
      element.muted = true;
      element.playsInline = true;
      element.className = "max-h-[85vh] w-auto rounded-xl shadow-2xl";
    }

    modalContent.appendChild(element);

    modalCounter.textContent = `${index + 1} / ${galleryItems.length}`;
  }

  function openModal(index) {
    currentIndex = index;
    renderMedia(currentIndex);

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    document.body.classList.add("overflow-hidden");

    setTimeout(() => {
      modalContent.classList.remove("scale-95", "opacity-0");
      modalContent.classList.add("scale-100", "opacity-100");
    }, 10);
  }

  function closeModal() {
    modalContent.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");

      modalContent.innerHTML = "";

      document.body.classList.remove("overflow-hidden");
    }, 200);
  }

  function nextMedia() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    renderMedia(currentIndex);
  }

  function prevMedia() {
    currentIndex =
      (currentIndex - 1 + galleryItems.length) % galleryItems.length;

    renderMedia(currentIndex);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openModal(index));
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeModal();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      nextMedia();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      prevMedia();
    });
  }

  /* ==================================================
   PRIVACY MODAL
================================================== */

  const privacyModal = document.getElementById("privacyModal");
  const openPrivacyBtn = document.getElementById("openPrivacyModal");
  const closePrivacyBtn = document.getElementById("closePrivacyModal");

  function openPrivacy() {
    privacyModal.classList.remove("hidden");
    privacyModal.classList.add("flex");

    document.body.classList.add("overflow-hidden");
  }

  function closePrivacy() {
    privacyModal.classList.add("hidden");
    privacyModal.classList.remove("flex");

    document.body.classList.remove("overflow-hidden");
  }

  if (openPrivacyBtn) openPrivacyBtn.addEventListener("click", openPrivacy);
  if (closePrivacyBtn) closePrivacyBtn.addEventListener("click", closePrivacy);

  privacyModal?.addEventListener("click", (e) => {
    if (e.target === privacyModal) closePrivacy();
  });

  /* ==================================================
   VIDEO PREVIEW HOVER
================================================== */

  const previewVideos = document.querySelectorAll(".gallery-item video");

  previewVideos.forEach((video) => {
    video.muted = true;

    video.parentElement.addEventListener("mouseenter", () => {
      video.play();
    });

    video.parentElement.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
});

/* ==================================================
   WORDS ANIMATION
================================================== */

const words = [
  { text: "momentos", color: "#ff4ecd" },
  { text: "experiencias", color: "#6200ff" },
  { text: "emociones", color: "#fbff00" },
  { text: "sonrisas", color: "#22ff88" },
  { text: "recuerdos", color: "#a855f7" },
];

const changingWord = document.getElementById("changing-word");

let index = 0;

function changeWord() {
  if (!changingWord) return;

  changingWord.style.opacity = 0;

  setTimeout(() => {
    changingWord.textContent = words[index].text;
    changingWord.style.color = words[index].color;
    changingWord.style.opacity = 1;

    index = (index + 1) % words.length;
  }, 300);
}

setInterval(changeWord, 3500);
changeWord();

/* ==================================================
   THREE JS HERO
================================================== */

const canvas = document.getElementById("heroCanvas");

if (canvas) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  );

  camera.position.z = 80;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const particlesCount = 180;

  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  const colorPalette = [
    new THREE.Color("#ec4899"),
    new THREE.Color("#facc15"),
    new THREE.Color("#22c55e"),
    new THREE.Color("#a855f7"),
  ];

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 120;

    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 2.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
  });

  const particles = new THREE.Points(geometry, material);

  scene.add(particles);

  function animate() {
    requestAnimationFrame(animate);

    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0003;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}
// cards 3d effect
const cards = document.querySelectorAll(".service-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

// =======================
// ANIMACIÓN SCROLL CARDS
// =======================

function revealCards() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    const visible = 120;

    if (elementTop < windowHeight - visible) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealCards);
window.addEventListener("load", revealCards);

tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      scrollMargin: {
        24: "6rem",
      },
    },
  },
};
