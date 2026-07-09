const isMobile = window.matchMedia('(hover: none)').matches;

// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
    document.body.classList.remove('loading');
    // trigger hero reveals after loader
    document.querySelectorAll('.hero .clip-reveal, .hero-title .clip-reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 1800);
});

// ── CURSOR ──
if (!isMobile) {
  const cur = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .service-card, .card-3d').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cur.classList.remove('hovered'));
  });
}

// ── PARTICLES ──
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [], W, H;

function resizeCanvas() {
  W = canvas.width = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); }, { passive: true });

function initParticles() {
  particles = [];
  const count = Math.floor((W * H) / (isMobile ? 18000 : 12000));
  for (let i = 0; i < count; i++) {
    particles.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-0.5)*0.25, vy: (Math.random()-0.5)*0.25, r: Math.random()*1.4+0.3, o: Math.random()*0.45+0.1 });
  }
}
initParticles();

let mouse = { x: -9999, y: -9999 };
if (!isMobile) document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    if (!isMobile) { const d = Math.hypot(mouse.x-p.x, mouse.y-p.y); if (d < 100) { p.x -= (mouse.x-p.x)*0.015; p.y -= (mouse.y-p.y)*0.015; } }
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(201,169,110,${p.o})`; ctx.fill();
  });
  if (!isMobile) {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const d = Math.hypot(particles[i].x-particles[j].x, particles[i].y-particles[j].y);
        if (d < 90) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(201,169,110,${0.1*(1-d/90)})`; ctx.lineWidth = 0.4; ctx.stroke(); }
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();


// ── CARD ──
const card = document.getElementById('card3d');
const cardHint = document.getElementById('cardHint');
let isFlipped = false;
let lastFlip = 0;
let touchMoved = false;

function doFlip() {
  const now = Date.now();
  if (now - lastFlip < 700) return;
  lastFlip = now;
  isFlipped = !isFlipped;
  card.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
  cardHint.textContent = isFlipped ? 'geri döndür' : 'tıkla, döndür';
}

card.addEventListener('touchstart', () => { touchMoved = false; }, { passive: true });
card.addEventListener('touchmove', () => { touchMoved = true; }, { passive: true });
card.addEventListener('touchend', e => { if (touchMoved) return; e.preventDefault(); doFlip(); });
card.addEventListener('click', () => { if (isMobile) return; doFlip(); });

if (!isMobile) {
  document.addEventListener('mousemove', e => {
    if (isFlipped) return;
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width/2, cy = r.top + r.height/2;
    const dist = Math.hypot(e.clientX-cx, e.clientY-cy);
    if (dist < 350) {
      const dx = (e.clientX-cx)/(r.width/2), dy = (e.clientY-cy)/(r.height/2);
      card.style.transform = `rotateY(${dx*10}deg) rotateX(${-dy*7}deg)`;
    } else if (!isFlipped) {
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
  }, { passive: true });
}

// ── MAGNETIC BUTTONS ──
if (!isMobile) {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.2}px, ${(e.clientY-r.top-r.height/2)*0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

// ── SERVICE CARD TILT ──
if (!isMobile) {
  document.querySelectorAll('.service-card').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-0.5, y = (e.clientY-r.top)/r.height-0.5;
      c.style.transform = `perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)`;
      c.style.transition = 'background 0.3s, transform 0.08s ease';
    });
    c.addEventListener('mouseleave', () => {
      c.style.transform = '';
      c.style.transition = 'background 0.3s, transform 0.4s ease';
    });
  });
}

// ── CLIP REVEAL (scroll) ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const steps = 60;
  const step = target / steps;
  let lastVal = -1;
  let count = 0;

  const iv = setInterval(() => {
    count++;
    current += step;
    if (count >= steps) { current = target; clearInterval(iv); }
    const val = Math.floor(current);
    if (val === lastVal) return;
    lastVal = val;

    const numStr = String(val);
    el.innerHTML = numStr.split('').map((d, i) =>
      `<span class="stat-digit" style="animation-delay:${i * 0.05}s">${d}</span>`
    ).join('') + `<span>${suffix}</span>`;

    el.querySelectorAll('.stat-digit').forEach(d => {
      d.classList.remove('flip');
      void d.offsetWidth;
      d.classList.add('flip');
    });
  }, 25);
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      // skip hero items — handled by loader
      if (el.closest('.hero')) return;
      setTimeout(() => {
        el.classList.add('visible');
        if (el.dataset.target) animateCounter(el);
      }, i * 80);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.clip-reveal').forEach(el => revealObserver.observe(el));

// ── NAV ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); mobileMenu.classList.toggle('open'); });
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => { hamburger.classList.remove('active'); mobileMenu.classList.remove('open'); }));

// ── PHOTO ──
const img = document.getElementById('aboutImg');
const ph = document.getElementById('photoPlaceholder');
if (img && img.getAttribute('src')) {
  img.onload = () => { img.classList.add('loaded'); if (ph) ph.style.display = 'none'; };
}

// ── ORB PARALLAX ──
if (!isMobile) {
  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', e => {
    const nx = (e.clientX/window.innerWidth-0.5)*2;
    const ny = (e.clientY/window.innerHeight-0.5)*2;
    orbs.forEach((o, i) => { o.style.transform = `translate(${nx*(i+1)*10}px, ${ny*(i+1)*10}px)`; });
  }, { passive: true });
}

// ── COOKIE ──
(function() {
  const banner = document.getElementById('cookieBanner');
  console.log('banner:', banner);
  console.log('consent:', localStorage.getItem('cookieConsent'));
  if (!banner) { console.log('banner yok'); return; }
  if (localStorage.getItem('cookieConsent')) { console.log('consent var'); return; }
  setTimeout(() => { banner.style.display = 'block'; }, 2000);
  document.getElementById('cookieYes').onclick = function() {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.style.display = 'none';
  };
  document.getElementById('cookieNo').onclick = function() {
    localStorage.setItem('cookieConsent', 'declined');
    banner.style.display = 'none';
  };
})();