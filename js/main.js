/* ════════════════════════════════════════════════════
   JL CONSTRUCCIONES — main.js
   Vanilla ES6+ · No dependencies · GPU-first
   ════════════════════════════════════════════════════ */

'use strict';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ── NAVBAR SCROLL ── */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
      ticking = false;
    });
  }, { passive: true });
})();


/* ── HAMBURGER / MOBILE MENU ── */
(function () {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  function toggle(open) {
    btn.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  btn.addEventListener('click', () => toggle(!btn.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
  document.addEventListener('click', e => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !btn.contains(e.target))
      toggle(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) { toggle(false); btn.focus(); }
  });
})();


/* ── PORTFOLIO FILTER ── */
(function () {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.pcard');
  if (!btns.length || !cards.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      btns.forEach(b => { b.classList.remove('filter-btn--active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('filter-btn--active');
      btn.setAttribute('aria-selected', 'true');

      cards.forEach(card => {
        const match = f === 'all' || card.dataset.category === f;
        if (match) {
          card.classList.remove('hiding', 'hidden');
          card.classList.add('showing');
          setTimeout(() => card.classList.remove('showing'), 500);
        } else {
          card.classList.add('hiding');
          setTimeout(() => { card.classList.add('hidden'); card.classList.remove('hiding'); }, 300);
        }
      });
    });
  });
})();


/* ── FAQ ACCORDION ── */
(function () {
  document.querySelectorAll('.faq__item').forEach(item => {
    const q = item.querySelector('.faq__q');
    if (!q) return;
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq__item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
      });
      if (!open) { item.classList.add('open'); q.setAttribute('aria-expanded', 'true'); }
    });
  });
})();


/* ── CONTACT FORM → WHATSAPP ── */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const submitBtn = form.querySelector('.cform__submit, .cform2__submit');
  const WA = '56984844719';

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nombre   = (form['nombre']?.value || '').trim();
    const telefono = (form['telefono']?.value || '').trim();
    const mensaje  = (form['mensaje']?.value || '').trim();
    const email    = (form['email']?.value || '').trim() || 'No indicado';
    const tipo     = form['tipo']?.value || 'No indicado';
    const presup   = form['presupuesto']?.value || 'No indicado';
    const comuna   = form['zona']?.value || 'No indicada';

    let valid = true;
    const requiredFields = [
      { name: 'nombre',   val: nombre },
      { name: 'telefono', val: telefono },
      { name: 'mensaje',  val: mensaje },
    ];
    requiredFields.forEach(({ name, val }) => {
      const el = form.querySelector(`[name="${name}"]`);
      if (!val && el) {
        el.style.borderColor = '#EF4444';
        el.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.12)';
        el.addEventListener('input', () => { el.style.borderColor = ''; el.style.boxShadow = ''; }, { once: true });
        valid = false;
      }
    });
    if (!valid) return;

    const waMessage = [
      `Hola, me interesa cotizar un proyecto de construcción.`,
      ``,
      `*Nombre:* ${nombre}`,
      `*Teléfono:* ${telefono}`,
      `*Email:* ${email}`,
      `*Tipo de proyecto:* ${tipo}`,
      `*Presupuesto estimado:* ${presup}`,
      `*Comuna:* ${comuna}`,
      ``,
      `*Descripción del proyecto:*`,
      mensaje,
    ].join('\n');

    if (submitBtn) submitBtn.classList.add('btn--loading');

    setTimeout(() => {
      window.open(`https://wa.me/${WA}?text=${encodeURIComponent(waMessage)}`, '_blank', 'noopener,noreferrer');
      if (submitBtn) submitBtn.classList.remove('btn--loading');

      form.innerHTML = `
        <div style="text-align:center;padding:56px 24px;">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="1.5" style="margin:0 auto 20px" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <h3 style="font-size:1.3rem;color:#1A1512;margin-bottom:10px;font-family:'Space Grotesk',sans-serif;letter-spacing:-0.02em;">Consulta enviada</h3>
          <p style="color:#5A5550;font-size:0.9rem;line-height:1.7;max-width:320px;margin:0 auto;">Se abrió WhatsApp con tu mensaje. Respondemos en horario hábil, de lunes a viernes de 08:00 a 18:00.</p>
        </div>
      `;
    }, 700);
  });
})();


