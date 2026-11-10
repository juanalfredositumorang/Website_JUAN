/* === EXTRAS: Command Palette (Ctrl+K), Terminal (`), Side Dots, Jam WIB, Spotlight, Magnetic, Scramble === */
(() => {
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const go=id=>{const e=document.getElementById(id);e&&e.scrollIntoView({behavior:'smooth'})};
const toast=m=>typeof showToast=='function'?showToast(m):alert(m);
const boom=()=>typeof confetti=='function'&&[.2,.8].forEach(x=>confetti({particleCount:90,spread:80,origin:{x,y:.7}}));
const P=()=>CONFIG.personal;
const SEC=[['hero','Beranda'],['tentang','Tentang'],['keahlian','Keahlian'],['proyek','Proyek'],['galeri','Galeri'],['pengalaman','Pengalaman'],['testimoni','Testimoni'],['kontak','Kontak']];
const act={theme:()=>$('#theme-toggle-btn').click(),lang:()=>$('#lang-toggle-btn').click(),
 mail:()=>navigator.clipboard.writeText(P().email).then(()=>toast('Email disalin: '+P().email)),
 wa:()=>window.open('https://wa.me/'+P().whatsapp,'_blank'),top:()=>scrollTo({top:0,behavior:'smooth'})};

/* ---- Command Palette ---- */
const CMD=[...SEC.map(([id,l])=>({t:'Pergi ke '+l,k:'nav '+id,i:'↗',f:()=>go(id)})),
 {t:'Ganti mode terang/gelap',k:'tema theme dark',i:'◐',f:act.theme},{t:'Ganti bahasa ID/EN',k:'bahasa language',i:'🌐',f:act.lang},
 {t:'Salin email',k:'email copy',i:'✉',f:act.mail},{t:'Chat WhatsApp',k:'wa whatsapp',i:'💬',f:act.wa},
 {t:'Rayakan 🎉',k:'confetti',i:'🎉',f:boom},{t:'Buka terminal',k:'terminal console',i:'>_',f:()=>term(true)},{t:'Kembali ke atas',k:'top',i:'↑',f:act.top},
 ...(CONFIG.projects||[]).map(p=>({t:'Proyek: '+p.title,k:'project proyek '+p.title,i:'▣',f:()=>{go('proyek');setTimeout(()=>$(`.project-card[data-id="${p.id}"]`)?.click(),700)}}))];
const pal=document.createElement('div');pal.id='xp';
pal.innerHTML='<div class="xp-box" role="dialog" aria-label="Command palette"><input class="xp-in" placeholder="Ketik perintah… (Ctrl+K)" autocomplete="off"><ul class="xp-list"></ul><div class="xp-ft"><span>↑↓ pilih</span><span>Enter jalankan</span><span>Esc tutup</span></div></div>';
document.body.append(pal);
const inp=$('.xp-in',pal),ul=$('.xp-list',pal);let sel=0,cur=CMD;
const draw=()=>{ul.innerHTML=cur.map((c,i)=>`<li class="${i==sel?'on':''}" data-i="${i}"><b>${c.i}</b>${c.t}</li>`).join('')||'<li class="xp-empty">Tidak ditemukan</li>';$('.on',ul)?.scrollIntoView({block:'nearest'})};
const pOpen=v=>{pal.classList.toggle('open',v);if(v){inp.value='';sel=0;cur=CMD;draw();inp.focus()}};
inp.oninput=()=>{const q=inp.value.toLowerCase().trim();cur=CMD.filter(c=>(c.t+' '+c.k).toLowerCase().includes(q));sel=0;draw()};
inp.onkeydown=e=>{if(e.key=='ArrowDown'){sel=Math.min(sel+1,cur.length-1);draw();e.preventDefault()}else if(e.key=='ArrowUp'){sel=Math.max(sel-1,0);draw();e.preventDefault()}else if(e.key=='Enter'&&cur[sel]){pOpen(false);cur[sel].f()}};
ul.onclick=e=>{const li=e.target.closest('li[data-i]');if(li){pOpen(false);cur[+li.dataset.i].f()}};
pal.onclick=e=>e.target==pal&&pOpen(false);

/* ---- Mini Terminal ---- */
const tm=document.createElement('div');tm.id='xt';
tm.innerHTML='<div class="xt-bar"><i></i><i></i><i></i><span>juan@portfolio ~</span><button aria-label="Tutup">×</button></div><div class="xt-out"></div><div class="xt-row"><span>$</span><input autocomplete="off" spellcheck="false" aria-label="Terminal"></div>';
document.body.append(tm);
const out=$('.xt-out',tm),ti=$('input',tm);
const say=(t,c='')=>{const d=document.createElement('div');d.className=c;d.textContent=t;out.append(d);out.scrollTop=out.scrollHeight};
const bar=n=>'█'.repeat(Math.round(n/10))+'░'.repeat(10-Math.round(n/10));
const H={help:()=>say('Perintah: about, skills, projects, contact, goto <bagian>, theme, lang, confetti, whoami, date, clear, exit'),
 about:()=>say(`${P().name} — ${P().role}\nLokasi: ${P().location}\nFokus: ${P().focus}`),
 skills:()=>say((CONFIG.skills||[]).map(s=>`${s.name.padEnd(26)} ${bar(s.percent)} ${s.percent}%`).join('\n')),
 projects:()=>say((CONFIG.projects||[]).map((p,i)=>`${i+1}. ${p.title}`).join('\n')),
 contact:()=>say(`Email: ${P().email}\nWA   : ${P().whatsappDisplay||P().whatsapp}`),
 whoami:()=>say('visitor — selamat datang! 👋'),
 date:()=>say(new Date().toLocaleString('id-ID',{timeZone:'Asia/Jakarta'})+' WIB'),
 theme:()=>{act.theme();say('Tema diganti.')},lang:()=>{act.lang();say('Bahasa diganti.')},
 confetti:()=>{boom();say('🎉')},clear:()=>{out.innerHTML=''},exit:()=>term(false)};
const run=v=>{say('$ '+v,'cmd');const [c,...a]=v.trim().split(/\s+/);if(!c)return;
 if(c=='goto'){const s=SEC.find(x=>x[0]==a[0]);return s?(go(s[0]),say('→ '+s[1],'ok')):say('Bagian: '+SEC.map(x=>x[0]).join(', '),'err')}
 H[c]?H[c]():say(`perintah tidak dikenal: ${c} (ketik help)`,'err')};
const hist=[];let hi=0,boot=0;
const term=v=>{tm.classList.toggle('open',v);if(v){if(!boot++)say('Selamat datang di terminal Juan. Ketik "help".','ok');setTimeout(()=>ti.focus(),50)}};
ti.onkeydown=e=>{if(e.key=='Enter'){const v=ti.value;hist.push(v);hi=hist.length;ti.value='';run(v)}
 else if(e.key=='ArrowUp'){hi=Math.max(0,hi-1);ti.value=hist[hi]||'';e.preventDefault()}
 else if(e.key=='ArrowDown'){hi=Math.min(hist.length,hi+1);ti.value=hist[hi]||'';e.preventDefault()}};
$('button',tm).onclick=()=>term(false);

/* ---- Shortcut global ---- */
addEventListener('keydown',e=>{const typing=/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()=='k'){e.preventDefault();pOpen(!pal.classList.contains('open'))}
 else if(e.key=='Escape'){pOpen(false);term(false)}
 else if(!typing&&e.key=='`'){e.preventDefault();term(!tm.classList.contains('open'))}
 else if(!typing&&e.key=='/'){e.preventDefault();pOpen(true)}});

/* ---- Titik navigasi samping ---- */
const dots=document.createElement('nav');dots.id='xd';dots.setAttribute('aria-label','Navigasi bagian');
dots.innerHTML=SEC.map(([id,l])=>`<a href="#${id}" data-id="${id}" aria-label="${l}"><span>${l}</span></a>`).join('');
document.body.append(dots);
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&$$('a',dots).forEach(a=>a.classList.toggle('on',a.dataset.id==e.target.id))),{rootMargin:'-45% 0px -50% 0px'});
SEC.forEach(([id])=>{const s=document.getElementById(id);s&&io.observe(s)});

