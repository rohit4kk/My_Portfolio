const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const progress = document.getElementById('progress');
const pipeline = document.querySelector('.pipeline');
const heroHole = document.getElementById('heroHole');
const heroContent = document.getElementById('heroContent');

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// All scroll work is transform/opacity only, batched into one frame.
let ticking = false;
function onFrame() {
  ticking = false;
  const y = window.scrollY;
  const vh = window.innerHeight;
  const max = document.documentElement.scrollHeight - vh;

  nav.classList.toggle('scrolled', y > 40);
  pipeline.classList.toggle('show', y > vh * 0.7);
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

  if (!reduceMotion && y <= vh) {
    const t = y / vh;
    heroHole.style.transform = `scale(${1 + t * 1.6})`;
    heroHole.style.opacity = 1 - t * 1.1;
    heroContent.style.transform = `translateY(${t * -90}px)`;
    heroContent.style.opacity = 1 - t * 1.7;
  }
}
window.addEventListener('scroll', () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(onFrame);
  }
}, { passive: true });
onFrame();

// Videos load on first approach and only decode while on screen.
const videoObserver = new IntersectionObserver(entries => {
  entries.forEach(({ target: video, isIntersecting }) => {
    if (isIntersecting) {
      if (!video.src) video.src = video.dataset.video;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}, { rootMargin: '150px' });

if (!reduceMotion) {
  document.querySelectorAll('video[data-video]').forEach(video => videoObserver.observe(video));
}

function countUp(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const start = performance.now();
  const step = now => {
    const t = Math.min((now - start) / 1100, 1);
    el.textContent = Math.round(target * (1 - (1 - t) ** 3)) + suffix;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    if (!isIntersecting) return;
    target.classList.add('in');
    revealObserver.unobserve(target);
    if (!reduceMotion) target.querySelectorAll('[data-count]').forEach(countUp);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Highlights the matching nav link and pipeline stage for the section in view.
const stageObserver = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    if (!isIntersecting) return;
    const stage = target.dataset.stage;
    pipeline.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.dataset.stage === stage));
    document.querySelectorAll('#navLinks a').forEach(a => a.classList.toggle('active', a.hash === `#${target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('[data-stage]').forEach(section => stageObserver.observe(section));

if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('[data-tilt]').forEach(frame => {
    frame.addEventListener('pointermove', e => {
      const box = frame.getBoundingClientRect();
      const x = (e.clientX - box.left) / box.width - 0.5;
      const y = (e.clientY - box.top) / box.height - 0.5;
      frame.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${y * -7}deg)`;
    });
    frame.addEventListener('pointerleave', () => { frame.style.transform = ''; });
  });
}

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const subject = `Portfolio message from ${form.name.value}`;
  const body = `${form.message.value}\n\n${form.name.value}\n${form.email.value}`;
  window.location.href = `mailto:rohitverma98999@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