/* ── SERVICIOS — scroll-pinned, con RAF gate ── */
(function () {
  const section = document.querySelector('.services');
  const items   = document.querySelectorAll('.svc-item');
  const images  = document.querySelectorAll('.svc-img');
  const current = document.querySelector('.svc-panel__current');
  const bar     = document.querySelector('.svc-panel__bar');
  if (!section || !items.length) return;

  const total = items.length;
  let activeIdx = -1;

  function activate(idx) {
    idx = Math.max(0, Math.min(total - 1, idx));
    if (idx === activeIdx) return;
    activeIdx = idx;
    items.forEach((item, i) => item.classList.toggle('is-active', i === idx));
    images.forEach((img, i) => img.classList.toggle('active', i === idx));
    if (current) current.textContent = String(idx + 1).padStart(2, '0');
    if (bar) bar.style.width = ((idx + 1) / total * 100) + '%';
  }

  const mq = window.matchMedia('(min-width: 961px)');
  let vh = window.innerHeight;
  let rafSvc = null;

  function computeActive() {
    if (!mq.matches) return;
    const rect = section.getBoundingClientRect();
    const scrolledIn = -rect.top;
    const scrollUnit = vh * 0.5;
    activate(Math.floor(scrolledIn / scrollUnit));
    const isPinned = scrolledIn >= 0 && scrolledIn < total * scrollUnit;
    section.classList.toggle('is-pinned', isPinned);
  }

  function onScroll() {
    if (rafSvc) return;
    rafSvc = requestAnimationFrame(() => {
      rafSvc = null;
      computeActive();
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { vh = window.innerHeight; computeActive(); }, { passive: true });
  computeActive();

  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      if (mq.matches) activate(i);
    });
  });

  activate(0);

  const svcPrev = document.getElementById('svcPrev');
  const svcNext = document.getElementById('svcNext');
  if (svcPrev) svcPrev.addEventListener('click', () => activate(Math.max(0, activeIdx - 1)));
  if (svcNext) svcNext.addEventListener('click', () => activate(Math.min(total - 1, activeIdx + 1)));
})();


