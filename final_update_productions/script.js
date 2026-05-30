/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger-btn');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');

function toggleMenu() {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  navOverlay.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
}

if (hamburger) {
  hamburger.addEventListener('click', function(e) {
    e.preventDefault();
    toggleMenu();
  });
}
if (navOverlay) {
  navOverlay.addEventListener('click', toggleMenu);
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) toggleMenu();
  });
});

/* ── REVEAL ON SCROLL ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { 
      e.target.classList.add('visible'); 
      obs.unobserve(e.target); 
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ── INLINE REEL PLAYER ── */
function stopCard(card) {
  const iframe = card.querySelector('.reel-iframe');
  iframe.src = '';
  card.classList.remove('playing');
}

document.querySelectorAll('.reel-card').forEach(card => {
  const iframe  = card.querySelector('.reel-iframe');
  const stopBtn = card.querySelector('.reel-stop-btn');
  const ytId    = card.dataset.yt;

  card.addEventListener('click', e => {
    if (e.target.closest('.reel-stop-btn')) return;
    if (card.classList.contains('playing')) return;
    document.querySelectorAll('.reel-card.playing').forEach(other => stopCard(other));
    card.classList.add('playing');
    iframe.src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
  });

  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { 
      e.preventDefault(); 
      card.click(); 
    }
  });

  if (stopBtn) {
    stopBtn.addEventListener('click', e => {
      e.stopPropagation();
      stopCard(card);
    });
  }
});