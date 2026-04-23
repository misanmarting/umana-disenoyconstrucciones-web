/* ════════════════════════════════════════════════════
   CONSTRUCCIONES JOSÉ LUIS UMAÑA — animations.js
   IntersectionObserver · stagger 80ms
   ════════════════════════════════════════════════════ */

'use strict';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── SCROLL REVEAL (data-reveal) ── */
(function () {
  if (reducedMotion) {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
    return;
  }
  const stagger = 80;
  document.querySelectorAll('section, footer, .metrics-strip, .n3__process').forEach(section => {
    const els = section.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = Array.from(section.querySelectorAll('[data-reveal]'));
        const idx = siblings.indexOf(el);
        const delay = el.dataset.delay != null ? parseInt(el.dataset.delay, 10) : idx * stagger;
        setTimeout(() => el.classList.add('is-visible'), delay);
        io.unobserve(el);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    els.forEach(el => io.observe(el));
  });
})();


/* ── BARRA DE PROGRESO DE SCROLL ── */
(function () {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / total * 100) + '%';
  }, { passive: true });
})();




/* ── PARTÍCULAS FLOTANTES EN HERO ── */
(function () {
  if (reducedMotion) return;
  const media = document.querySelector('.hero__bg-media');
  if (!media) return;
  const container = document.createElement('div');
  container.className = 'hero__particles';
  media.insertBefore(container, media.firstChild);
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size   = Math.random() * 2.5 + 0.8;
    const drift  = (Math.random() - 0.5) * 100;
    p.style.cssText = `
      left:${Math.random() * 100}%;
      top:${80 + Math.random() * 20}%;
      width:${size}px;
      height:${size}px;
      opacity:${Math.random() * 0.5 + 0.1};
      --drift:${drift}px;
      animation-duration:${Math.random() * 14 + 10}s;
      animation-delay:-${Math.random() * 14}s;
    `;
    container.appendChild(p);
  }
})();


/* ── SVG DRAW-IN ANIMATION (elementos decorativos) ── */
(function () {
  if (reducedMotion) return;
  const svgs = document.querySelectorAll('.deco-svg');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('svg-drawn'), 200);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  svgs.forEach(el => io.observe(el));
})();


/* ── COUNTER ANIMATION (números que cuentan al hacer scroll) ── */
(function () {
  if (reducedMotion) return;
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCount(el, target, suffix, duration) {
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const val = Math.floor(easeOutCubic(t) * target);
      el.textContent = val + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.dataset.count;
      const suffix = el.dataset.suffix || '';
      animateCount(el, parseInt(raw, 10), suffix, 1600);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
})();




/* ── MAGNETIC BUTTONS (CTA principal) ── */
(function () {
  if (reducedMotion || window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.btn--gold.btn--lg').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.1s ease, background 0.2s ease, box-shadow 0.2s ease';
    });
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.2;
      const y = (e.clientY - r.top  - r.height / 2) * 0.3;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease, box-shadow 0.2s ease';
      btn.style.transform  = '';
    });
  });
})();


