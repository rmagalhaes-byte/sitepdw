# PR Guide · primeiro PR para `pdw-site-v2`

> **Objetivo:** abrir um único PR no GitHub (`rshermans/pdw-site-v2`) com as alterações que validámos hoje.
> **Tempo estimado:** 5–10 minutos.
> **Risco:** baixo — nada toca no `/api/contact` (Resend) nem no `LeadFormSection`.

---

## 0 · O que vai neste PR

✅ **Home** — novo hero editorial · pillars com imagem isométrica · video-modal real (concept_video.mp4)
✅ **Sobre** — KPIs · normas · equipa · parceiros · TecMinho em destaque · pt-PT formal
✅ **Solução** — Trust Triangle interativo · fluxo · features
✅ **Privacidade + Termos** — layout tipográfico, conteúdo em pt-PT formal (RGPD, CNPD, comarca de Braga)
✅ **/admin** — rota oculta gated por middleware
✅ **Casos de Uso** — featured case (`wallet-mockup.png` + métricas) no topo
✅ **i18n** — novas chaves `privacy.doc` e `terms.doc` em pt + en

❌ **NÃO** toca em: `app/api/contact`, `LeadFormSection`, `package.json`, `page.tsx` da home (apenas os seus componentes filhos)

---

## 1 · Comandos a executar (no teu terminal Windows)

```bash
# 1) Posicionar-se no repositório local
cd C:\RSMM\SITE2\pdw-site-v2

# 2) Garantir que estás em main, atualizado
git checkout main
git pull

# 3) Criar branch para este PR
git checkout -b feat/v2-pages-and-admin

# 4) (Aqui vão as copies dos ficheiros — ver tabela na secção 2)

# 5) Testar localmente ANTES de fazer commit
pnpm install       # se houver dependências novas (não há nenhuma neste PR)
pnpm dev           # abrir http://localhost:3000/pt e verificar
pnpm build         # TEM de passar antes do commit

# 6) Commitar
git add .
git commit -m "feat(pages): nova versão de Sobre, Solução, Privacidade, Termos + /admin gated

- Home: hero editorial, pillars com imagem isométrica, modal de vídeo conceito
- Sobre: KPI strip, equipa, parceiros (TecMinho em destaque), normas EU
- Solução: Trust Triangle interativo, fluxo, features
- Privacidade/Termos: conteúdo pt-PT formal alinhado com RGPD
- /admin: rota oculta com gate por middleware
- Casos: featured case no topo com foto real e métricas
- i18n: novas chaves privacy.doc e terms.doc em pt + en

Refs design system: PDW Design System (sandbox)"

# 7) Push e abrir PR
git push -u origin feat/v2-pages-and-admin
# Depois: ir ao GitHub e clicar "Compare & pull request"
```

---

## 2 · Tabela de ficheiros (origem → destino)

> Todos os caminhos de origem são **relativos a este pacote** `handoff_pdw_site_v2/`. Os de destino são **relativos à raiz do `pdw-site-v2`**.

### Substituir (4 ficheiros)

| Origem (`handoff_pdw_site_v2/...`) | Destino (`pdw-site-v2/...`) | Notas |
|---|---|---|
| `src/app/[lang]/sobre/page.tsx` | `src/app/[lang]/sobre/page.tsx` | Substituir |
| `src/app/[lang]/solucao/page.tsx` | `src/app/[lang]/solucao/page.tsx` | Substituir |
| `src/app/[lang]/privacidade/page.tsx` | `src/app/[lang]/privacidade/page.tsx` | Substituir |
| `src/app/[lang]/termos/page.tsx` | `src/app/[lang]/termos/page.tsx` | Substituir |

### Adicionar (10 ficheiros novos)

| Origem | Destino |
|---|---|
| `src/components/sections/PageHero.tsx` | `src/components/sections/PageHero.tsx` |
| `src/components/sections/SobreContent.tsx` | `src/components/sections/SobreContent.tsx` |
| `src/components/sections/SolucaoContent.tsx` | `src/components/sections/SolucaoContent.tsx` |
| `src/components/sections/TrustTriangle.tsx` | `src/components/sections/TrustTriangle.tsx` |
| `src/components/sections/FeaturedCase.tsx` | `src/components/sections/FeaturedCase.tsx` |
| `src/components/sections/HeroInstitutional.tsx` | `src/components/sections/HeroInstitutional.tsx` ⚠️ substitui o existente |
| `src/components/sections/ValuePillars.tsx` | `src/components/sections/ValuePillars.tsx` ⚠️ substitui o existente |
| `src/components/legal/LegalDocument.tsx` | `src/components/legal/LegalDocument.tsx` |
| `src/components/ui/VideoModal.tsx` | `src/components/ui/VideoModal.tsx` |
| `src/app/[lang]/admin/layout.tsx` | `src/app/[lang]/admin/layout.tsx` |
| `src/app/[lang]/admin/page.tsx` | `src/app/[lang]/admin/page.tsx` |
| `src/middleware.ts` | `src/middleware.ts` |

