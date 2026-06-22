// ==========================================
// REC - MAIN JAVASCRIPT
// ==========================================

// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('page-loader')?.classList.add('hide');
  }, 1800);
});

// ── CUSTOM CURSOR ──
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateCursor() {
  outlineX += (mouseX - outlineX) * 0.12;
  outlineY += (mouseY - outlineY) * 0.12;
  if (outline) {
    outline.style.left = outlineX + 'px';
    outline.style.top = outlineY + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, [role="button"]').forEach(el => {
  el.addEventListener('mouseenter', () => { if (outline) outline.style.width = '60px'; if (outline) outline.style.height = '60px'; });
  el.addEventListener('mouseleave', () => { if (outline) outline.style.width = '40px'; if (outline) outline.style.height = '40px'; });
});

// ── AOS INIT ──
AOS.init({ duration: 900, once: true, offset: 80, easing: 'ease-out-quart' });

// ── NAVBAR SCROLL ──
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── PARTICLES (Hero) ──
function createParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 8 + 3;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 15 + 8}s;
      animation-delay:${Math.random() * 10}s;
      opacity:${Math.random() * 0.6 + 0.1};
    `;
    container.appendChild(p);
  }
}
createParticles();

// ── COUNTUP ANIMATION ──
function animateCountUp(el, target, suffix = '', decimals = 0) {
  const duration = 2500;
  const start = performance.now();
  const startVal = 0;

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = startVal + (target - startVal) * eased;
    el.textContent = (decimals > 0 ? current.toFixed(decimals) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals || 0);
      animateCountUp(el, target, suffix, decimals);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('[data-count]').forEach(el => {
  el.dataset.target = el.dataset.count;
  el.textContent = '0' + (el.dataset.suffix || '');
  counterObserver.observe(el);
});

// ── SWIPER LIFE ──
if (document.querySelector('.swiper-life')) {
  new Swiper('.swiper-life', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
    }
  });
}

// ── CHATBOT ──
let chatStep = 'getName';
let userData = { name: '', email: '', phone: '' };
const conversationHistory = [];

function toggleChat() {
  const panel = document.getElementById('chatPanel');
  if (panel) panel.classList.toggle('open');
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

function addMessage(text, sender) {
  const body = document.getElementById('chatBody');
  const div = document.createElement('div');
  div.className = `chat-message ${sender}`;
  div.innerHTML = `<div class="msg-bubble">${text}</div>`;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function showTyping() {
  const body = document.getElementById('chatBody');
  const div = document.createElement('div');
  div.className = 'chat-message bot typing-wrap';
  div.innerHTML = `<div class="msg-bubble typing-indicator"><span></span><span></span><span></span></div>`;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
  return div;
}

async function sendMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  addMessage(msg, 'user');

  const typing = showTyping();

  if (chatStep === 'getName') {
    userData.name = msg;
    chatStep = 'getEmail';
    setTimeout(() => {
      typing.remove();
      addMessage(`Nice to meet you, <strong>${msg}</strong>! 😊<br>Could you share your <strong>email address</strong>?`, 'bot');
    }, 800);
    return;
  }

  if (chatStep === 'getEmail') {
    if (!msg.includes('@')) {
      setTimeout(() => { typing.remove(); addMessage('⚠️ Please enter a valid email address.', 'bot'); }, 600);
      return;
    }
    userData.email = msg;
    chatStep = 'getPhone';
    setTimeout(() => {
      typing.remove();
      addMessage(`Got it! 📧<br>Last step — what's your <strong>phone number</strong>?`, 'bot');
    }, 800);
    return;
  }

  if (chatStep === 'getPhone') {
    userData.phone = msg;
    chatStep = 'chat';
    // Save to Excel
    try {
      await fetch('/save_lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
    } catch (e) {}

    setTimeout(() => {
      typing.remove();
      addMessage(`🎉 Welcome, <strong>${userData.name}</strong>!<br><br>I'm <strong>REC Pedia</strong>, your personal college assistant. Ask me anything about:<br><br>📚 Courses &amp; Admissions<br>💼 Placements &amp; Packages<br>🏠 Hostel &amp; Facilities<br>⚽ Sports &amp; Events<br>🏆 NAAC &amp; Rankings<br><br>What would you like to know?`, 'bot');
    }, 1000);
    return;
  }

  // Chat mode
  try {
    const response = await fetch('/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg, step: chatStep })
    });
    const data = await response.json();
    setTimeout(() => {
      typing.remove();
      addMessage(data.reply, 'bot');
    }, 1000);
  } catch (e) {
    typing.remove();
    addMessage('Sorry, something went wrong. Please try again!', 'bot');
  }
}

