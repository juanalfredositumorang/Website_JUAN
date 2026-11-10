/**
 * ============================================================================
 * MAIN.JS — APPLICATION CONTROLLER & INTERACTION LOGIC
 * Portfolio: JUAN ALFREDO FERRYRA SITUMORANG
 * ============================================================================
 */

let currentLanguage = localStorage.getItem('portfolio_lang') || 'id';
let currentTheme = localStorage.getItem('portfolio_theme') || 'light';
let activeTestimonialIdx = 0;

document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Setup
  initTheme();

  // 2. Animations & Visual Effects (from animations.js)
  if (typeof initPreloader === 'function') initPreloader();
  if (typeof initCustomCursor === 'function') initCustomCursor();
  if (typeof initHeroCanvas === 'function') initHeroCanvas();
  if (typeof initHeroTyping === 'function') initHeroTyping();
  if (typeof initHeroParallax === 'function') initHeroParallax();

  // 3. Populate Dynamic Content from CONFIG
  renderSkills();
  renderProjects();
  renderGallery();
  renderExperience();
  renderTestimonials();
  renderCertifications();

  // 4. Setup GSAP Animations & ScrollSpy
  if (typeof initGSAPAnimations === 'function') initGSAPAnimations();

  // 5. Setup All Interactive Event Handlers
  initEventListeners();
});

/**
 * ============================================================================
 * DYNAMIC RENDERING FUNCTIONS
 * ============================================================================
 */

function renderSkills() {
  const container = document.getElementById("skills-container");
  if (!container || !CONFIG.skills) return;
  container.innerHTML = "";

  const radius = 30;
  const circumference = 2 * Math.PI * radius; // ~188.5

  CONFIG.skills.forEach(skill => {
    const offset = circumference - (skill.percent / 100) * circumference;
    const card = document.createElement("div");
    card.className = "skill-card";
    card.dataset.percent = skill.percent;

    card.innerHTML = `
      <div class="skill-icon-wrap" style="color: ${skill.color}">
        <i class="${skill.icon}"></i>
      </div>
      <h3 class="skill-name">${skill.name}</h3>
      <span class="skill-level-tag">${skill.level}</span>
      <div class="skill-progress-container">
        <svg class="skill-progress-svg" viewBox="0 0 68 68">
          <circle class="skill-circle-bg" cx="34" cy="34" r="${radius}" />
          <circle class="skill-circle-fill" cx="34" cy="34" r="${radius}" 
                  style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${circumference};" 
                  data-target-offset="${offset}" />
        </svg>
        <span class="skill-percent-text">${skill.percent}%</span>
      </div>
    `;
    container.appendChild(card);
  });
  if (typeof initCard3DTilt === 'function') initCard3DTilt();
}

function renderProjects(category = "all") {
  const grid = document.getElementById("projects-grid");
  if (!grid || !CONFIG.projects) return;
  grid.innerHTML = "";

  const filtered = category === "all" 
    ? CONFIG.projects 
    : CONFIG.projects.filter(p => p.category === category);

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.dataset.id = p.id;

    const tagsHtml = p.tech.map(t => `<span class="tech-tag">${t}</span>`).join("");

    card.innerHTML = `
      <div class="project-thumb-wrap">
        <img src="${p.image}" alt="${p.title}" class="project-thumb" loading="lazy">
        <span class="project-badge-overlay">${p.categoryName}</span>
      </div>
      <div class="project-card-body">
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.desc}</p>
        <div class="project-tech-tags">${tagsHtml}</div>
        <div class="project-card-footer">
          <span class="btn-link-action detail-btn">
            <span>Detail Proyek</span>
            <i class="fa-solid fa-arrow-right"></i>
          </span>
          <div style="display: flex; gap: 0.75rem;">
            <a href="${p.liveDemo}" target="_blank" rel="noopener noreferrer" class="btn-link-action" title="Live Demo" onclick="event.stopPropagation();">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-link-action" title="Repository" onclick="event.stopPropagation();">
              <i class="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    `;

    card.addEventListener("click", () => openProjectModal(p));
    grid.appendChild(card);
  });

  if (typeof gsap !== 'undefined') {
    gsap.from(".project-card", {
      opacity: 0,
      y: 25,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      onStart: function () { this.targets().forEach(el => el.style.transition = "none"); },
      onComplete: function () { this.targets().forEach(el => { el.style.transition = ""; el.style.opacity = ""; el.style.transform = ""; }); }
    });
  }
  if (typeof initCard3DTilt === 'function') initCard3DTilt();
}

