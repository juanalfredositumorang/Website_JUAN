# Panduan Aset & Kustomisasi Portfolio Juan Alfredo

Folder `assets/` disiapkan untuk menyimpan gambar, screenshot proyek, foto profil, dan aset visual kustom Anda.

---

## 📁 Struktur File Proyek
```
kenangan/
├── index.html           # Struktur semantik HTML halaman utama
├── css/
│   ├── variables.css    # Variabel warna, tema (terang/gelap), tipografi & reset dasar
│   ├── components.css   # Komponen UI: navbar, tombol, modal, toast, cursor, preloader
│   └── sections.css     # Styling spesifik tiap section (hero, tentang, keahlian, dll.)
├── js/
│   ├── config.js        # Konfigurasi data pribadi, proyek, keahlian, dan teks bilingual
│   ├── animations.js    # Logika GSAP ScrollTrigger, canvas partikel biru, kursor, dan typing
│   └── main.js          # Inisialisasi DOM, filter kategori, modal dialog, formulir kontak
└── assets/              # Tempat menaruh foto profil, screenshot proyek, dan ikon kustom
```

---

## 🎨 Cara Mengganti Foto / Karakter Anime Sendiri:
Jika Anda memiliki file gambar PNG transparan (tanpa background) untuk karakter anime Anda:
1. Simpan gambar di folder `assets/`, misalnya `assets/karakter-juan.png`.
2. Buka file `js/config.js`.
3. Pada bagian `personal.heroCharacterImage`, isi dengan path tersebut:
   ```javascript
   personal: {
     name: "JUAN ALFREDO FERRYRA SITUMORANG",
     heroCharacterImage: "assets/karakter-juan.png",
     ...
   }
   ```

---

## 🚀 Menjalankan Website:
Website ini murni dibuat dengan standar HTML5, CSS3, dan Vanilla JavaScript. Anda dapat langsung:
- **Membuka langsung**: Klik ganda file `index.html` di File Explorer komputer Anda.
- **Menggunakan Live Server**: Di VS Code, klik kanan `index.html` lalu pilih *Open with Live Server*.
- **Hosting**: Siap diunggah langsung ke GitHub Pages, Vercel, Netlify, atau web hosting mana pun tanpa perlu build step / npm install.

---

## ⚡ Fitur Ekstra (css/extras.css + js/extras.js)
- **Command Palette**: tekan `Ctrl+K` (Mac: `⌘K`) atau `/`. Ketik untuk pindah bagian, buka proyek, ganti tema/bahasa, salin email, chat WhatsApp.
- **Terminal mini**: tekan tombol `` ` `` (backtick). Coba: `help`, `skills`, `projects`, `goto kontak`, `confetti`.
- **Titik navigasi samping**, **jam WIB live** (klik untuk buka palette), **spotlight cahaya** di kartu, **tombol magnetik**, dan **efek scramble** di menu.
- Mau mematikan semua? Hapus 2 baris `extras` di `index.html`.