/* ── SMOOTH SCROLL ── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = (document.getElementById('navbar')?.offsetHeight || 70) + 20;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
})();


/* ── ACTIVE NAV LINK ── */
(function () {
  const sections = document.querySelectorAll('main section[id]');
  const links    = document.querySelectorAll('.nav__link');
  if (!sections.length || !links.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        links.forEach(l => {
          if (l.getAttribute('href') === `#${en.target.id}`) {
            l.classList.add('nav__link--active');
          } else {
            l.classList.remove('nav__link--active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
})();


/* ── TESTIMONIALS — CSS marquee, no JS needed ── */


/* ── PORTFOLIO GALLERY THUMBS ── */
(function () {
  document.querySelectorAll('.pcard--gallery .pcard__thumb').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const card = btn.closest('.pcard--gallery');
      const main = card && card.querySelector('.pcard__ph--main');
      if (!main) return;
      const src = btn.dataset.img;
      if (!src) return;
      main.src = src;
      card.querySelectorAll('.pcard__thumb').forEach(function (t) {
        t.classList.toggle('pcard__thumb--active', t === btn);
      });
    });
  });
})();


/* ── LIGHTBOX — Gallery ── */
(function () {
  const lightbox   = document.getElementById('lightbox');
  const closeBtn   = document.getElementById('lightboxClose');
  const backdrop   = document.getElementById('lightboxBackdrop');
  const media      = document.getElementById('lightboxMedia');
  const typeEl     = document.getElementById('lightboxType');
  const titleEl    = document.getElementById('lightboxTitle');
  const metaEl     = document.getElementById('lightboxMeta');
  const prevBtn    = document.getElementById('lightboxPrev');
  const nextBtn    = document.getElementById('lightboxNext');
  const thumbsEl   = document.getElementById('lightboxGalleryThumbs');
  if (!lightbox) return;

  let galleryImages = [];
  let galleryIdx    = 0;

  function showImage (idx) {
    galleryIdx = ((idx % galleryImages.length) + galleryImages.length) % galleryImages.length;
    const img = document.createElement('img');
    img.src = galleryImages[galleryIdx];
    img.alt = titleEl.textContent || '';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block';
    media.innerHTML = '';
    media.appendChild(img);
    if (thumbsEl) {
      thumbsEl.querySelectorAll('.lightbox__gallery-thumb').forEach((t, i) => {
        t.classList.toggle('lightbox__gallery-thumb--active', i === galleryIdx);
      });
    }
    if (prevBtn) prevBtn.hidden = galleryImages.length <= 1;
    if (nextBtn) nextBtn.hidden = galleryImages.length <= 1;
  }

  const cards = document.querySelectorAll('.pcard');

  cards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', e => {
      if (e.target.closest('.pcard__thumb')) return; // thumb click handled elsewhere

      const title = card.dataset.title || card.querySelector('h3')?.textContent || '';
      const meta  = card.dataset.meta  || card.querySelector('.pcard__info p')?.textContent || '';
      const type  = card.querySelector('.pcard__type')?.textContent || '';

      // Collect gallery images from thumb buttons
      const thumbBtns = card.querySelectorAll('.pcard__thumb[data-img]');
      galleryImages = thumbBtns.length > 0
        ? Array.from(thumbBtns).map(t => t.dataset.img)
        : [];

      // Fallback: main image
      if (!galleryImages.length) {
        const ph = card.querySelector('.pcard__ph--main, .pcard__ph, img');
        if (ph && ph.src) galleryImages = [ph.src];
      }

      // Build thumbnail strip
      if (thumbsEl) {
        thumbsEl.innerHTML = '';
        if (galleryImages.length > 1) {
          galleryImages.forEach((src, i) => {
            const btn = document.createElement('button');
            btn.className = 'lightbox__gallery-thumb';
            btn.setAttribute('aria-label', `Foto ${i + 1}`);
            const tImg = document.createElement('img');
            tImg.src = src; tImg.alt = ''; tImg.loading = 'lazy';
            btn.appendChild(tImg);
            btn.addEventListener('click', ev => { ev.stopPropagation(); showImage(i); });
            thumbsEl.appendChild(btn);
          });
        }
      }

      typeEl.textContent  = type;
      titleEl.textContent = title;
      metaEl.textContent  = meta;

      showImage(0);

      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function close () {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (prevBtn) prevBtn.addEventListener('click', e => { e.stopPropagation(); showImage(galleryIdx - 1); });
  if (nextBtn) nextBtn.addEventListener('click', e => { e.stopPropagation(); showImage(galleryIdx + 1); });

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowLeft')  showImage(galleryIdx - 1);
    if (e.key === 'ArrowRight') showImage(galleryIdx + 1);
  });
})();


/* ── HERO CINEMATIC REVEAL — headline via CSS, sub/ctas via JS ── */
(function () {
  if (REDUCED) return;
  /* h1 (.hero__headline) uses the CSS headlineReveal clip-path animation */
  const sub  = document.querySelector('.hero__sub');
  const ctas = document.querySelector('.hero__ctas');
  if (!sub) return;

  [sub, ctas].forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(30px)';
    el.style.filter    = 'blur(10px)';
    el.style.transition =
      'opacity .9s cubic-bezier(.16,1,.3,1),' +
      'transform .9s cubic-bezier(.16,1,.3,1),' +
      'filter .7s ease';
  });

  requestAnimationFrame(() => requestAnimationFrame(() => {
    sub.style.transitionDelay  = '0.52s';
    ctas.style.transitionDelay = '0.72s';
    [sub, ctas].forEach(el => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
      el.style.filter    = 'blur(0)';
    });
  }));
})();
