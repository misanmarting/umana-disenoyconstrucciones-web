# Umaña Diseño y Construcciones — Sitio Web

Sitio web corporativo para **Umaña Diseño y Construcciones E.I.R.L.**
Desarrollado por SM Growth · Abril 2026

---

## Estructura

```
01_SITIO_WEB/
├── index.html              ← Sitio completo (archivo único)
├── css/
│   ├── styles.css          ← Sistema de diseño base
│   ├── styles-white.css    ← Tema dark premium (importa styles.css)
│   └── animations.css      ← Keyframes y scroll reveal
├── js/
│   ├── main.js             ← Nav, menú móvil, portafolio, FAQ, formulario WhatsApp
│   └── animations.js       ← IntersectionObserver con stagger
├── assets/
│   ├── img/
│   │   ├── lozano/         ← Fotos Proyecto Lozano
│   │   ├── smith/          ← Fotos Proyecto Smith
│   │   └── tonkman/        ← Fotos Proyecto Tonkman
│   └── og-image/           ← og-image.jpg (1200×630) + plantilla
├── vercel.json             ← Headers de seguridad + cache
├── .gitignore
├── PROJECT_CONTEXT.md      ← Datos cliente e historial de decisiones (interno)
└── README.md               ← Este archivo
```

---

## Ver en local

```bash
python3 -m http.server 8888
# Abrir: http://localhost:8888
```

---

## Deploy en Vercel

```bash
npm i -g vercel
vercel --prod
```

O conectar el repositorio GitHub en vercel.com/new.

---

## Actualizar contenido

Todo el contenido está en `index.html`.

**Cambiar número de teléfono:**
Buscar `56984844719` — reemplazar en todas las ocurrencias (aparece ~6 veces).

**Agregar proyecto al portafolio:**
Copiar un bloque `<article class="pcard pcard--gallery">` y actualizar:
- `data-title`, `data-meta`
- `src` de la imagen principal en `<img class="pcard__ph pcard__ph--main">`
- Botones `<button class="pcard__thumb" data-img="...">` con las fotos de la galería
- Textos de `<h3>` y `<p>` dentro de `pcard__info`

**Agregar testimonio:**
Copiar un bloque `<div class="atest-card">` dentro de `#atestTrack` y agregar el dot correspondiente en `#atestNav`.

**Agregar imagen de proyecto:**
Fotos en `assets/img/[proyecto]/`. Formato JPG, máximo 500KB, mínimo 800×600px.

---

## Stack técnico

- HTML5 semántico + CSS custom properties + JavaScript vanilla ES6+
- Google Fonts: Space Grotesk
- GSAP 3.12 (CDN, solo animaciones opcionales)
- Sin frameworks, sin dependencias npm
- Deploy: Vercel (estático, sin backend)

---

## Canales de marketing

1. **Google Business Profile** — Aparecer en búsquedas locales ("constructora Las Condes")
2. **Instagram @construyend0suenos** — Reels antes/después, recorridos de obra
3. **SEO local + FAQ schema** — FAQ Schema ya implementado para Google AI Overviews

---

*SM Growth — Miguel San Martín · mi.sanmarting@gmail.com*
