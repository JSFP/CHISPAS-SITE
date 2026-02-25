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
     MENU MOBILE (Hamburguesa → X)
  ================================================== */

  /* ==================================================
   MENU MOBILE - CLEAN VERSION
================================================== */

  const bars = document.querySelectorAll(".bar");

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains("translate-x-0");

    mobileMenu.classList.toggle("translate-x-0");
    mobileMenu.classList.toggle("translate-x-full");
    document.body.classList.toggle("overflow-hidden");

    // Animación hamburguesa ↔ X
    if (bars.length === 3) {
      bars[0].classList.toggle("rotate-45");
      bars[0].classList.toggle("translate-y-2");

      bars[1].classList.toggle("opacity-0");

      bars[2].classList.toggle("-rotate-45");
      bars[2].classList.toggle("-translate-y-2");
    }

    // Accesibilidad
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
     NAVBAR EFECTO SCROLL
  ================================================== */

  if (navbar) {
    window.addEventListener("scroll", function () {
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
   THREE.JS HERO ANIMATION
================================================== */

const canvas = document.getElementById("heroCanvas");

if (canvas) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    1000,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );

  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const colors = [0xf7f30a, 0x0af77d, 0x0a0ef7, 0xf70a84, 0x22ff88];

  const confetti = [];
  const confettiCount = 80;

  for (let i = 0; i < confettiCount; i++) {
    const size = Math.random() * 5 + 1;

    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    const cube = new THREE.Mesh(geometry, material);

    cube.position.x = (Math.random() - 0.5) * 12;
    cube.position.y = (Math.random() - 0.5) * 12;
    cube.position.z = (Math.random() - 0.5) * 12;

    cube.rotationSpeed = Math.random() * 0.08;

    scene.add(cube);
    confetti.push(cube);
  }

  function createExplosion(x, y) {
    for (let i = 0; i < 6; i++) {
      const size = Math.random() * 4 + 1;

      const geometry = new THREE.BoxGeometry(size, size, size);
      const material = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
      });

      const cube = new THREE.Mesh(geometry, material);

      cube.position.set(x, y, 0);

      cube.velocity = {
        x: (Math.random() - 0.5) * 9,
        y: (Math.random() - 0.5) * 9,
        z: (Math.random() - 0.5) * 9,
      };

      scene.add(cube);
      confetti.push(cube);
    }
  }

  window.addEventListener("click", (event) => {
    const mouseX = (event.clientX / window.innerWidth - 0.5) * 1;
    const mouseY = -(event.clientY / window.innerHeight - 0.5) * 1;

    createExplosion(mouseX, mouseY);
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);

    confetti.forEach((cube) => {
      cube.rotation.x += cube.rotationSpeed;
      cube.rotation.y += cube.rotationSpeed;

      if (cube.velocity) {
        cube.position.x += cube.velocity.x;
        cube.position.y += cube.velocity.y;
        cube.position.z += cube.velocity.z;
      }
    });

    renderer.render(scene, camera);
  }

  animate();
}
/* ==================================================
   PREMIUM GALLERY
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
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  renderMedia(currentIndex);
}

/* Click items */
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openModal(index));
});

/* Buttons */
if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
if (nextBtn) nextBtn.addEventListener("click", nextMedia);
if (prevBtn) prevBtn.addEventListener("click", prevMedia);

/* Click outside */
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

/* Keyboard */
document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("hidden")) return;

  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") nextMedia();
  if (e.key === "ArrowLeft") prevMedia();
});

/* Swipe mobile */
modal.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

modal.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;

  if (touchEndX < touchStartX - 50) nextMedia();
  if (touchEndX > touchStartX + 50) prevMedia();
});

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

if (privacyModal) {
  privacyModal.addEventListener("click", (e) => {
    if (e.target === privacyModal) closePrivacy();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !privacyModal.classList.contains("hidden")) {
    closePrivacy();
  }
});

/* ==================================================
   VIDEO PREVIEW HOVER
================================================= */
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
if (type === "video") {
  const video = document.createElement("video");
  video.src = src;
  video.controls = true;
  video.autoplay = true;
  video.muted = true;
  video.playsInline = true;
  video.className = "max-h-[80vh] w-auto rounded-xl shadow-2xl";
  modalContent.appendChild(video);
}
