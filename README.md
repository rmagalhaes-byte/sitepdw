# PDW Design System

Design system for the **Portuguese Digital Wallet (PDW)** — Portugal's sovereign digital identity wallet, built by **TecMinho** (University of Minho) inside the **Agenda Blockchain.PT** consortium and co-funded by **PRR / NextGenerationEU**.

This system was extracted from the live `pdw-site-v2` Next.js codebase. It captures the institutional, EU-credible, calm-tech visual language already in production so that new pages, decks and prototypes can move out of MVP mode and into a polished, production-grade tier without re-inventing tokens.

---

## What PDW is

> *"The Portuguese Digital Wallet (PDW) is Portugal's sovereign digital wallet — verifiable credentials, EBSI compliance, eIDAS 2.0. Simple, secure, and yours."*

PDW is a **Self-Sovereign Identity (SSI) wallet** that lets citizens receive, store and present verifiable credentials (diplomas, ID, micro-credentials, eventually health and real-estate). It positions itself as the *"Credential Execution Layer"* of Portugal, interoperable with the **European Blockchain Services Infrastructure (EBSI)** and the **EUDI ARF** so a Portuguese diploma can be verified anywhere in the EU.

It is **institutional, not consumer-startup**. The voice is closer to a national infrastructure project than to a fintech app. The audience is split across three pillars:

| Audience | What they care about |
|---|---|
| **Citizens** | Privacy, control of personal data, simple onboarding |
| **Institutions** (universities, employers) | Verifiable issuance, fraud reduction, EBSI compliance |
| **State / EU regulators** | eIDAS 2.0 alignment, EBSI Stage III readiness, paperless impact |

### Products represented

There is currently **one production surface** plus an associated **mobile app**:

1. **Marketing / institutional website** — `pdw-site-v2/` (Next.js 15 App Router, React 19, framer-motion). Sitemap: Home · Sobre · Solução · Casos de Uso · Diplomas Digitais · Contactos · Privacidade · Termos. Bilingual `pt` / `en`. This is what the design system models in `ui_kits/website/`.
2. **PDW mobile app** — referenced in the site (Play Store link, isometric mockup, wallet-flow images). The app itself is **not in this codebase**; only the marketing assets (`wallet-mockup.png`, `Imagem-home.png`, `Imagem-isometrica.png`) are. A UI kit for the app would need source code or Figma to be built faithfully — see *Caveats*.

### Source materials

- **Codebase**: `pdw-site-v2/` (mounted, read-only). Key files read:
  - `src/app/globals.css` — full token & component stylesheet (~1 870 lines)
  - `src/i18n/locales/pt.json` + `en.json` — every string of institutional copy
  - `src/components/sections/*` — Hero, ValuePillars, UseCasesGrid, DiplomaCase, TrustBar, ContactCTA, VideoShowcase, LeadForm
  - `src/components/layout/PdwHeader.tsx` + `PdwFooter.tsx`
  - `src/components/ui/InteractiveSimulator.tsx`, `StatusBadge.tsx`, `ChangelogModal.tsx`
- **Brand docs**: `pdw-site-v2/docs/Bussines.md`, `objetivos.md`, `IMPLEMENTATION_ORDER.md`, `.vide/*.md` (strategy notes)
- **Live URL** referenced in code: `https://pdw.tecminho.uminho.pt` and `https://www.digitalwallet.pt`
- **Partner ecosystem links** (TecMinho, Blockchain.PT, VOID Software, EBSI, U.Minho) — see `assets/` for grayscale partner logos

---

## CONTENT FUNDAMENTALS

PDW writes the way a **public-infrastructure project** writes: confident, declarative, sparing with adjectives, never cute. It is informed by EU policy language (eIDAS, EBSI, EUDI ARF, NextGenerationEU) and tempered with concrete user benefit.

