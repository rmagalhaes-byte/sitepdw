# PDW · Deck template

Six reusable 16:9 slide layouts (1920 × 1080) styled with the PDW design system. Open `index.html` to flip through them — arrow keys / click anywhere to advance. Speaker notes can be added later via a `<script type="application/json" id="speaker-notes">` block in `index.html`.

## Layouts

| # | Layout | Use it for |
|---|---|---|
| **01** | **Cover** — full bleed PDW lockup + gradient title + funder strip | Title slide of every external deck. Always include the funder lockup. |
| **02** | **Section divider** — eyebrow + huge two-line title + deck | Between chapters of a long deck. The 6 px green→navy bar on the left is the divider's signature. |
| **03** | **Big quote** — pull-quote with stylised opening mark + source | A *single* strategic claim. Quote should be ≤ 28 PT-PT words. Highlight numbers with `<strong>`. |
| **04** | **Stats** — 4-column metric grid | Impact numbers. Always 3 or 4 stats, never 5+. Use *real* sourced numbers — see `docs/Bussines.md` in the source repo. |
| **05** | **Comparison** — Antes / Depois cards | Show transformation: state-before vs. state-after. The "after" column gets the green gradient + green bullets. |
| **06** | **Credits / Close** — partner + funder lockups | Final slide. Same legal beats as the website footer: Promotor → Consórcio → Financiado por. |

## Files

- `index.html` — the deck shell, one `<section class="slide …">` per layout.
- `styles.css` — all slide styles. Imports `../colors_and_type.css` for tokens.
- `deck-stage.js` — the deck runtime (auto-scaling, keyboard nav, print-to-PDF, thumbnail rail). Don't edit.

## Editing

Each slide is **static HTML inside `<deck-stage>`** — you can click a heading in edit mode and retype it directly, no chat round-trip needed. To **add** a slide, duplicate one of the existing `<section class="slide …">` blocks and tweak the content. The deck-stage runtime picks it up automatically.

To export to PDF, open the file in a browser and use the print dialog (Cmd/Ctrl + P). The deck-stage runtime emits one page per slide.

## Voice reminders (see root `README.md` → CONTENT FUNDAMENTALS)

- **pt-PT, formal business.** *Você*, not *tu*. *Facto*, not *fato*. Quotation marks **« »**, not `"…"`.
- **No emoji in titles or body.** Emoji is only for use-case category glyphs in the website, never on slides.
- **Numbers, not adjectives.** *"90 % de redução"* beats *"redução significativa"*.