// ── GSAP HERO ANIMATIONS ──
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-badge', { opacity: 0, y: 30, duration: 1, delay: 2 });
  gsap.from('.hero-headline', { opacity: 0, y: 50, duration: 1.2, delay: 2.2 });
  gsap.from('.hero-headline-sub', { opacity: 0, y: 30, duration: 1, delay: 2.5 });
  gsap.from('.hero-desc', { opacity: 0, y: 30, duration: 1, delay: 2.7 });
  gsap.from('.hero-actions', { opacity: 0, y: 30, duration: 1, delay: 2.9 });
  gsap.from('.hero-stats', { opacity: 0, y: 30, duration: 1, delay: 3.1 });
  gsap.from('.hero-card-stack', { opacity: 0, x: 60, duration: 1.2, delay: 2.4, ease: 'power3.out' });

  // Parallax
  gsap.to('.hero-orb-1', {
    scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 },
    y: -200, x: 100
  });
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── TOUR 360 ──
function loadTour(videoSrc, btn) {
  const viewer = document.getElementById('tourVideo');
  if (viewer) {
    viewer.src = videoSrc;
    viewer.load();
    viewer.play();
  }
  document.querySelectorAll('.tour-nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

// ── SCROLL PROGRESS BAR ──
function updateScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    const scroll = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scroll + '%';
  }
}
window.addEventListener('scroll', updateScrollProgress);

// ══════════════════════════════════════
// ADDITIONAL JS ENHANCEMENTS
// ══════════════════════════════════════

// ── BACK TO TOP ──
(function() {
  const btn = document.createElement('div');
  btn.id = 'backToTop';
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  btn.title = 'Back to top';
  document.body.appendChild(btn);
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
})();

// ── ACTIVE NAV LINK ──
(function() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === path || (path === '/' && href.endsWith('/')))) {
      link.classList.add('active-page');
    }
  });
})();

// ── STAGGER OBSERVER ──
const staggerObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('staggered');
      staggerObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('[data-stagger]').forEach(el => staggerObs.observe(el));

// ── SKILL BARS ──
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width || '0%';
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-bar-wrap').forEach(el => skillObs.observe(el.parentElement));

// ── QUICK REPLY CHATBOT ──
function sendQuickReply(text) {
  document.getElementById('chatInput').value = text;
  sendMessage();
}

function addQuickReplies(replies) {
  const body = document.getElementById('chatBody');
  const div = document.createElement('div');
  div.className = 'chat-message bot';
  div.innerHTML = `
    <div class="quick-replies">
      ${replies.map(r => `<button class="quick-reply-btn" onclick="sendQuickReply('${r}')">${r}</button>`).join('')}
    </div>`;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

// Inject quick replies after chatbot intro
const origSend = window.sendMessage;
window.sendMessage = async function() {
  await origSend();
  // Add quick replies after the intro message
  const body = document.getElementById('chatBody');
  if (body.querySelectorAll('.chat-message').length === 5) {
    setTimeout(() => {
      addQuickReplies(['Admission Info', 'Placement Stats', 'Fee Structure', 'Hostel', 'NAAC Grade']);
    }, 1200);
  }
};

// ── MAGNETIC BUTTONS ──
document.querySelectorAll('.btn-hero-primary, .btn-rec-primary').forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.03)`;
  });
  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ── TILT CARDS ──
document.querySelectorAll('.placement-card, .event-card, .rec-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    this.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`;
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.transition = 'transform 0.5s ease';
  });
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'transform 0.1s ease';
  });
});

// ── LAZY LOAD VIDEOS ──
document.querySelectorAll('video[data-lazy]').forEach(video => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        video.load();
        obs.unobserve(video);
      }
    });
  });
  obs.observe(video);
});

// ── TYPEWRITER EFFECT (Hero Sub) ──
(function() {
  const el = document.querySelector('.hero-headline-sub');
  if (!el) return;
  const texts = [
    'From Classroom to Career...',
    'Innovation That Transforms...',
    'Engineers Who Lead...',
    'Excellence Since 1997...'
  ];
  let i = 0, j = 0, deleting = false;
  function type() {
    const current = texts[i];
    if (!deleting) {
      el.textContent = current.substring(0, j++);
      if (j > current.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      el.textContent = current.substring(0, j--);
      if (j < 0) { deleting = false; i = (i + 1) % texts.length; j = 0; }
    }
    setTimeout(type, deleting ? 40 : 80);
  }
  setTimeout(type, 3500);
})();

// ── SMOOTH IMAGE LOAD ──
document.querySelectorAll('img').forEach(img => {
  img.style.transition = 'opacity 0.4s ease';
  if (!img.complete) {
    img.style.opacity = '0';
    img.addEventListener('load', () => { img.style.opacity = '1'; });
  }
});

// ── EASTER EGG (Konami code) ──
let konami = [], code = [38,38,40,40,37,39,37,39,66,65];
document.addEventListener('keydown', e => {
  konami.push(e.keyCode);
  if (konami.length > 10) konami.shift();
  if (JSON.stringify(konami) === JSON.stringify(code)) {
    document.body.style.animation = 'gradient-shift 1s ease infinite';
    document.querySelector('.hero-headline')?.classList.add('animated-gradient-text');
    setTimeout(() => { document.body.style.animation = ''; }, 5000);
  }
});

// ── ANALYTICS PLACEHOLDERS ── (Replace with real GA ID)
// window.gtag && gtag('config', 'G-XXXXXXXXXX');

console.log('%c🎓 REC — Rajalakshmi Engineering College', 
  'color:#F59E0B;font-size:1.2rem;font-weight:bold;font-family:serif');
console.log('%cBuilt with ❤️ by REC Tech Team', 
  'color:#9333EA;font-size:.9rem');
