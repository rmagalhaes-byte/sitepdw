# DIFF · PR3 · Home editorial

Guia linha-a-linha para o reviewer. Cada secção mostra:
- **Onde** aplicar (ficheiro no `pdw-site-v2`)
- **O quê** muda (antes / depois)
- **Por que** muda

---

## 1 · `src/i18n/locales/pt.json` (PATCH · merge)

**O quê:** adicionar a chave de topo `home` com `pullquote` + `statsBanner`. **Não substituir** nada — apenas inserir, mantendo a ordem alfabética opcional ou logo a seguir a `hero`.

```diff
   "hero": { … },
+  "home": {
+    "pullquote": {
+      "figureNumber": "10%",
+      "figureLabel": "do PIB global\nem blockchain até 2027",
+      "quote": "A PDW transforma esta oportunidade numa <strong>vantagem soberana</strong>, garantindo que Portugal lidere a camada de valor da economia descentralizada — em vez de a consumir importada.",
+      "source": "Plano de Negócios · PDW",
+      "sourceRole": "Agenda «Descentralizar Portugal com Blockchain»",
+      "sourceCitation": "Projeção Fórum Económico Mundial"
+    },
+    "statsBanner": {
+      "eyebrow": "Agenda Blockchain.PT em números",
+      "title": "A escala do consórcio que torna a PDW possível.",
+      "footer": "Financiamento PRR · NextGenerationEU · Coordenação institucional pela TecMinho",
+      "stats": [
+        { "num": "72,9", "suffix": "M€", "label": "Investimento total\ndo consórcio" },
+        { "num": "26",   "suffix": "",   "label": "Produtos inovadores\nna Agenda" },
+        { "num": "378",  "suffix": "",   "label": "Profissionais\nmobilizados" },
+        { "num": "44",   "suffix": "",   "label": "Entidades · 24 PME\n15 RTOs · 5 Estado" }
+      ]
+    }
+  },
   "pillars": { … }
```

> O ficheiro `i18n-additions.json` deste pacote tem o JSON pronto a copiar dentro de `pt.*` e `en.*`. A versão EN está no mesmo ficheiro e segue para `src/i18n/locales/en.json`.

---

## 2 · `src/i18n/locales/en.json` (PATCH · merge)

Mesmo padrão da secção 1, mas com a árvore `en` do `i18n-additions.json`. Não duplico aqui — usa o ficheiro do pacote como fonte.

---

## 3 · `src/app/globals.css` (APPEND · concat ao final)

**O quê:** concatenar todo o conteúdo de `globals.append.pr3.css` ao **final** do `globals.css`, **depois** dos blocos do PR1 e PR2.

```bash
cat handoff_pdw_site_v2_home/globals.append.pr3.css \
  >> pdw-site-v2/src/app/globals.css
```

> Adiciona apenas seletores novos (`.pullquote-*`, `.statsbanner-*`). Não há `!important`, não há overrides de classes existentes — **zero risco** de partir estilos já em produção.

---

## 4 · `src/components/sections/HomeHero.tsx` (NOVO)

Criar o ficheiro com o conteúdo de `handoff_pdw_site_v2_home/src/components/sections/HomeHero.tsx`.

**Porquê:** o `HeroInstitutional` precisa de `onPlayDemo: () => void` (já tipado assim em `HeroInstitutional.tsx`). O `page.tsx` actual não passa esse prop — neste PR isolamos a interação num wrapper Client para podermos manter o `page.tsx` Server (necessário para `generateMetadata` e JSON-LD).

---

## 5 · `src/components/sections/PullQuote.tsx` (NOVO)

Criar o ficheiro com o conteúdo de `handoff_pdw_site_v2_home/src/components/sections/PullQuote.tsx`. Server Component. Lê `dict.home.pullquote`.

---

## 6 · `src/components/sections/StatsBanner.tsx` (NOVO)

Criar o ficheiro com o conteúdo de `handoff_pdw_site_v2_home/src/components/sections/StatsBanner.tsx`. Server Component. Lê `dict.home.statsBanner.stats` (array de 4 itens).

---

## 7 · `src/app/[lang]/page.tsx` (SUBSTITUIR)

Diff completo:

```diff
- import { HeroInstitutional } from "@/components/sections/HeroInstitutional";
+ import { HomeHero } from "@/components/sections/HomeHero";
  import { TrustBar } from "@/components/sections/TrustBar";
+ import { PullQuote } from "@/components/sections/PullQuote";
  import { ValuePillars } from "@/components/sections/ValuePillars";
+ import { StatsBanner } from "@/components/sections/StatsBanner";
  import { DiplomaCaseSection } from "@/components/sections/DiplomaCaseSection";
  import { ContactCTA } from "@/components/sections/ContactCTA";
  …

  return (
    <>
      <script type="application/ld+json" … />

-     <HeroInstitutional lang={lang as Locale} dict={dict} />
+     <HomeHero lang={lang as Locale} dict={dict} />
      <TrustBar dict={dict} />
+     <PullQuote lang={lang as Locale} dict={dict} />
      <ValuePillars dict={dict} />
+     <StatsBanner lang={lang as Locale} dict={dict} />
      <DiplomaCaseSection lang={lang as Locale} dict={dict} />
      <ContactCTA lang={lang as Locale} dict={dict} />
    </>
  );
```

`generateMetadata` e o JSON-LD ficam **idênticos** — não toquei em nada relacionado com SEO.

---

## 8 · Checklist final de QA (antes do merge)

- [ ] `pnpm install` (não deve mudar nada — zero deps novas).
- [ ] `pnpm build` passa.
- [ ] `pnpm lint` passa.
- [ ] `/pt` renderiza sem console errors. Mesmo para `/en`.
- [ ] Clicar **"Ver vídeo conceito"** no hero abre o `VideoModal` com `/concept_video.mp4`. `Esc` fecha. Click fora fecha.
- [ ] `PullQuote` aparece a seguir ao `TrustBar` (banda escura).
- [ ] `StatsBanner` aparece a seguir aos `ValuePillars` (banda clara, 4 colunas).
- [ ] A < 900 px de largura o `PullQuote` colapsa para 1 coluna e o `StatsBanner` para 2 colunas.
- [ ] Lighthouse mantém ou melhora os 4 scores.
- [ ] Footer e Header (do `layout.tsx`) **continuam intactos**.

---

## 9 · Rollback rápido

Se algo correr mal em produção, reverte os 4 ficheiros novos + 2 ficheiros editados:

```bash
git revert <commit-pr3c>   # tira a integração na page.tsx
# OU, mais granular:
git checkout HEAD~1 -- src/app/[lang]/page.tsx
```

Ficam intactos os blocos de CSS / i18n / componentes (são aditivos, não criam efeitos colaterais quando não são chamados).