/* ---- Jam WIB + tombol palette ---- */
const ck=document.createElement('button');ck.id='xc';ck.title='Buka command palette';ck.innerHTML='<i></i><span></span><kbd>Ctrl K</kbd>';
ck.onclick=()=>pOpen(true);document.body.append(ck);
const tick=()=>{$('span',ck).textContent=new Date().toLocaleTimeString('id-ID',{timeZone:'Asia/Jakarta',hour12:false}).replace(/\./g,':')+' WIB'};tick();setInterval(tick,1000);

/* ---- Spotlight kartu ---- */
document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.project-card,.skill-card');if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')});

/* ---- Tombol magnetik ---- */
if(matchMedia('(pointer:fine)').matches)$$('.btn-primary,.btn-secondary,.btn-contact-pill').forEach(b=>{
 b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.translate=`${(e.clientX-r.left-r.width/2)*.25}px ${(e.clientY-r.top-r.height/2)*.35}px`});
 b.addEventListener('pointerleave',()=>{b.style.translate=''})});

/* ---- Scramble teks menu ---- */
const CH='!<>-_\\/[]{}—=+*^?#01';
$$('.nav-link').forEach(a=>a.addEventListener('mouseenter',()=>{if(!a._r)a.dataset.o=a.textContent;a._r=1;const t=a.dataset.o;let n=0;clearInterval(a._t);
 a._t=setInterval(()=>{a.textContent=[...t].map((c,i)=>i<n||c==' '?c:CH[Math.random()*CH.length|0]).join('');if(++n>t.length){clearInterval(a._t);a.textContent=t;a._r=0}},35)}));
})();