> **Locale: Portuguese (Portugal) — `pt-PT`, never `pt-BR`.** Voice is **formal business**, focused on **institutional credibility**. The reader is addressed as *você* (or impersonally as *o utilizador*), never as *tu*. Conjugations, vocabulary and orthography follow the *Acordo Ortográfico de 1990* as used in Portugal (e.g. *facto* not *fato*, *eletrónica* not *eletrônica*, *casa de banho* not *banheiro*). Quotation marks are **« »** (low double angle / *aspas latinas*); straight `"…"` are an MVP carry-over and should be replaced in new copy.

### Voice & tone

- **Institutional but warm.** Reads like the website of a national agency, not a consumer fintech. No "let's", no exclamation points, no winks.
- **Second-person plural / formal.** PT uses *"você"* / *"o seu / a sua"*; EN uses *"your"*. Never *"tu"*. The wallet belongs to *the citizen*, addressed as a responsible adult.
- **First-person plural for the team.** PT: *"transformamos a validação académica..."*; EN: *"we transform..."*. Conveys consortium presence without naming individuals.
- **Sentence case in body, Title Case sparingly.** Headings mostly Sentence case (PT *"Acesso a serviços digitais sem fricção."*). Capitalisation is reserved for **technical proper nouns** that must be exact: EBSI, eIDAS 2.0, EUDI ARF, PRR, NextGenerationEU, W3C, DID, SSI, KYC.
- **Bilingual parity.** Every string ships PT + EN; the PT is canonical and English is a careful translation, not localisation. The PT voice is slightly more formal than the EN.

### Vibe & rhythm

- **Short, declarative.** Hero subtitle: *"As suas credenciais. Um clique. Qualquer serviço."* — three noun-phrases separated by periods. Use full stops, never ellipses.
- **Concrete benefit pairs with technical claim.** *"Redução de 90% no tempo de espera para verificação."* / *"Eliminação total de fraude documental académica."* — numbers, not hype.
- **EU & sovereignty framing** is core. Words that recur and should be reused: *soberania digital, infraestrutura crítica de confiança, interoperabilidade, privacidade por design, divulgação seletiva, sem fricção, validade transfronteiriça*.
- **Acronyms are explained on first use** in body, abbreviated thereafter. SSI = Identidade Auto-Soberana. VC = Credenciais Verificáveis.

### What to never do

- ❌ No emoji in body copy. The site **does use emoji as section icons in three places only** (use-case cards, ValuePillars, simulator), where they read as bright glyphs against a sober layout — see *Iconography* below. **Do not** add emoji to prose, buttons, or CTAs.
- ❌ No marketing superlatives ("incredible", "amazing", "revolutionary"). The strongest word used is *"de vanguarda"* (cutting-edge) and *"de classe mundial"* (world-class).
- ❌ No exclamation marks. (One slipped through in the simulator; treat as exception, not pattern.)
- ❌ No first-person singular. No "I", no "me".
- ❌ Don't translate fixed-form acronyms (EBSI stays EBSI in PT, not *"IESB"*).

### Microcopy patterns (lift these verbatim)

| Slot | PT | EN |
|---|---|---|
| Primary CTA | **Obter a App** · **Ver demonstração** · **Solicitar acesso antecipado** | **Get the App** · **Watch demo** · **Request early access** |
| Email submit | **Solicitar demonstração** · **Solicitar contacto** | **Request demo** · **Request contact** |
| Status pills | **Disponível** · **Em desenvolvimento** | **Available** · **In development** |
| Link arrow | `Saber mais sobre … →` | `Learn more about … →` |
| Trust eyebrow | **Parceiros do ecossistema** | **Ecosystem partners** |
| Funders label | **Financiado por** | **Funded by** |
| Copyright | *© 2026 Portuguese Digital Wallet. Financiado por PRR & NextGenerationEU.* | *Funded by PRR & NextGenerationEU.* |

---

## VISUAL FOUNDATIONS

### Palette

The brand sits on **two anchor hues** plus a near-black text colour. Everything else is a tint, a translucency, or a status colour.

