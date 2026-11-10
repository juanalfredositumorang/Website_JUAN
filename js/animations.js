/**
 * ============================================================================
 * ANIMATIONS.JS — GSAP, SCROLLTRIGGER, CANVAS, CURSOR & TYPING EFFECTS
 * Portfolio: JUAN ALFREDO FERRYRA SITUMORANG
 * ============================================================================
 */

/**
 * 1. PRELOADER ANIMATION
 */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  const percentEl = document.getElementById("preloader-percent");
  let count = 0;

  const interval = setInterval(() => {
    count += Math.floor(Math.random() * 8) + 3;
    if (count >= 100) {
      count = 100;
      clearInterval(interval);
      percentEl.innerText = "100";

      setTimeout(() => {
        preloader.classList.add("loaded");
        animateHeroEnter();
      }, 400);
    } else {
      percentEl.innerText = count;
    }
  }, 35);
}

/**
 * 2. CUSTOM FLUID CURSOR
 */
function initCustomCursor() {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  function renderCursorRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursorRing);
  }
  requestAnimationFrame(renderCursorRing);

  const hoverTargets = 'a, button, input, textarea, .project-card, .gallery-card-3d, .skill-card, .anime-character-wrap';
  document.body.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.add("cursor-hover");
    }
  });
  document.body.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.remove("cursor-hover");
    }
  });
}

/**
 * 3. HERO CURSED BLUE ENERGY PARTICLES (CANVAS)
 */
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  let mouse = {
    x: width / 2,
    y: height / 2,
    isActive: false
  };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isActive = true;
  });

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 3 + 1.2;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = (Math.random() - 0.5) * 0.8 - 0.4;
      this.alpha = Math.random() * 0.5 + 0.15;
      this.decay = Math.random() * 0.004 + 0.002;
      this.color = Math.random() > 0.5 ? '#00F0FF' : '#3B82F6';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (mouse.isActive) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          this.x += (dx / dist) * force * 1.5;
          this.y += (dy / dist) * force * 1.5;
          this.alpha = Math.min(0.8, this.alpha + 0.02);
        }
      }

      this.alpha -= this.decay;
      if (this.alpha <= 0 || this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/**
 * 4. HERO SUBTITLE TYPING EFFECT
 */
function initHeroTyping() {
  const el = document.getElementById("hero-typewriter");
  if (!el) return;

  const currentLang = localStorage.getItem('portfolio_lang') || 'id';
  const words = currentLang === 'en' ? CONFIG.personal.heroTypingTextsEN : CONFIG.personal.heroTypingTexts;
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseDuration = 2000;

  function type() {
    const currentWord = words[wordIndex % words.length];

    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseDuration;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex++;
      delay = 400;
    }

    setTimeout(type, delay);
  }
  type();
}

/**
 * 5. HERO ENTRANCE (GSAP)
 */
