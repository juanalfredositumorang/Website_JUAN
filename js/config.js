/**
 * ============================================================================
 * CONFIG.JS — CENTRALIZED DATA CONFIGURATION
 * Portfolio: JUAN ALFREDO FERRYRA SITUMORANG
 * ============================================================================
 */

const CONFIG = {
  // Data Pribadi
  personal: {
    name: "JUAN ALFREDO FERRYRA SITUMORANG",
    shortName: "Juan Situmorang",
    role: "Fullstack Developer",
    email: "juan.situmorang@example.com", /* GANTI DENGAN EMAIL ANDA */
    whatsapp: "6281234567890",            /* GANTI DENGAN NOMOR WA */
    whatsappDisplay: "+62 812-3456-7890",
    location: "Indonesia",
    status: "Terbuka untuk proyek",
    focus: "Laravel 12, PHP, Fullstack Web & AI Architecture",
    profilePhoto: "assets/juan-profile.jpg",
    heroTypingTexts: [
      "Laravel 12 & Fullstack Developer",
      "PHP, JavaScript, HTML5 & CSS3 Specialist",
      "SQL Database & Vercel Deployment",
      "Arsitek Web Modern & Gemini AI Integration"
    ],
    heroTypingTextsEN: [
      "Laravel 12 & Fullstack Developer",
      "PHP, JavaScript, HTML5 & CSS3 Specialist",
      "SQL Database & Vercel Cloud Architecture",
      "Modern Web Applications & Gemini AI Integration"
    ]
  },

  // Media Sosial
  socials: {
    github: "https://github.com",       /* GANTI DENGAN URL GITHUB ANDA */
    linkedin: "https://linkedin.com",   /* GANTI DENGAN URL LINKEDIN ANDA */
    instagram: "https://instagram.com", /* GANTI DENGAN URL INSTAGRAM ANDA */
    twitter: "https://twitter.com"      /* GANTI DENGAN URL X/TWITTER ANDA */
  },

  // Keahlian & Tech Stack Lengkap (Menampilkan Laravel 12, PHP, HTML, CSS, JavaScript, Dart, Vercel, SQL)
  skills: [
    { name: "Laravel 12", level: "Expert", percent: 96, icon: "fa-brands fa-laravel", color: "#FF2D20" },
    { name: "PHP 8+", level: "Senior", percent: 94, icon: "fa-brands fa-php", color: "#777BB4" },
    { name: "JavaScript (ES6+)", level: "Senior", percent: 96, icon: "fa-brands fa-js", color: "#F7DF1E" },
    { name: "HTML5 Semantik", level: "Expert", percent: 98, icon: "fa-brands fa-html5", color: "#E34F26" },
    { name: "CSS3 & Tailwind", level: "Expert", percent: 96, icon: "fa-brands fa-css3-alt", color: "#38BDF8" },
    { name: "SQL & MySQL", level: "Senior", percent: 93, icon: "fa-solid fa-database", color: "#00758F" },
    { name: "Vercel Cloud", level: "Expert", percent: 95, icon: "fa-solid fa-cloud-arrow-up", color: "#FFFFFF" },
    { name: "Dart & Cross-Platform", level: "Advanced", percent: 88, icon: "fa-solid fa-code", color: "#00B4AB" },
    { name: "Google Gemini AI", level: "Advanced", percent: 92, icon: "fa-solid fa-brain", color: "#00F0FF" },
    { name: "React / Next.js", level: "Senior", percent: 93, icon: "fa-brands fa-react", color: "#61DAFB" },
    { name: "Node.js & Express", level: "Advanced", percent: 90, icon: "fa-brands fa-node-js", color: "#68A063" },
    { name: "TypeScript", level: "Advanced", percent: 89, icon: "fa-solid fa-code-branch", color: "#3178C6" },
    { name: "RESTful API Integration", level: "Senior", percent: 94, icon: "fa-solid fa-network-wired", color: "#E535AB" },
    { name: "Responsive Web Design", level: "Expert", percent: 97, icon: "fa-solid fa-mobile-screen", color: "#10B981" },
    { name: "Git & GitHub CI/CD", level: "Advanced", percent: 93, icon: "fa-brands fa-git-alt", color: "#F05032" },
    { name: "UI/UX & Figma", level: "Advanced", percent: 89, icon: "fa-brands fa-figma", color: "#F24E1E" }
  ],

  // Daftar Proyek (Menampilkan MangaDesu, KedokteranAI, RajaWisata, DozeCafe)
  projects: [
    {
      id: 1,
      category: "web",
      categoryName: "Laravel 12 • Anime Web",
      title: "MangaDesu — Platform Baca Manga & Manhwa",
      desc: "Platform baca komik daring modern berbasis Laravel 12 dengan ribuan judul manga/manhwa/manhua terupdate, bookmark pengguna, dashboard admin/user, dan UI anime retro-pop.",
      fullDesc: "Platform web interaktif yang dibangun menggunakan Laravel 12, PHP 8+, MySQL, dan Tailwind CSS. Menghadirkan pengalaman membaca manga, manhwa, dan manhua yang mulus dengan navigasi chapter instan, sistem pencarian fuzzy, manajemen bookmark personal, dashboard statistik pembaca, serta tampilan dark mode bernuansa anime yang memikat.",
      image: "assets/project-mangadesu.png",
      tech: ["Laravel 12", "PHP 8+", "MySQL Database", "JavaScript", "Tailwind CSS", "Vercel / Cloud"],
      liveDemo: "#",
      repoUrl: "#"
    },
    {
      id: 2,
      category: "web",
      categoryName: "AI & HealthTech",
      title: "KedokteranAI — Asisten Medis Cerdas",
      desc: "Platform asisten kesehatan inovatif yang memadukan sistem pakar medis rule-based dengan Google Gemini Multimodal AI untuk skrining gejala 18+ kondisi medis.",
      fullDesc: "Platform diagnosis awal kesehatan yang memadukan sistem pakar medis klinis (rule-based) dengan kapabilitas penalaran canggih Google Gemini Multimodal AI. Mampu melakukan skrining gejala interaktif, analisis foto medis, histori skrining pasien terintegrasi, dan rekomendasi hidrasi/istirahat medis terpercaya.",
      image: "assets/project-kedokteranai.png",
      tech: ["Google Gemini AI", "FastAPI / Python", "React / Next.js", "Medical Expert System", "Tailwind CSS"],
      liveDemo: "#",
      repoUrl: "#"
    },
    {
      id: 3,
      category: "web",
      categoryName: "Tourism Web Portal",
      title: "RajaWisata — Pesona Destinasi Nusantara",
      desc: "Portal pariwisata Indonesia interaktif dengan sistem booking destinasi unggulan (Candi Borobudur, Raja Ampat, Bromo) dan galeri visual Nusantara.",
      fullDesc: "Website eksplorasi destinasi wisata Indonesia yang dibangun dengan tampilan visual imersif dan performa tinggi. Menyediakan katalog lengkap destinasi Nusantara, sistem reservasi paket tur, galeri foto resolusi tinggi, serta antarmuka yang bersih dan responsif di semua perangkat.",
      image: "assets/project-rajawisata.png",
      tech: ["HTML5 Semantik", "Modern CSS3", "JavaScript ES6+", "Responsive Web Design"],
      liveDemo: "#",
      repoUrl: "#"
    },
    {
      id: 4,
      category: "web",
      categoryName: "F&B Web Platform",
      title: "DozeCafe — Tasty of Coffee Experience",
      desc: "Website kafe kopi modern dengan tata letak minimalis, navigasi responsif, katalog menu kopi spesial, dan fitur 'Call Now' terintegrasi.",
      fullDesc: "Situs web kafe kopi dengan konsep minimalis modern. Menampilkan landing page interaktif dengan elemen biji kopi dan cangkir kopi 3D, katalog menu kopi favorit, informasi toko, dan integrasi pemesanan langsung.",
      image: "assets/project-dozecafe.jpg",
      tech: ["HTML5", "CSS3", "JavaScript", "Minimalist UI Design"],
      liveDemo: "#",
      repoUrl: "#"
    },
    {
      id: 5,
      category: "web",
      categoryName: "Enterprise SaaS",
      title: "SaaS Enterprise ERP Dashboard",
      desc: "Sistem otomasi manajemen inventori terintegrasi, analitik keuangan realtime, dan multi-cabang dengan keamanan tinggi.",
      fullDesc: "Platform ERP komprehensif yang dirancang untuk mendukung operasional bisnis skala menengah hingga enterprise dengan live telemetry dan manajemen inventori otomatis.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
      liveDemo: "#",
      repoUrl: "#"
    },
    {
      id: 6,
      category: "uiux",
      categoryName: "UI/UX & Web3",
      title: "Crypto Vault Neomorphic Banking UI",
      desc: "Desain antarmuka dompet crypto Web3 generasi baru dengan interaksi mikro 3D, mode gelap elegan, dan flow onboarding mulus.",
      fullDesc: "Konsep UI/UX pemenang penghargaan untuk aplikasi finansial Web3. Mengedepankan hierarki visual jelas, micro-interactions interaktif, serta sistem design tokens terstandar.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
      tech: ["Figma", "Design System", "GSAP Animations", "Tailwind"],
      liveDemo: "#",
      repoUrl: "#"
    }
  ],

  // Galeri Visual 3D (Termasuk MangaDesu, KedokteranAI, RajaWisata, DozeCafe & Foto Juan)
  gallery: [
    {
      title: "MangaDesu — Anime & Manga Portal",
      caption: "Platform komik web modern dengan Laravel 12, PHP & tema retro-anime",
      image: "assets/project-mangadesu.png"
    },
    {
      title: "KedokteranAI Medical Assistant",
      caption: "Antarmuka cerdas asisten medis berbasis Google Gemini Multimodal AI & Sistem Pakar",
      image: "assets/project-kedokteranai.png"
    },
    {
      title: "RajaWisata Travel Platform",
      caption: "Eksplorasi destinasi wisata Nusantara dengan visual hero Candi Borobudur yang megah",
      image: "assets/project-rajawisata.png"
    },
    {
      title: "DozeCafe Modern Coffee Shop",
      caption: "Landing page kafe kopi modern dengan estetika hangat, tata letak rapi & responsif",
      image: "assets/project-dozecafe.jpg"
    },
    {
      title: "Juan Alfredo F. Situmorang",
      caption: "Fullstack Developer & Creative Technologist di balik setiap baris kode",
      image: "assets/juan-profile.jpg"
    },
    {
      title: "Minimalist Modern Dashboard",
      caption: "Hierarki data bersih dengan skema warna monokrom & aksen cyan",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    }
  ],

  // Pengalaman Kerja & Perjalanan Karier
  experience: [
    {
      year: "2024 — Sekarang",
      role: "Lead Laravel & Fullstack Developer",
      company: "Nexus Digital Innovation Studio",
      desc: "Mengembangkan platform skala penuh seperti MangaDesu menggunakan Laravel 12 dan PHP modern, memadukan integrasi AI Google Gemini pada KedokteranAI, serta mengelola deployment cloud performa tinggi.",
      tags: ["Laravel 12", "PHP 8+", "MySQL", "Google Gemini AI", "Vercel"]
    },
    {
      year: "2022 — 2024",
      role: "Senior Frontend & Web Developer",
      company: "Vertex Tech Solutions",
      desc: "Mengembangkan portal interaktif seperti RajaWisata dan platform komersial, mengoptimalkan arsitektur JavaScript & CSS3 responsif, serta merancang custom design system terpadu.",
      tags: ["JavaScript (ES6+)", "Tailwind CSS", "HTML5", "Responsive Web", "GSAP"]
    },
    {
      year: "2021 — 2022",
      role: "Fullstack Web Developer",
      company: "Inovasi Kreasi Nusantara",
      desc: "Membangun sistem informasi korporat, landing page modern seperti DozeCafe, REST API dengan PHP & Express.js, serta mengoptimalkan query basis data SQL.",
      tags: ["PHP", "SQL / MySQL", "JavaScript", "HTML5/CSS3", "RESTful API"]
    },
    {
      year: "2020 — 2021",
      role: "Junior Web Developer & UI Designer",
      company: "Creative Studio Mandiri",
      desc: "Membuat situs portofolio interaktif, landing page responsif, dan prototipe aplikasi di Figma dengan kepatuhan standar semantik HTML5 dan aksesibilitas WCAG.",
      tags: ["HTML5", "CSS3", "JavaScript", "Figma", "Git"]
    }
  ],

  // Ulasan Teman & Rekan (ganti kutipan sesuai komentar asli mereka)
  testimonials: [
    {
      quote: "Juan itu cepat belajar dan enak diajak kerja sama. Tampilan web buatannya rapi dan mudah dipakai.",
      name: "Robby Farrel",
      title: "Teman & Rekan Kolaborasi",
      avatar: "assets/avatar-polos.svg",
      rating: 5
    },
    {
      quote: "Selama kerja bareng, Juan selalu bertanggung jawab dan mau membantu kalau ada teman yang kesulitan soal coding.",
      name: "Riski Fay Mualana",
      title: "Teman & Rekan Kolaborasi",
      avatar: "assets/avatar-polos.svg",
      rating: 5
    },
    {
      quote: "Hasil website Juan bersih dan responsif, baik di HP maupun laptop. Salut dengan semangat belajarnya!",
      name: "Fazri",
      title: "Teman & Rekan Kolaborasi",
      avatar: "assets/avatar-polos.svg",
      rating: 5
    },
    {
      quote: "Juan teman satu tim yang solid. Ide-idenya kreatif dan eksekusinya serius.",
      name: "Ricko",
      title: "Teman & Rekan Kolaborasi",
      avatar: "assets/avatar-polos.svg",
      rating: 5
    },
    {
      quote: "Juan rajin mencoba hal baru, terutama di sisi frontend dan backend. Kolaborasi dengannya menyenangkan.",
      name: "Ricki Umam",
      title: "Teman & Rekan Kolaborasi",
      avatar: "assets/avatar-polos.svg",
      rating: 5
    },
    {
      quote: "Kerja bareng Juan di hackathon seru banget. Dia tenang, fokus, dan teliti saat debugging.",
      name: "Julian",
      title: "Teman & Rekan Kolaborasi",
      avatar: "assets/avatar-polos.svg",
      rating: 5
    }
  ],

  // Sertifikat & Pelatihan (gambar di assets/sertifikat/)
  certifications: [
    {
      title: "Hackathon Cyber Defenders — Tim Terbaik",
      issuer: "HIMTIF Teknik Informatika UNPAM",
      date: "12 – 13 Juni 2025",
      desc: "Memenangkan challenge Back-End Security in Action bersama tim.",
      image: "assets/sertifikat/hackathon-tim-terbaik.jpg",
      icon: "fa-solid fa-trophy"
    },
    {
      title: "Hackathon Cyber Defenders — Peserta",
      issuer: "HIMTIF Teknik Informatika UNPAM",
      date: "12 – 13 Juni 2025",
      desc: "Peserta Hackathon Cyber Defenders: Back-End Security in Action.",
      image: "assets/sertifikat/hackathon-peserta.jpg",
      icon: "fa-solid fa-shield-halved"
    },
    {
      title: "Workshop Web Portofolio Front-End Developer",
      issuer: "Teknik Informatika Universitas Pamulang",
      date: "23 Juni 2025",
      desc: "Pembuatan web portofolio sebagai representasi kompetensi Front-End Web Developer (8 JP).",
      image: "assets/sertifikat/workshop-web-portofolio.jpg",
      icon: "fa-solid fa-laptop-code"
    },
    {
      title: "Seminar: Masa Depan Web Development",
      issuer: "Teknik Informatika Universitas Pamulang",
      date: "5 Juni 2025",
      desc: "Membangun generasi programmer yang andal, kreatif, dan berdaya saing.",
      image: "assets/sertifikat/seminar-web-dev.jpg",
      icon: "fa-solid fa-microphone-lines"
    },
    {
      title: "Seminar: AI as Smart Solution for Indonesia's Future",
      issuer: "Teknik Informatika Universitas Pamulang",
      date: "5 Desember 2024",
      desc: "Seminar Artificial Intelligence bersama praktisi dan dosen Teknik Informatika UNPAM.",
      image: "assets/sertifikat/seminar-ai.jpg",
      icon: "fa-solid fa-brain"
    },
    {
      title: "PKKMB & LKMM-PD 2024/2025",
      issuer: "Universitas Pamulang",
      date: "14 September 2024",
      desc: "Pengenalan Kehidupan Kampus Bagi Mahasiswa Baru dan Latihan Keterampilan Manajemen Mahasiswa.",
      image: "assets/sertifikat/pkkmb-unpam.jpg",
      icon: "fa-solid fa-graduation-cap"
    }
  ],

  // Terjemahan Bilingual
  translations: {
    id: {
      navHome: "Beranda",
      navAbout: "Tentang",
      navSkills: "Keahlian",
      navProjects: "Proyek",
      navGallery: "Galeri",
      navExperience: "Pengalaman",
      navContactBtn: "Hubungi Saya",
      heroStatus: "Tersedia untuk Pekerjaan & Proyek Baru",
      heroLeadGray: "Fullstack developer yang membangun web modern dari frontend sampai server,",
      heroLeadBold: "rapi di tampilan, kuat di inti.",
      heroCtaProject: "Eksplorasi Proyek",
      heroCtaContact: "Hubungi Saya",
      aboutTag: "Tentang Saya",
      aboutLead: "Membangun website yang bersih, hidup, & <em>mudah digunakan.</em>",
      skillsTag: "Kemampuan Teknis",
      skillsTitle: "Keahlian & <em>Stack Teknologi</em>",
      projTag: "Karya Terpilih",
      projTitle: "Proyek <em>Terbaru</em>",
      galleryTag: "Visual Showcase",
      galleryTitle: "Galeri <em>Visual</em>",
      expTag: "Rekam Jejak",
      expTitle: "Perjalanan <em>Karier</em>",
      contactTag: "Mari Terhubung",
      contactTitle: "Mulai Sebuah <em>Kolaborasi</em>"
    },
    en: {
      navHome: "Home",
      navAbout: "About",
      navSkills: "Skills",
      navProjects: "Projects",
      navGallery: "Gallery",
      navExperience: "Experience",
      navContactBtn: "Contact Me",
      heroStatus: "Available for New Roles & Projects",
      heroLeadGray: "Fullstack developer crafting modern web from frontend to server,",
      heroLeadBold: "clean on the surface, robust at the core.",
      heroCtaProject: "Explore Projects",
      heroCtaContact: "Contact Me",
      aboutTag: "About Me",
      aboutLead: "Crafting clean, lively, & <em>user-friendly</em> web experiences.",
      skillsTag: "Technical Stack",
      skillsTitle: "Skills & <em>Technology Stack</em>",
      projTag: "Featured Work",
      projTitle: "Recent <em>Projects</em>",
      galleryTag: "Visual Showcase",
      galleryTitle: "Visual <em>Gallery</em>",
      expTag: "Track Record",
      expTitle: "Career <em>Journey</em>",
      contactTag: "Let's Connect",
      contactTitle: "Start a <em>Collaboration</em>"
    }
  }
};