- **PDW Green `#006c4b`** — the primary. Used for CTAs, links, headings, badges, focus rings, eyebrow labels, the brand wordmark, and as a glow/radial behind hero imagery. Paired in CTAs with **`#009668`** as a 135° gradient.
- **Institutional Navy `#1a3b5d`** — the secondary. Used in the headline gradient (`text-gradient: green → navy`), in the footer's vertical fade-to-dark, and as the "ecosystem / research" status hue.
- **Cool off-white background `#f7fafc`** — the page colour. Surfaces are pure `#ffffff`. Borders are a soft `#d1d9e0`.
- **Text** is `#181c1e` (near-black with a green undertone). Muted text is `#3d4a42` (the muted green-grey).
- **Status pills** use desaturated washes: green `#dcfce7/#0d6a3d`, amber `#fef3c7/#92400e`, blue `#dbeafe/#1e3a8a`.
- **Dark mode** is a deep teal-navy: bg `#0E1E2E`, surface `#152A3E`, primary brightens to `#22A66B`. The whole palette desaturates 1 step.

See `colors_and_type.css` and the registered **Colors** cards for tokens.

### Typography

- **Public Sans** (Google Fonts) — the single typeface across the entire system. Weights in use: 400 / 500 / 600 / 700 / 800.
- No serif. No display face. No icon font (icons are inline SVG, see below).
- Headings carry **`letter-spacing: -0.02em`** (h1) / `-0.01em` (h2). The brand wordmark uses the same tight tracking.
- **800-weight extrabold** is reserved for: the wordmark *"Portuguese Digital Wallet"*, footer column titles, and the video-showcase title.
- Eyebrows are **11–12 px, uppercase, `letter-spacing: 0.12em`**, in primary green.
- Body is 16 / 1.6, dropping to 14 / 1.6 on mobile. Line-height is generous (`1.5–1.7`) on every paragraph.
- Hero subtitle is a chunky **20 px, 600 weight, green**. Hero h1 is **42 px** desktop / 32 px mobile.

### Spacing, layout & containers

- Single content container: `width: min(1120px, 92vw)`, centred.
- Container padding: **32 px desktop → 16 px mobile** (token `--spacing-container`).
- The grid is a quiet **3-column `grid-3`** on desktop, **1-column** under 900 px. No bento. No staircased layouts.
- Sections stack with a flat **`margin-top: 14–32 px`** between cards — the site is rhythm-by-cards, not rhythm-by-padding.
- Hero is a flex row: text left, isometric image right (40 px gap), collapses to column on mobile.

### Corner radii

A clear radius ladder. Lower radius = denser content; higher = hero / modal / playful.