let isGalleryDragging = false;
let galleryDragDistance = 0;

function renderGallery() {
  const track = document.getElementById("gallery-track");
  if (!track || !CONFIG.gallery) return;
  track.innerHTML = "";

  CONFIG.gallery.forEach(item => {
    const card = document.createElement("div");
    card.className = "gallery-card-3d";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="gallery-card-img" loading="lazy">
      <div class="gallery-card-overlay">
        <h4 class="gallery-card-title">${item.title}</h4>
        <p class="gallery-card-caption">${item.caption}</p>
      </div>
    `;
    card.addEventListener("click", () => {
      if (galleryDragDistance > 15) return; // Abaikan klik jika pengguna sedang menggeser
      openProjectModal({
        title: item.title,
        fullDesc: item.caption,
        image: item.image,
        categoryName: "Visual Art & Project",
        tech: ["Creative Web", "UI Design", "Visual Engineering"],
        liveDemo: "#",
        repoUrl: "#"
      });
    });
    track.appendChild(card);
  });
}

function renderExperience() {
  const wrap = document.getElementById("timeline-items-wrap");
  if (!wrap || !CONFIG.experience) return;
  wrap.innerHTML = "";

  CONFIG.experience.forEach(exp => {
    const item = document.createElement("div");
    item.className = "timeline-item";

    const tagsHtml = exp.tags.map(t => `<span class="tech-tag" style="background: rgba(59, 130, 246, 0.15); color: #00F0FF;">${t}</span>`).join("");

    item.innerHTML = `
      <div class="timeline-point"></div>
      <div class="timeline-card">
        <span class="timeline-year-badge">${exp.year}</span>
        <h3 class="timeline-role">${exp.role}</h3>
        <div class="timeline-company">${exp.company}</div>
        <p class="timeline-desc">${exp.desc}</p>
        <div class="timeline-tags">${tagsHtml}</div>
      </div>
    `;
    wrap.appendChild(item);
  });
}

function renderTestimonials() {
  const container = document.getElementById("testimonial-slides-container");
  if (!container || !CONFIG.testimonials) return;
  container.innerHTML = "";

  CONFIG.testimonials.forEach((t, idx) => {
    const slide = document.createElement("div");
    slide.className = `testimonial-slide ${idx === 0 ? 'active' : ''}`;
    slide.dataset.index = idx;

    const stars = Array(t.rating).fill('<i class="fa-solid fa-star"></i>').join("");

    slide.innerHTML = `
      <i class="fa-solid fa-quote-left quote-icon"></i>
      <p class="testimonial-text">"${t.quote}"</p>
      <div class="testimonial-client">
        <img src="${t.avatar}" alt="${t.name}" class="client-avatar">
        <div class="client-info">
          <h4>${t.name}</h4>
          <p>${t.title}</p>
          <div class="stars-wrap">${stars}</div>
        </div>
      </div>
    `;
    container.appendChild(slide);
  });
}

function renderCertifications() {
  const container = document.getElementById("cert-container");
  if (!container || !CONFIG.certifications) return;
  container.innerHTML = "";

  CONFIG.certifications.forEach(cert => {
    const card = document.createElement("div");
    card.className = "cert-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", "Lihat sertifikat: " + cert.title);
    card.innerHTML = `
      <div class="cert-thumb">
        <img src="${cert.image}" alt="${cert.title}" loading="lazy">
        <span class="cert-zoom"><i class="fa-solid fa-magnifying-glass-plus"></i></span>
      </div>
      <div class="cert-icon"><i class="${cert.icon}"></i></div>
      <h3 class="cert-title">${cert.title}</h3>
      <div class="cert-issuer">${cert.issuer}</div>
      <p class="cert-desc">${cert.desc}</p>
      <div class="cert-id"><i class="fa-regular fa-calendar"></i> ${cert.date}</div>
    `;
    const open = () => openCertLightbox(cert);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    container.appendChild(card);
  });
  if (typeof initCard3DTilt === 'function') initCard3DTilt();
}

function openCertLightbox(cert) {
  let box = document.getElementById("cert-lightbox");
  if (!box) {
    box = document.createElement("div");
    box.id = "cert-lightbox";
    box.innerHTML = `
      <button class="cert-lb-close" aria-label="Tutup"><i class="fa-solid fa-xmark"></i></button>
      <figure>
        <img id="cert-lb-img" alt="">
        <figcaption id="cert-lb-cap"></figcaption>
      </figure>`;
    document.body.appendChild(box);
    const close = () => box.classList.remove("open");
    box.addEventListener("click", e => { if (e.target !== document.getElementById("cert-lb-img")) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }
  document.getElementById("cert-lb-img").src = cert.image;
  document.getElementById("cert-lb-img").alt = cert.title;
  document.getElementById("cert-lb-cap").textContent = cert.title + " — " + cert.date;
  box.classList.add("open");
}

/**
 * ============================================================================
 * MODAL HANDLERS
 * ============================================================================
 */
function openProjectModal(project) {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  document.getElementById("modal-img").src = project.image;
  document.getElementById("modal-badge").innerText = project.categoryName;
  document.getElementById("modal-title").innerText = project.title;
  document.getElementById("modal-desc").innerText = project.fullDesc || project.desc;

  const tagsWrap = document.getElementById("modal-tags");
  tagsWrap.innerHTML = project.tech.map(t => `<span class="tech-tag" style="background: rgba(59, 130, 246, 0.2); color: #00F0FF;">${t}</span>`).join("");

  const liveBtn = document.getElementById("modal-live-link");
  const repoBtn = document.getElementById("modal-repo-link");

  liveBtn.href = project.liveDemo || "#";
  repoBtn.href = project.repoUrl || "#";

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "auto";
  }
}

/**
 * ============================================================================
 * EVENT LISTENERS (THEME, LANGUAGE, FORM, EASTER EGG, ETC.)
 * ============================================================================
 */
function initEventListeners() {
  // 1. Theme Toggle
  const themeBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-icon");

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      currentTheme = isDark ? "dark" : "light";
      localStorage.setItem("portfolio_theme", currentTheme);
      themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
      showToast(`Beralih ke mode ${isDark ? 'Gelap' : 'Terang'}`);
    });
  }

  // 2. Language Toggle
  const langBtn = document.getElementById("lang-toggle-btn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      currentLanguage = currentLanguage === "id" ? "en" : "id";
      localStorage.setItem("portfolio_lang", currentLanguage);
      document.getElementById("lang-label").innerText = currentLanguage.toUpperCase();
      applyLanguage(currentLanguage);
      showToast(currentLanguage === "id" ? "Bahasa diubah ke Indonesia" : "Language switched to English");
    });
  }

  // 3. Mobile Drawer Toggle
  const mobileBtn = document.getElementById("mobile-toggle-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener("click", () => {
      mobileDrawer.classList.toggle("open");
    });
    document.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", () => mobileDrawer.classList.remove("open"));
    });
  }

  // 4. Project Filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      renderProjects(filter);
    });
  });

  // 5. Modal Close
  const closeBtn = document.getElementById("modal-close-btn");
  if (closeBtn) closeBtn.addEventListener("click", closeProjectModal);
  
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target.id === "project-modal") closeProjectModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectModal();
      closeEasterEgg();
    }
  });

  // 6. Gallery Carousel Dragging & Arrows
  const carouselWrapper = document.querySelector(".gallery-carousel-wrapper");
  const prevBtn = document.getElementById("gallery-prev-btn");
  const nextBtn = document.getElementById("gallery-next-btn");

  if (carouselWrapper) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    carouselWrapper.addEventListener("mousedown", (e) => {
      isDown = true;
      galleryDragDistance = 0;
      carouselWrapper.classList.add("dragging");
      startX = e.pageX - carouselWrapper.offsetLeft;
      scrollLeft = carouselWrapper.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
      if (!isDown) return;
      isDown = false;
      carouselWrapper.classList.remove("dragging");
      setTimeout(() => {
        galleryDragDistance = 0;
      }, 100);
    });

    carouselWrapper.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carouselWrapper.offsetLeft;
      const walk = (x - startX) * 1.5;
      galleryDragDistance += Math.abs(walk);
      carouselWrapper.scrollLeft = scrollLeft - walk;
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        carouselWrapper.scrollBy({ left: -390, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        carouselWrapper.scrollBy({ left: 390, behavior: 'smooth' });
      });
    }
  }

  // 7. Testimonial Slider Controls
  const tPrevBtn = document.getElementById("testi-prev-btn");
  const tNextBtn = document.getElementById("testi-next-btn");

  if (tPrevBtn) tPrevBtn.addEventListener("click", () => changeTestimonial(-1));
  if (tNextBtn) tNextBtn.addEventListener("click", () => changeTestimonial(1));

  setInterval(() => {
    changeTestimonial(1);
  }, 7000);

  // 8. Copy Email Buttons
  const copyBtns = [
    document.getElementById("copy-email-btn"),
    document.getElementById("footer-copy-email-btn")
  ];
  copyBtns.forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(CONFIG.personal.email).then(() => {
        showToast(`Email ${CONFIG.personal.email} berhasil disalin!`);
      }).catch(() => {
        showToast("Gagal menyalin email secara otomatis.");
      });
    });
  });

  // 9. Back to Top Smooth Scroll
  const btt = document.getElementById("back-to-top");
  if (btt) {
    btt.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 10. Contact Form Submissions (Email & WhatsApp)
  const contactForm = document.getElementById("portfolio-contact-form");
  const btnSubmitWa = document.getElementById("btn-submit-wa");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name").value.trim();
      const email = document.getElementById("form-email").value.trim();
      const subject = document.getElementById("form-subject").value.trim();
      const msg = document.getElementById("form-message").value.trim();

      if (!name || !email || !msg) {
        showToast("Mohon lengkapi semua kolom form.");
        return;
      }

      const mailtoUrl = `mailto:${CONFIG.personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Halo Juan Situmorang,\n\nNama: " + name + "\nEmail: " + email + "\n\nPesan:\n" + msg)}`;
      window.location.href = mailtoUrl;
      showToast("Membuka aplikasi email Anda...");
    });
  }

  if (btnSubmitWa) {
    btnSubmitWa.addEventListener("click", () => {
      const name = document.getElementById("form-name").value.trim() || "Klien";
      const subject = document.getElementById("form-subject").value.trim() || "Diskusi Proyek";
      const msg = document.getElementById("form-message").value.trim() || "Halo Juan, saya tertarik berdiskusi mengenai proyek web.";

      const waText = `Halo Juan Alfredo (Fullstack Developer),\n\nSaya: *${name}*\nTopik: *${subject}*\nPesan:\n${msg}`;
      const waUrl = `https://wa.me/${CONFIG.personal.whatsapp}?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, "_blank");
    });
  }

  // 11. Easter Egg Keyboard Trigger ('J' or 'j')
  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'j' || e.key === 'J') {
      triggerEasterEgg();
    }
  });

  const closeEggBtn = document.getElementById("close-easter-egg-btn");
  if (closeEggBtn) closeEggBtn.addEventListener("click", closeEasterEgg);
}

/**
 * ============================================================================
 * SLIDER & TOAST HELPERS
 * ============================================================================
 */
function changeTestimonial(direction) {
  const slides = document.querySelectorAll(".testimonial-slide");
  if (!slides.length) return;

  slides[activeTestimonialIdx].classList.remove("active");
  activeTestimonialIdx = (activeTestimonialIdx + direction + slides.length) % slides.length;
  slides[activeTestimonialIdx].classList.add("active");
}

function showToast(message) {
  const toast = document.getElementById("toast-notification");
  const msgEl = document.getElementById("toast-message");
  if (!toast || !msgEl) return;

  msgEl.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

/**
 * ============================================================================
 * EASTER EGG (DOMAIN EXPANSION / RYŌIKI TENKAI)
 * ============================================================================
 */
function triggerEasterEgg() {
  const overlay = document.getElementById("easter-egg-overlay");
  if (!overlay) return;

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";

  if (typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#00F0FF', '#3B82F6', '#FFFFFF', '#60A5FA']
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors: ['#00F0FF', '#3B82F6']
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors: ['#00F0FF', '#3B82F6']
      });
    }, 400);
  }
}

function closeEasterEgg() {
  const overlay = document.getElementById("easter-egg-overlay");
  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

/**
 * ============================================================================
 * THEME & MULTI-LANGUAGE
 * ============================================================================
 */
function initTheme() {
  const themeIcon = document.getElementById("theme-icon");
  if (currentTheme === "dark") {
    document.documentElement.classList.add("dark");
    if (themeIcon) themeIcon.className = "fa-solid fa-sun";
  } else {
    document.documentElement.classList.remove("dark");
    if (themeIcon) themeIcon.className = "fa-solid fa-moon";
  }
}

function applyLanguage(lang) {
  const t = CONFIG.translations[lang];
  if (!t) return;

  const links = document.querySelectorAll("#nav-desktop-menu .nav-link");
  if (links[0]) links[0].innerText = t.navHome;
  if (links[1]) links[1].innerText = t.navAbout;
  if (links[2]) links[2].innerText = t.navSkills;
  if (links[3]) links[3].innerText = t.navProjects;
  if (links[4]) links[4].innerText = t.navGallery;
  if (links[5]) links[5].innerText = t.navExperience;

  const navContactBtn = document.getElementById("nav-contact-btn");
  if (navContactBtn) navContactBtn.querySelector("span").innerText = t.navContactBtn;

  const heroStatus = document.getElementById("hero-status-pill");
  if (heroStatus) heroStatus.innerText = t.heroStatus;

  const heroLeadGray = document.getElementById("hero-lead-gray");
  if (heroLeadGray) heroLeadGray.innerText = t.heroLeadGray;

  const heroLeadBold = document.getElementById("hero-lead-bold");
  if (heroLeadBold) heroLeadBold.innerText = t.heroLeadBold;

  const heroCtaProj = document.getElementById("hero-cta-project");
  if (heroCtaProj) heroCtaProj.querySelector("span").innerText = t.heroCtaProject;

  const heroCtaContact = document.getElementById("hero-cta-contact");
  if (heroCtaContact) heroCtaContact.querySelector("span").innerText = t.heroCtaContact;

  const aboutTag = document.getElementById("about-tag");
  if (aboutTag) aboutTag.querySelector("span").innerText = t.aboutTag;

  const aboutLead = document.getElementById("about-lead-title");
  if (aboutLead) aboutLead.innerHTML = t.aboutLead;

  const skillsTag = document.getElementById("skills-tag");
  if (skillsTag) skillsTag.querySelector("span").innerText = t.skillsTag;

  const skillsTitle = document.getElementById("skills-title");
  if (skillsTitle) skillsTitle.innerHTML = t.skillsTitle;

  const projTag = document.getElementById("proj-tag");
  if (projTag) projTag.querySelector("span").innerText = t.projTag;

  const projTitle = document.getElementById("proj-title");
  if (projTitle) projTitle.innerHTML = t.projTitle;

  const galleryTag = document.getElementById("gallery-tag");
  if (galleryTag) galleryTag.querySelector("span").innerText = t.galleryTag;

  const galleryTitle = document.getElementById("gallery-title");
  if (galleryTitle) galleryTitle.innerHTML = t.galleryTitle;

  const expTag = document.getElementById("exp-tag");
  if (expTag) expTag.querySelector("span").innerText = t.expTag;

  const expTitle = document.getElementById("exp-title");
  if (expTitle) expTitle.innerHTML = t.expTitle;

  const contactTag = document.getElementById("contact-tag");
  if (contactTag) contactTag.querySelector("span").innerText = t.contactTag;

  const contactTitle = document.getElementById("contact-title");
  if (contactTitle) contactTitle.innerHTML = t.contactTitle;
}
