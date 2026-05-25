# Handoff · do design system para o repositório `pdw-site-v1`

> **Repositório destino:** `https://github.com/rshermans/pdw-site-v2`
> **Origem deste pacote:** `ui_kits/website/` deste projeto.
> **Princípio:** UM componente por PR. **Não tocar** no formulário de contacto nem na rota `/api/contact` (Resend ativo).

Este documento explica, página a página, o que copiar, para onde, e o que ajustar para integrar com o stack Next.js + i18n + Framer Motion do `pdw-site-v1`. As páginas no design system foram escritas em **JSX puro com React UMD** (para correr no browser sem build). No teu repositório elas têm de ser convertidas para **TSX com `"use client"`** ou Server Components, conforme o caso.

---

## 0 · Antes de começar (uma vez só)

1. **Garante que estás num branch limpo.** Cria um branch novo por página:
   ```bash
   git checkout main
   git pull
   git checkout -b design/sobre-page
   ```

2. **Confirma a estrutura de pastas no repositório.** Pelo `pdw-site-v2/` (que tem a mesma base do `v1`), as páginas vivem em:
   ```
   src/app/[lang]/<slug>/page.tsx       ← rota
   src/components/sections/<Name>.tsx   ← secções grandes
   src/components/ui/<Name>.tsx         ← componentes pequenos
   src/i18n/pt.json + en.json           ← copy
   src/styles/pages/<slug>.css          ← (se ainda não existir, criar)
   ```

3. **Antes de cada PR, faz um screenshot da página atual em produção.** Se algo partir, é mais fácil comparar.

---

## 1 · Página **Sobre** (`/sobre`)

### Ficheiros deste design system a portar
- `ui_kits/website/pages-sobre.jsx` → dividir em vários componentes
- Bloco CSS em `ui_kits/website/styles.css` (entre os comentários **SOBRE — KPI strip, team grid…** e **SOBRE — editorial variant**)

### Destino no repositório

| Componente do design system | Ficheiro destino |
|---|---|
| `SobreHeader` | `src/components/sections/SobreHeader.tsx` (Server Component) |
| `SobreKpis` + `KpiStat` | `src/components/sections/SobreKpis.tsx` |
| `StandardBlock` (loop dos 3) | `src/components/sections/StandardsList.tsx` |
| `TeamCard` + grelha | `src/components/sections/TeamGrid.tsx` |
| Lista de parceiros | `src/components/sections/PartnersList.tsx` |
| Página completa (variante A) | substituir `src/app/[lang]/sobre/page.tsx` |

> A **variante B (Editorial)** mantém-se neste design system como referência. **Não a portes ainda** — decidam internamente se querem fazer A/B testing real no site.

### Conversão JSX → TSX (passos)
1. Renomear ficheiros para `.tsx`.
2. Adicionar `"use client"` no topo apenas se houver `useState` ou interações do utilizador. Cards de equipa, lista de parceiros, normas — todos podem ficar Server Components.
3. Trocar `Object.assign(window, { … })` e `useState: useStateSobre` por imports/exports normais:
   ```tsx
   export function TeamGrid() { … }
   ```
4. Mover **todo o copy** para `src/i18n/pt.json` (e `en.json`):
   ```json
   "about": {
     "hero": {
       "eyebrow": "Sobre o projeto",
       "titleA": "Infraestrutura nacional de identidade digital,",
       "titleB": "construída em Portugal para a Europa.",
       "lead": "A Portuguese Digital Wallet (PDW) é…"
     },
     "kpis": [
       { "value": "72,9 M€", "label": "Investimento total do consórcio" },
       …
     ],
     "team": [ { "name": "Pedro Xavier", "role": "Gestão e Coordenação" }, … ],
     "partners": [ … ]
   }
   ```
5. Trocar tags `<a>` por `<Link href="…">` do `next/link` para navegação interna.

### CSS
- Copia os blocos relevantes de `ui_kits/website/styles.css` para `src/styles/pages/sobre.css`.
- Os tokens (`--pdw-green-700`, `--pdw-bg`, etc.) **já existem** no `globals.css` do repositório com nomes diferentes (`--color-primary`, `--color-muted`). **Antes de copiar, faz find/replace:**
  ```
  --pdw-green-700     →  --color-primary
  --pdw-navy-900      →  --color-secondary
  --pdw-bg            →  --color-bg
  --pdw-surface       →  #fff
  --pdw-text          →  var(--foreground)
  --pdw-text-muted    →  var(--color-muted)
  --pdw-border        →  var(--color-border)
  ```

### Critério de aceitação do PR
- [ ] `/sobre` renderiza sem console errors em pt e en.
- [ ] `pnpm build` (ou `npm run build`) passa.
- [ ] Lighthouse mantém o score atual ou melhora.
- [ ] Footer e Header (do layout) continuam intactos.

---

## 2 · Página **Solução** (`/solucao`)

### Ficheiros deste design system a portar
- `ui_kits/website/pages-solucao.jsx`
- Bloco CSS **SOLUÇÃO — Trust Triangle, flow, tech table, code** em `styles.css`

### Destino

| Componente | Ficheiro destino |
|---|---|
| `TrustTriangle` (componente interativo) | `src/components/sections/TrustTriangle.tsx` **(Client Component — `"use client"`)** |
| `FlowSteps` | `src/components/sections/FlowSteps.tsx` |
| `TechTable` | `src/components/sections/TechTable.tsx` |
| `CredentialSample` | `src/components/sections/CredentialSample.tsx` |
| Página | substituir `src/app/[lang]/solucao/page.tsx` |

