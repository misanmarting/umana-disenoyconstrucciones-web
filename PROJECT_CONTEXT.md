# PROJECT CONTEXT — Construcciones José Luis Umaña E.I.R.L.

> Documento interno SM Growth · Generado: Abril 2026

---

## Datos del cliente

| Campo | Detalle |
|---|---|
| Razón Social | Construcciones Jose Luis Umaña E.I.R.L. |
| RUT | 77.472.675-6 |
| Propietario | José Luis Umaña Soto |
| WhatsApp | +569 84844719 |
| Email | construccionesjoseluisumana@gmail.com |
| Horario | Lunes a Viernes, 08:00 – 18:00 hrs |
| Instagram | @construyend0suenos |

---

## Decisiones de diseño

| Elemento | Decisión |
|---|---|
| **Estilo** | Dark Premium — fondo #0A0A09 con acentos dorados #C9972E |
| **Tipografía** | Space Grotesk (300–700) — Google Fonts |
| **Paleta** | bg: #0A0A09 · primary: #C9972E · text: #EDE9E3 · muted: rgba(237,233,227,.5) |
| **Copy framework** | PAS — Problema (constructoras no materializan la visión) → Agitación → Solución |
| **Hero** | ZoomParallax — imágenes del portafolio con zoom scroll-driven + Column Lines overlay |
| **Portafolio** | Bento grid editorial con numeración decorativa dorada |
| **Testimonios** | Card deck animado con dots, progress bar y auto-rotación cada 6s |
| **Cursor** | Custom dot+ring con lerp en desktop (desactivado en touch) |
| **Schema.org** | HomeAndConstructionBusiness + FAQPage |
| **Formulario** | Sin backend — genera URL wa.me con mensaje pre-llenado |

---

## Estructura de archivos

```
01_SITIO_WEB/
├── index.html              ← Sitio completo (fuente única de verdad)
├── css/
│   ├── styles.css          ← Sistema de diseño base + custom properties
│   ├── styles-white.css    ← Tema dark premium (importa styles.css, override tokens)
│   └── animations.css      ← Scroll reveal, keyframes, prefers-reduced-motion
├── js/
│   ├── main.js             ← Nav, hamburger, portfolio filter, FAQ, formulario WhatsApp
│   └── animations.js       ← IntersectionObserver con stagger 80ms
├── assets/
│   ├── img/
│   │   ├── lozano/         ← 7 imágenes (portafolio + proceso + servicios)
│   │   ├── smith/          ← 10 imágenes (hero, about, portafolio, servicios)
│   │   └── tonkman/        ← 5 imágenes (portafolio)
│   └── og-image/
│       ├── og-image.jpg    ← Imagen social 1200×630px
│       └── og-template.html← Template para regenerar OG image
├── PROJECT_CONTEXT.md      ← Este archivo (interno, no exponer)
├── vercel.json             ← Config deploy + security headers
├── .gitignore
└── README.md
```

---

## Secciones del sitio

1. **Hero** — ZoomParallax scroll-driven con 7 capas de imágenes del portafolio + Column Lines overlay
2. **Nosotros** — 10 años, cita fundador, stats (2014 / 9+ proyectos / 100% garantía), foto principal
3. **Portafolio** — 3 proyectos reales en grid bento (Lozano, Tonkman, Smith) con lightbox de galería
4. **Servicios** — Carousel sticky scroll: Residencias nuevas / Diseño integral / Ampliaciones
5. **Proceso** — 4 tarjetas: Visita gratuita → Propuesta → Ejecución → Entrega certificada
6. **Testimonios** — Card deck animado: 5 testimonios (Lozano, Tokman, Smith, Zurita, Atalaya)
7. **FAQ** — 6 preguntas acordeón (Schema.org FAQPage implementado)
8. **Contacto** — Formulario con 6 campos → mensaje WhatsApp pre-llenado
9. **Footer** — Logo, navegación, CTA, Instagram
10. **WhatsApp flotante** — Botón fijo esquina inferior derecha

---

## Formulario → WhatsApp

El formulario de contacto NO usa backend. Al hacer submit:
1. Recoge nombre, teléfono, email, comuna y mensaje
2. Construye un mensaje formateado con todos los datos
3. Abre `https://wa.me/56984844719?text=[mensaje_codificado]` en nueva pestaña
4. El usuario solo debe pulsar "Enviar" en WhatsApp