### Patches manuais (2)

#### a) Acrescentar CSS ao `globals.css`
Abrir `pdw-site-v2/src/app/globals.css` e **acrescentar no final** o conteúdo de `handoff_pdw_site_v2/globals.append.css`. Em PowerShell:

```powershell
Get-Content handoff_pdw_site_v2\globals.append.css | Add-Content pdw-site-v2\src\app\globals.css
```

#### b) Acrescentar chaves ao `i18n/locales/pt.json` e `en.json`
O ficheiro `handoff_pdw_site_v2/i18n-additions.json` contém:
- `privacy.doc` → fundir em `pt.json` → `privacy.doc`
- `terms.doc` → fundir em `pt.json` → `terms.doc`

**Faz à mão** (5 min) ou usa este snippet Node.js:

```js
// merge-i18n.js — correr da raiz do pdw-site-v2
const fs = require('fs');
const additions = require('../handoff_pdw_site_v2/i18n-additions.json');
['pt', 'en'].forEach(lang => {
  const path = `src/i18n/locales/${lang}.json`;
  const dict = JSON.parse(fs.readFileSync(path, 'utf8'));
  dict.privacy = dict.privacy || {};
  dict.terms   = dict.terms   || {};
  dict.privacy.doc = additions['privacy.doc'];
  dict.terms.doc   = additions['terms.doc'];
  // ⚠️ TRADUZIR `terms.doc` e `privacy.doc` para inglês em en.json antes de fazer o build.
  fs.writeFileSync(path, JSON.stringify(dict, null, 2));
});
```

> **Importante** sobre en.json: as constantes de Privacidade/Termos estão em pt-PT. Para o inglês, **traduz** o conteúdo dentro do `en.json` antes do build, ou aponta o `LegalDocument` para uma fallback (forma mais rápida agora: copiar a mesma estrutura em pt para en, traduzir depois).

### Variável de ambiente

Adicionar ao `.env.local`:
```
PDW_ADMIN_TOKEN=<gera-uma-string-aleatória-longa>
```
E **NÃO** comitar este `.env.local` (já deve estar no `.gitignore`).

---

## 3 · Checklist antes de fazer push

- [ ] `pnpm build` passou sem erros.
- [ ] `pnpm dev` abre http://localhost:3000/pt sem warnings no console.
- [ ] `/pt/sobre`, `/pt/solucao`, `/pt/privacidade`, `/pt/termos` carregam.
- [ ] Vídeo conceito abre ao clicar no botão do hero (Esc fecha).
- [ ] Trust Triangle: cliques nos 3 nós trocam o painel à direita.
- [ ] `/pt/admin` **redireciona** para `/pt` (sem cookie). Com `?admin_dev=1` deixa passar em dev.
- [ ] Formulário de contacto continua a funcionar (envia para Resend).
- [ ] Lighthouse mobile do home ≥ 90.

---

## 4 · No GitHub (depois do push)

1. Abrir https://github.com/rshermans/pdw-site-v2/compare/main...feat/v2-pages-and-admin
2. Título do PR:
   ```
   feat(pages): produção de Sobre, Solução, Privacidade, Termos + /admin
   ```
3. Descrição: copiar a mensagem do commit (passo 6) + colar 2-3 screenshots dos preview Vercel.
4. **Atribuir reviewer** — pelo menos uma pessoa do consórcio antes de fazer merge.
5. Quando o preview Vercel ficar verde + revisão aprovada → **merge** com squash.

---

## 5 · Se algo correr mal

| Sintoma | O que verificar |
|---|---|
| `pnpm build` falha com erro de import | Verificar que copiaste TODOS os componentes da secção 2 (estão a importar-se uns aos outros). |
| Página `/sobre` rebenta com `dict.about.team.members.map is not a function` | i18n não foi atualizado — fazer o passo 2.b. |
| Vídeo não toca | Verificar que `public/concept_video.mp4` existe no repo (já existe, não precisa copiar). |
| `/admin` mostra a página em vez de redirecionar | `middleware.ts` não foi copiado para `src/middleware.ts` (NÃO em `src/app/middleware.ts`). |
| Estilo do hero parece partido | Verificar que o CSS foi anexado a `globals.css` (passo 2.a). |

---

## 6 · Próximos PRs (depois deste)

- **PR 2 (Fase 1 continuação):** Solução com `trust-triangle.png` + `Como-funciona.png` reais
- **PR 3 (Fase 2):** Pull-quote editorial + banner numérico + ritmo visual
- **PR 4 (Fase 3):** Fotos reais + ícones custom dos casos de uso

Diz-me quando este PR estiver merged que avançamos.