### Pontos de atenção
1. **`TrustTriangle` precisa de `"use client"`** — usa `useState` para o nó ativo.
2. O `viewBox` do SVG é `0 0 400 320` — não mexer; o triângulo está calibrado para essa proporção.
3. As cores dos `flow-step` são hexadecimais inline. Considera mover para tokens (`--color-flow-1` … `--color-flow-4`) no `globals.css` para consistência futura.
4. O **bloco de código JSON-LD** usa CSS escuro (`#0E1E2E`). Se o site tiver dark mode futuro, ajusta para usar `var(--code-bg)` em vez de um literal.

### Critério de aceitação
- [ ] Os 3 nós do triângulo são clicáveis com teclado (`Tab` + `Enter`).
- [ ] Anúncio do nó ativo via `aria-pressed`.
- [ ] Variante A (default) renderiza sem ler `process.env`.

---

## 3 · Páginas **legais** — Privacidade & Termos

### Ficheiros deste design system a portar
- `ui_kits/website/pages-legal.jsx`
- Bloco CSS **LEGAL — Privacidade / Termos** + `@media print` em `styles.css`

### Destino

| Componente | Ficheiro destino |
|---|---|
| Constantes `PRIVACIDADE` + `TERMOS` | mover **inteiramente** para `src/i18n/pt.json` (`privacy.sections[]`, `terms.sections[]`). |
| `LegalVariantA` (Print-ready) | `src/components/legal/LegalDocument.tsx` |
| `LegalVariantB` (TOC) | `src/components/legal/LegalDocumentWithToc.tsx` |
| Página privacidade | substituir `src/app/[lang]/privacidade/page.tsx` |
| Página termos | substituir `src/app/[lang]/termos/page.tsx` |

### Pontos de atenção
1. O **conteúdo legal foi reescrito em pt-PT formal** com referências ao RGPD, artigo 28.º, CNPD e foro da comarca de Braga. **Pede revisão a alguém com background jurídico antes de publicar.**
2. **Variante B (TOC)** usa `useState` e `scrollIntoView` — Client Component. Variante A pode ser Server Component.
3. As regras `@media print` permitem `Cmd/Ctrl + P` produzir um PDF limpo. Testa isso antes de fazer merge.
4. A data **«14 de maio de 2026»** está hardcoded — converte para uma constante exportada ou puxa de um `<meta>` durante build.

### Critério de aceitação
- [ ] Conteúdo legal revisto por advogado/DPO.
- [ ] `Cmd+P` em ambas as páginas dá PDF sem chrome (sem header/footer/widgets).
- [ ] Links âncora `#objeto`, `#dados-recolhidos`, etc. funcionam.

---

## 4 · Header limpo + Accessibility widget (independente das páginas)

Estas duas alterações podem ir num PR **separado e antes** das páginas — é uma melhoria de chrome global.

### Mudanças mínimas
1. **Remover** da `Header.tsx` atual:
   - O badge `v1.7.3` (passou a viver no `/admin`)
   - O `<ThemeToggle>` (passou a viver na `AccessibilityWidget`)
2. **Adicionar** o componente `AccessibilityWidget` (combinando tema + alto contraste + tamanho de texto) — código em `ui_kits/website/components.jsx` linhas onde está definido `AccessibilityWidget`.
3. **Criar `/admin` route protegida** (estrutura sugerida abaixo).

### Estrutura sugerida para `/admin`
```
src/app/[lang]/admin/
├── layout.tsx         ← gate de auth (NextAuth, Clerk, ou JWT simples)
├── page.tsx           ← dashboard com versão atual + changelog
└── changelog/
    └── page.tsx       ← lista completa de versões
```

Auth mínima sugerida (até integrarem a definitiva):
- NextAuth com provider de email (magic link) e allowlist de domínios `@uminho.pt` / `@tecminho.uminho.pt`.
- Middleware Next.js: `if (!session && pathname.startsWith('/admin')) redirect('/')`.

---

## 5 · Workflow recomendado (do design system → repositório)

```bash
# Por cada página/componente:
git checkout main && git pull
git checkout -b design/<nome>

# Copia ficheiros e converte JSX → TSX
# Faz find/replace dos tokens CSS
# Move copy para i18n

pnpm dev                      # confirma localmente
pnpm build                    # confirma que builda
pnpm lint && pnpm test        # se existirem

git add -A
git commit -m "feat(sobre): novo layout com KPIs e equipa"
git push -u origin design/<nome>
# Abre PR e pede review
```

**Não fazer merge à pressa.** Cada PR deve ter:
- 1+ aprovação;
- screenshot do antes/depois;
- preview deploy (Vercel) verde.

---

## 6 · Checklist final antes do go-live em produção

- [ ] Conteúdo legal validado por DPO/jurista.
- [ ] Equipa/parceiros confirmados (nomes, papéis, ordem).
- [ ] Lighthouse ≥ 90 em todas as 4 categorias para as 4 páginas novas.
- [ ] Screenshots pt + en de cada página, gravados em `docs/screenshots/`.
- [ ] Smoke test do `/api/contact` (Resend) com email de teste.
- [ ] Verificar que o `?admin=1` foi substituído por gate de auth real.

---

## 7 · Como te posso ajudar mais

- **Gerar os ficheiros TSX prontos a colar** — diz-me uma página e produzo o `.tsx` com `"use client"`, imports do Next e i18n já com a estrutura certa.
- **Criar o gate de `/admin`** — posso fazer uma proposta de `layout.tsx` com NextAuth + allowlist.
- **Validar o teu repositório** — partilha um link de leitura ao `pdw-site-v1` e eu confirmo onde cada coisa encaixa exactamente.