function animateHeroEnter() {
  if (typeof gsap === 'undefined') return;

  gsap.from(".hero-badge", { y: -20, opacity: 0, duration: 0.8, ease: "power3.out" });
  gsap.from(".hero-main-title", { y: 30, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
  gsap.from(".hero-typing-wrap", { opacity: 0, duration: 0.8, delay: 0.4 });
  gsap.from(".hero-actions", { y: 20, opacity: 0, duration: 0.8, delay: 0.6, ease: "power3.out" });
  gsap.from("#hero-giant-text", { scale: 0.85, opacity: 0, duration: 1.2, delay: 0.3, ease: "power2.out" });
  gsap.from("#hero-hologram-stage", { scale: 0.7, opacity: 0, duration: 1.2, delay: 0.4, ease: "back.out(1.4)" });
  gsap.from(".floating-hero-card", { scale: 0, opacity: 0, duration: 0.8, stagger: 0.15, delay: 0.7, ease: "back.out(1.7)" });
  gsap.from(".hero-right-jp", { x: 30, opacity: 0, duration: 1, delay: 0.5, ease: "power3.out" });
}

/**
 * 6. HERO 3D MOUSE PARALLAX & CARD 3D TILT
 */
function initHeroParallax() {
  const heroStage = document.getElementById("hero");
  const hologramStage = document.getElementById("hero-hologram-stage");
  const giantText = document.getElementById("hero-giant-text");

  if (heroStage && giantText && typeof gsap !== 'undefined') {
    heroStage.addEventListener("mousemove", (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      if (hologramStage) {
        gsap.to(hologramStage, {
          x: x * 0.035,
          y: y * 0.035,
          rotationY: x * 0.04,
          rotationX: -y * 0.04,
          duration: 0.6,
          ease: "power1.out"
        });
      }

      gsap.to(giantText, {
        xPercent: -50,
        yPercent: -50,
        x: -x * 0.02,
        y: -y * 0.02,
        duration: 0.6,
        ease: "power1.out"
      });
    });

    heroStage.addEventListener("mouseleave", () => {
      if (hologramStage) {
        gsap.to(hologramStage, { x: 0, y: 0, rotationY: 0, rotationX: 0, duration: 0.8, ease: "power2.out" });
      }
      gsap.to(giantText, { xPercent: -50, yPercent: -50, x: 0, y: 0, duration: 0.8, ease: "power2.out" });
    });
  }

  // Cool 3D Card Tilt on Hover
  initCard3DTilt();
}

/**
 * 7. INTERACTIVE 3D PERSPECTIVE TILT ON CARDS
 */
function initCard3DTilt() {
  const tiltElements = document.querySelectorAll(".project-card, .skill-card, .about-profile-card");
  tiltElements.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/**
 * 8. GSAP SCROLLTRIGGER, PROGRESS BAR & SCROLLSPY
 */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Top Scroll Progress Bar & Back to top button
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) progressBar.style.width = `${progress}%`;

    const btt = document.getElementById("back-to-top");
    if (btt) {
      if (scrollTop > 500) {
        btt.classList.add("visible");
      } else {
        btt.classList.remove("visible");
      }
    }
  });

  // Animated Counters
  const counterVals = document.querySelectorAll(".counter-val");
  counterVals.forEach(c => {
    const target = +c.dataset.target;
    ScrollTrigger.create({
      trigger: c,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(c, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power2.out"
        });
      }
    });
  });

  // Staggered Skills Reveal & SVG Rings
  ScrollTrigger.create({
    trigger: "#keahlian",
    start: "top 75%",
    once: true,
    onEnter: () => {
      // Matikan CSS transition selama GSAP berjalan (bentrok `transition: all` bikin animasi sangat lambat)
      gsap.from(".skill-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        onStart: function () { this.targets().forEach(el => el.style.transition = "none"); },
        onComplete: function () { this.targets().forEach(el => { el.style.transition = ""; el.style.opacity = ""; el.style.transform = ""; }); }
      });

      document.querySelectorAll(".skill-circle-fill").forEach(circle => {
        const targetOffset = circle.dataset.targetOffset;
        circle.style.strokeDashoffset = targetOffset;
      });
    }
  });

  // Timeline Glowing Progress Line
  const timelineSection = document.getElementById("pengalaman");
  const timelineFill = document.getElementById("timeline-fill");
  if (timelineSection && timelineFill) {
    ScrollTrigger.create({
      trigger: timelineSection,
      start: "top 60%",
      end: "bottom 80%",
      scrub: true,
      onUpdate: (self) => {
        timelineFill.style.height = `${self.progress * 100}%`;
      }
    });
  }

  // ScrollSpy for Floating Navbar Pill
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#nav-desktop-menu .nav-link");
  const indicator = document.getElementById("nav-indicator");

  function updateNavIndicator(activeLink) {
    if (!indicator || !activeLink) return;
    const left = activeLink.offsetLeft;
    const width = activeLink.offsetWidth;
    indicator.style.transform = `translateX(${left}px)`;
    indicator.style.width = `${width}px`;
  }

  const activeInitial = document.querySelector("#nav-desktop-menu .nav-link.active");
  if (activeInitial) updateNavIndicator(activeInitial);

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentSectionId = sec.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.dataset.nav === currentSectionId) {
        link.classList.add("active");
        updateNavIndicator(link);
      }
    });
  });
}
