// Navbar scroll + mobile menu
const nav = document.getElementById('nav');
const menu = document.getElementById('menu');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));
document.getElementById('burger').addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Scroll reveal for section content
const revealEls = document.querySelectorAll('.board li, .member, .g-grid figure, .about .wrap, .videoSec .wrap, .contact .wrap');
revealEls.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Counter animation
const counters = document.querySelectorAll('[data-count]');
const co = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count;
    let n = 0; const step = Math.max(1, Math.ceil(end / 80));
    const t = setInterval(() => { n = Math.min(end, n + step); el.textContent = n + '+'; if (n >= end) clearInterval(t); }, 20);
    co.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(c => co.observe(c));

// Custom play button for video section
const video = document.getElementById('mainVideo');
const playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', () => { video.play(); playBtn.classList.add('hide'); });
video.addEventListener('pause', () => { if (video.currentTime < video.duration) playBtn.classList.remove('hide'); });
video.addEventListener('play', () => playBtn.classList.add('hide'));

// Review slider
const slides = document.querySelectorAll('.slide');
const dotsBox = document.getElementById('dots');
let cur = 0, timer;
slides.forEach((_, i) => {
  const d = document.createElement('span');
  d.addEventListener('click', () => { show(i); restart(); });
  dotsBox.appendChild(d);
});
function show(i) {
  cur = i;
  slides.forEach((s, k) => s.classList.toggle('active', k === i));
  dotsBox.querySelectorAll('span').forEach((d, k) => d.classList.toggle('on', k === i));
}
function restart() { clearInterval(timer); timer = setInterval(() => show((cur + 1) % slides.length), 4500); }
show(0); restart();

// Booking form
const dateInput = document.getElementById('date');
dateInput.min = new Date().toISOString().split('T')[0];
document.getElementById('bookForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const service = document.getElementById('service').value;
  document.getElementById('msg').textContent = `Thank you, ${name}! Your ${service} booking is received. We will call you shortly.`;
  e.target.reset();
});

// Fallback if an image fails to load
document.querySelectorAll('img').forEach(img => img.addEventListener('error', () => {
  img.style.background = 'linear-gradient(135deg,#221c17,#12233b)';
  img.style.minHeight = '200px';
}));
