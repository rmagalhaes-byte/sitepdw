# PDW Website — UI kit

Pixel-faithful recreation of `pdw-site-v2`'s home page as a single-file click-thru. Renders the **PDW green / institutional navy** institutional voice with all the signature interactions (radial-glow hero, grayscale-to-color trust bar, hovering use-case cards, the verification simulator, frosted sticky header).

## Files

| File | What it is |
|---|---|
| `index.html` | Entry point. Wires React + Babel inline and switches between Home / Sobre / Solução / Casos / Contactos / Privacidade / Termos. Tweaks panel exposes per-page variant toggles. |
| `styles.css` | All component styles. Imports `../../colors_and_type.css` (the design tokens) at the top. |
| `components.jsx` | Core UI: `PdwHeader`, `HeroInstitutional`, `TrustBar`, `ValuePillars`, `UseCasesGrid`, `DiplomaCaseSection`, `InteractiveSimulator`, `ContactCTA`, `PdwFooter`, `ChangelogModal`, `AccessibilityWidget`, `AdminVersionBadge`, `Icon`. |
| `pages-sobre.jsx` | `SobrePage` — two variants. **A · Institucional** (card grid, KPI strip, team grid, partners list, standards) · **B · Editorial** (long-form, pullquote, narrative). |
| `pages-solucao.jsx` | `SolucaoPage` — two variants. **A · Story-first** (interactive `TrustTriangle`, flow steps, three pillars) · **B · Dev-first** (technical token table, JSON-LD example, triangle, developer resources). |
| `pages-legal.jsx` | `PrivacidadePage` + `TermosPage` — two variants. **A · Print-ready** (single column, justified, numbered clauses) · **B · TOC sidebar** (two-column with sticky table of contents). |
| `tweaks-panel.jsx` | Tweaks controls (vendored from starter). Switches between page variants live. |

## What's interactive (click-thru)

- **Header nav** — clicking Início / Sobre / Solução / Casos de Uso / Contactos swaps the main content
- **Tweaks panel** (bottom-right toolbar → toggle "Tweaks") — switch the active page and pick a **variant (A/B)** per page
- **Theme · contraste · tamanho de texto** — floating Accessibility button (bottom-right)
- **Hidden /admin route** — append `?admin=1` to see the version badge panel
- **Hero "Ver demonstração"** — opens an alert as a stand-in for the video modal
- **Trust-bar logos** — partner marks desaturated by default, full-color on hover
- **Use-case cards** — lift on hover with green-tinted shadow
- **Verification simulator** (home → Diploma case) — click "Verificar Credencial" → spinner → success card
- **Interactive Trust Triangle** (Solução) — click any of the three nodes (Emissor / Utilizador / Verificador) to swap the explanation panel
- **Legal TOC** (Privacidade/Termos variant B) — clicking a TOC entry highlights and scrolls to it
- **Contact form** — submit triggers a "thanks" success state
- **Footer partner cards** — same grayscale → color treatment

## What's omitted (vs. the real site)

- Real video modal (the YouTube embed) — replaced with an alert
- Lead form persistence — the email is fake-stored, no fetch
- Accessibility widget — site has one in the corner; left out for clarity
- Google Analytics, JSON-LD, sitemap, i18n switching — stripped
- Sub-pages beyond the four mocked here (Privacidade, Termos, Diplomas Digitais)
- Scroll-reveal `IntersectionObserver` animations — present in the site, dropped here so all sections show immediately

## How to extend

To add another page, add a new branch in `index.html`'s `<main>` switch, or factor a `<Routes>` shell. To add a new component, define it in `components.jsx`, export it via the `Object.assign(window, …)` block, and use it in `index.html`. Match the existing voice from the **CONTENT FUNDAMENTALS** section of the root README.

## Caveats

- **No mobile-app UI kit.** The Next.js codebase only has marketing pages — see root README.
- **Icons substituted.** Site uses hand-inlined SVGs; here I built a tiny `<Icon>` set in the same Lucide stroke style. If you want pixel-perfect logos, lift the inline SVGs straight from the source components.
- **Lang switcher is decorative** — clicking "EN" doesn't do anything.