---

## Imágenes pendientes

Los proyectos del portafolio actualmente muestran placeholders visuales.
Para reemplazarlos con fotos reales:

1. Agregar la imagen en `/assets/[nombre-proyecto].jpg`
2. En cada `.project-card`, reemplazar el `<div class="project-card__placeholder">` por:
   ```html
   <img src="assets/nombre-proyecto.jpg" 
        alt="Descripción específica del proyecto" 
        loading="lazy"
        style="width:100%;height:100%;object-fit:cover;">
   ```

**Recomendación de imágenes:**
- Formato: JPG, máximo 500KB por imagen
- Dimensiones: mínimo 800×600px, ratio 4:3 ideal
- Para project-card--tall: ratio 3:4 vertical
- Alt text: descriptivo y específico (ejemplo: "Casa moderna de dos pisos con jardín en Las Condes, Proyecto Lozano")

---

## Cómo ver en local

```bash
cd "/Users/macbook/Desktop/SM Growth/Clientes /CONSTRUCTORA JOSE LUIS/01_SITIO_WEB"
python3 -m http.server 8888
# Abrir: http://localhost:8888
```

---

## Cómo deployar en Vercel

```bash
vercel --prod
# O conectar el repositorio GitHub en vercel.com/new
```

---

## Próximos pasos de marketing

### Canal 1 — Google Business Profile (impacto inmediato)

**Por qué funciona:** El 46% de las búsquedas de Google tienen intención local. Una constructora en Las Condes/Vitacura aparece cuando alguien busca "constructora cerca de mí" o "construir casa [comuna]". Las reseñas de Google son el factor de confianza #1 para este segmento.

**Acciones:**
- Crear/reclamar perfil en Google Business Profile
- Subir fotos de proyectos (antes/después)
- Solicitar reseñas a clientes de los 6 proyectos residenciales
- Publicar actualizaciones semanales con fotos de obra

### Canal 2 — Instagram (@construyend0suenos) — contenido orgánico

**Por qué funciona:** El público de Las Condes, Vitacura y Barnechea es muy activo en Instagram. El contenido de construcción (timelapse de obra, antes/después, materiales, team) genera alto engagement y es la mejor vitrina para proyectos premium.

**Contenido sugerido (del paquete SM Growth):**
- 3 carruseles educativos: "5 errores al construir tu casa", "¿Cómo elegir materiales?", "Proceso de construcción paso a paso"
- Reels antes/después de cada proyecto
- Historias: recorridos de obra en proceso
- Presentación del equipo con cara a los trabajadores

### Canal 3 — SEO local + FAQ schema (largo plazo)

**Por qué funciona:** Las búsquedas informacionales ("¿cuánto cuesta construir una casa?", "constructora Las Condes") tienen alta intención de compra. El FAQ schema implementado en la web ya está listo para aparecer en Google AI Overviews y featured snippets.

**Acciones:**
- Publicar artículos mensuales: "Guía completa para construir en Las Condes 2025", "¿Cuánto cuesta construir 150m2 en Santiago?"
- Obtener links de directorios de construcción chilenos
- Solicitar menciones en portales inmobiliarios (Portal Inmobiliario, TocToc)

---

## Notas técnicas

- **Sin backend** — formulario funciona 100% vía WhatsApp (`wa.me/56984844719?text=...`)
- **Sin CMS** — editar directamente `index.html`
- **Fuentes** — Space Grotesk via Google Fonts con `preconnect`
- **GSAP** — cargado via CDN solo para animaciones opcionales (no crítico)
- **SEO** — Schema.org HomeAndConstructionBusiness + FAQPage + meta OG implementados
- **Accesibilidad** — `prefers-reduced-motion` respetado, `aria-label` en interactivos, cursor custom desactivado en touch
- **Imagen faltante** — `assets/img/smith/proceso-entrega.jpg` no existe; se usa `portafolio-6.jpg` como reemplazo temporal

## Próximo paso: Backend

Conectar formulario a backend real (Email/CRM) en paralelo al WhatsApp actual:
- Opción A: Formspree / EmailJS (sin servidor)
- Opción B: Supabase edge function → email + registro en DB
- Los campos del formulario ya están listos: nombre, telefono, email, tipo, presupuesto, zona, mensaje

---

*Actualizar este documento conforme avance el proyecto.*