- **6 px** trust-bar logos, lang toggle
- **8 px** buttons, inputs, theme toggle
- **12 px** credential preview, timeline content
- **14 px** **default for `.section-card` and `.hero`** — the single most-used radius on the site
- **16 px** dropzone, modal, mobile cards
- **20 px** video container, funders panel
- **24 px** simulator card (the spec'd `--radius-card`)
- **999 px** status pills, language switcher

### Cards

The canonical card is `.section-card`:
- background `#ffffff`, border `1px solid #d1d9e0`, radius `14px`, padding `18px`.
- **No drop-shadow by default.** Cards rest flat on the page.
- On hover (use-case variant), a soft `translateY(-4px)` lift with `box-shadow: 0 12px 28px rgba(0,108,75,0.10)` and a green-tinted border. Hover is the only time shadows appear on standard cards.
- The **diploma-case** section breaks the rule with a 4°-tint gradient background (`rgba(0,108,75,0.04) → rgba(26,59,93,0.04)`) — reserve this gradient for **hero secondary surfaces only**.

### Shadows & elevation

A small, deliberate ladder, almost all of which carry a **green or navy tint** rather than pure black:
- `0 2px 6px rgba(0,108,75,0.15)` — logo drop-shadow
- `0 2px 10px rgba(0,0,0,0.02)` — trust bar (barely visible)
- `0 4px 12px rgba(0,0,0,0.05)` — credential preview
- `0 4px 30px rgba(0,0,0,0.05)` — hero
- `0 8px 20px rgba(0,108,75,0.30)` — primary CTA resting
- `0 12px 24px rgba(0,108,75,0.40)` — primary CTA hover
- `0 12px 28px rgba(0,108,75,0.10)` — card hover lift
- `0 20px 50px rgba(0,108,75,0.15)` — hero image (the heaviest shadow)
- `0 20px 40px rgba(0,0,0,0.15)` — modal

### Backgrounds & atmosphere

- The page is **flat** — solid `#f7fafc`. **No** repeating patterns, **no** noise, **no** hand-drawn illustrations.
- Hero and footer carry **soft radial green glows** placed off-canvas:
  - Hero `::before` is a 600×600 `radial-gradient(rgba(0,108,75,0.08), transparent 70%)` top-right, pulsing on a 10 s loop.
  - Footer has two 350–400 px `filter: blur(100px)` glows floating in a 10–12 s ease-in-out.
- Sticky header is **frosted glass**: `background: rgba(255,255,255,0.85); backdrop-filter: blur(16px)`. Same recipe is used on the simulator and modals — frosted, never solid coloured.
- The **footer** is the *only* place a strong vertical gradient is used: `linear-gradient(180deg, #f0f5f3 0%, #e8f0ed 40%, #1a3b5d 100%)`. The dark navy at the bottom houses the copyright bar.
- Imagery (hero illustration, wallet mockup, isometric scene) is **bright, optimistic, mostly green / blue / pastel**, with subtle gradients — never moody, never b&w, never warm.

### Borders & dividers

- Default border: `1px solid #d1d9e0`. On dark mode: `1px solid #1E3A52`.
- Brand-tinted border for primary surfaces: `1px solid rgba(0,108,75,0.10)` — used on hero, trust bar, video container.
- Footer column titles have a **28 × 2 px green→navy gradient under-bar** as a decorative divider.
- A 3 px wide *full-width* gradient divider sits at the top of the footer: `transparent → green → navy → transparent`.

### Buttons

- **Primary CTA** `.cta` — solid green `#006c4b`, white text, `padding: 10px 14px`, radius 8 px, weight 600.
- **Primary disruptive** `.cta-disruptive` — same but with a green-gradient fill, shadow `0 8px 20px rgba(0,108,75,0.3)`, and a `translateY(-2px)` lift on hover.
- **Secondary** `.btn-secondary` — white fill, `#d1d9e0` border, dark text, same radius/padding.
- **Hover** = lift + deepen shadow; **active** = no defined press state in code (default browser).
- Focus is the default browser ring; **add a 2 px green outline** for production accessibility.

### Animation system

framer-motion is in the dependency tree but most motion is **CSS keyframes**.

- **Easing.** The site has three favourites: `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (springy, for logo hovers), `cubic-bezier(0.22, 1, 0.36, 1)` (out-soft, for scroll reveals and footer cards), and `cubic-bezier(0.16, 1, 0.3, 1)` (modal slide-up).
- **Durations.** 0.2 s for micro-feedback, 0.3 s for hover state, 0.4–0.5 s for hover lifts on partner cards, 0.8 s for scroll reveals.
- **Signature loops** (slow, calm, infinite alternate):
  - `floatImage` — hero image bobs ±15 px over 6 s.
  - `pulseBg` — radial glows scale 1 → 1.1, opacity 0.3 → 0.6 over 6–10 s.
  - `logoSoftPulse` — header logo scales 1 → 1.08 over 5 s.
  - `footerGlowFloat` — two footer glows drift 30 px / -20 px over 10–12 s.
- **No bounces, no springs in production CTAs.** Springy easing is reserved for *logo* and *image* interactions, not buttons.

### Hover & press states

- **Links**: animate an `::after` underline grow `0 → 100%` in 0.3 s.
- **Nav links**: green color shift + 2 px underline grow.
- **Cards** (`use-case-card`): `translateY(-4px)` + tinted shadow + green border tint.
- **Footer partner links**: `translateX(4–6px)` slide + green color shift; the link-arrow fades in from `opacity:0 / translateX(-8px)` to visible.
- **Partner logos / funder logos**: start `grayscale(100%) opacity(0.55–0.8)`, hover removes filters → full colour at scale 1.04.
- **Press**: not formally defined. For production-grade work, apply `transform: scale(0.98)` over 0.15 s.

### Transparency, blur & frosted surfaces

Used in **four** places only:
1. Sticky header — `rgba(255,255,255,0.85)` + `blur(16px)`.
2. Modal overlay — `rgba(0,0,0,0.4)` + `blur(4px)`.
3. Simulator card and footer-funders panel — `rgba(255,255,255,0.03–0.5)` + `blur(16–20px)`.
4. Footer partner cards — `rgba(255,255,255,0.05)` + `blur(12px)`.

Don't add frost elsewhere. It signifies *"infrastructure layer over content"*.

### Layout rules (fixed elements)

- **Header**: `position: sticky; top: 0; z-index: 50`, 72 px min-height (56 px mobile).
- **Modal overlay**: `z-index: 1000`, viewport-locked centred.
- **Accessibility widget**: floating button bottom-right (see `AccessibilityWidget.tsx`).
- **Mobile menu**: full-width dropdown attached to header, `box-shadow: 0 8px 24px rgba(0,0,0,0.08)`.
- Nothing else is fixed. The page scrolls cleanly.

### Imagery direction

- Bright, optimistic, **mostly green/teal/blue with pastel accents**. Light backgrounds.
- The hero illustration (`Imagem-home.png`) is a **flat-vector isometric** scene of someone using the app with credential cards floating around them.
- Mockups are **shown in-context** with a soft shadow + subtle floating animation.
- **Photography** is currently *not used*; everything is vector / 3D-render style. If introducing photo, keep it warm-neutral, no heavy filters.

---

## ICONOGRAPHY

PDW uses **three coexisting icon idioms**, each in a specific place. None of them is a single icon font.

### 1. Inline-stroke SVG (Lucide-style) — primary

This is the **default icon style** for the website. Every non-emoji icon in `PdwHeader.tsx`, `PdwFooter.tsx`, `HeroInstitutional.tsx`, `InteractiveSimulator.tsx`, `ChangelogModal.tsx` is a hand-inlined SVG following the **Lucide / Feather** convention:

```
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
```

Sizes used: **16 px** (inline-in-text, e.g. footer contact rows), **20 px** (social icons), **24 px** (mobile hamburger), **48 px** (simulator hero icon, with `stroke-width="1.5"` for the larger size).

**For new work, link Lucide from CDN** rather than re-inlining: `https://unpkg.com/lucide@latest`. Common icons referenced in the codebase: `map-pin`, `mail`, `play`, `linkedin`, `users` (used as the WhatsApp glyph), `instagram`, `graduation-cap`, `check-circle`. This is a substitution — the codebase ships inlined SVGs, not a dependency on Lucide.

> ⚠️ **Substitution flag:** the site **does not import Lucide**; icons are hand-written inline SVGs in the same visual style as Lucide. Using Lucide from CDN is the closest 1:1 match and is what I recommend for new pages. If you want pixel-perfect parity with the existing site, copy the inline SVG out of the source component instead.

### 2. Emoji as section/category glyphs — narrow use

Emoji is used **only as oversized category icons** in three specific patterns. It is *never* used in prose, buttons, or microcopy.

| Pattern | Where | Examples |
|---|---|---|
| **Use-case card icon** (28 px) | `UseCasesGrid` | 🎓 🪪 📜 🏥 🌱 🏠 |
| **Value pillar icon** (in `pt.json` but currently rendered as titles) | `ValuePillars` | 🔒 🇪🇺 🎓 |
| **Section badge** with a leading icon | VideoShowcase, DiplomaCase | 🎬 🎓 |

The emoji always sits **left-of-title**, never replacing words. Treat as a **bridge** until the brand commissions custom illustrated icons — flag for review.

### 3. Brand & partner logos — PNG raster

All logos in `assets/` are PNG (not SVG). They are rendered:
- **In context (header)** at 32–36 px with a 6 px radius and a soft drop-shadow.
- **In the trust-bar / footer** at ~130 × 46 px, **grayscale + 0.55 opacity by default, full-colour on hover.** This is the *signature interaction* of the system — never display partner logos at full colour by default.

Logos available locally (`assets/`):
- `pdw_logo.png`, `pdw_icon.png` — PDW marks
- `tcminho-logo.png`, `TECMINHO.png` — TecMinho (consortium coordinator)
- `uminho_logo.png`, `uminho_logo-1.png` — University of Minho
- `logo-Blockchain-pt.png` — Agenda Blockchain.PT
- `logo-void.png` — VOID Software (consortium lead)
- `logo-ebsi.png` — EBSI (rendered at scale 1.38 because the source PNG has heavy padding — see `trust-logo-img--boosted`)
- `logo-dax.png` — DAX
- `PRR.png`, `RP.png`, `FEU.png` — funder logos (mandatory in footer)
- Backgrounded variants `*-fundo.png` exist for placement on coloured surfaces.

### 4. Unicode glyphs

The right-arrow **`→`** (U+2192) is used as the universal "learn more" affordance on links, CTAs and footer nav. Always trailing with a space before it: `Saber mais →`. Do not substitute with `>`, `»`, or an SVG arrow.

### 5. Decorative ID glyphs

The hero illustration shows stylised "credential cards" with a QR-code-like grid pattern. These are illustration, not iconography; do not extract them as icons.

---

## File index

| Path | What it is |
|---|---|
| `colors_and_type.css` | All design tokens (colors, type, spacing, radii, shadows, motion) as CSS custom properties + a `.pdw-typography` helper class. **Import this in every new artifact.** |
| `README.md` | This document — brand context, content, visual + iconography rules. |
| `SKILL.md` | Skill manifest so this folder doubles as a portable Agent Skill. |
| `assets/` | All PNG logos, partner marks, funder marks, hero illustrations, mockups, flow diagrams. Copied 1:1 from `pdw-site-v2/public/`. |
| `fonts/` | (Not used.) Public Sans is loaded from Google Fonts at the top of `colors_and_type.css`. |
| `preview/` | HTML preview cards rendered into the Design System tab. Atomic — one card per concept. |
| `ui_kits/website/` | Pixel-faithful recreation of the PDW website (Hero, TrustBar, ValuePillars, UseCases, DiplomaCase, Header, Footer, **Accessibility widget**). `index.html` is a click-thru of the home page. Append `?admin=1` to see the hidden admin panel. JSX components live alongside. |
| `slides/` | Reusable 16:9 deck shell using `<deck-stage>`. Six core layouts (cover, section divider, big-quote, stat, comparison, funder credits) styled with the PDW system. |
| `illustration-brief.md` | Proposed scope for a commissioned icon / illustration set to replace the emoji category glyphs. |

### Preview cards (what the Design System tab shows)

Grouped into **Brand · Colors · Type · Spacing · Components**. See `preview/`.

### Caveats

- **Mobile-app UI kit is intentionally not built.** PDW is moving from MVP to production as a **responsive web product only** — no native mobile-app surface. The wallet *mockup* PNGs (`wallet-mockup.png`, `Imagem-isometrica.png`) are marketing imagery and should be treated as such.
- **Version badge moved off the public header.** The `v1.x.y` chip that used to sit in the nav is MVP-only and now belongs to a **hidden, auth-gated `/admin` route**. The UI kit demos this — append `?admin=1` to the URL to see it. Production must put this behind real authentication.
- **Theme toggle consolidated into the Accessibility widget.** The standalone moon/sun button in the header is gone; **dark mode, high contrast, and text-size controls** now live together in the floating Accessibility button (bottom-right). One control surface, one mental model.
- **Icons are substituted** — the site hand-inlines SVGs in the Lucide style rather than importing the library. The UI kit links Lucide from CDN as the closest 1:1 match; flag if pixel-perfect fidelity is required.
- **Custom illustration system is missing.** The site uses emoji as use-case category icons (🎓 🪪 📜 🏥 🌱 🏠) because no commissioned illustration set exists yet. See `illustration-brief.md` for the proposed scope.
- **Public Sans is loaded from Google Fonts**, matching the site. No local font files are bundled.
