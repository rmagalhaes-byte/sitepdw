# PR Guide · PR 2 para `pdw-site-v2`

> **Objetivo:** atualizar a página `/solucao` para usar as imagens próprias da PDW em vez de elementos SVG sintéticos.
> **Tempo estimado:** 3 minutos.
> **Risco:** muito baixo — só toca em ficheiros da página `/solucao`.

---

## 0 · O que vai neste PR

✅ **Solução** — `TrustTriangle` agora usa `/trust-triangle.png` (ilustração oficial) com 3 abas pílula clicáveis
✅ **Solução** — fluxo «Como funciona» agora usa `/Como-funciona.png` (infográfico oficial)
✅ **CSS** — novos blocos `.trust-triangle-real`, `.trust-tab`, `.flow-image`

❌ **NÃO toca em:** home, formulário de contacto, restantes páginas

---

## 1 · Comandos

```bash
cd C:\RSMM\SITE2\pdw-site-v2
git checkout main && git pull          # garante que PR1 já está merged
git checkout -b feat/solucao-real-images

# Copiar os 3 ficheiros (ver tabela abaixo)
# Acrescentar o CSS novo a globals.css

pnpm dev    # http://localhost:3000/pt/solucao
pnpm build  # tem de passar

git add .
git commit -m "feat(solucao): usar trust-triangle.png e Como-funciona.png reais

Substitui o SVG hand-drawn e os cards de fluxo por imagens
oficiais da PDW. O TrustTriangle mantém a interatividade através
de 3 abas pílula. Sem alterações no formulário ou na home."

git push -u origin feat/solucao-real-images
```

---

## 2 · Ficheiros (origem → destino)

### Substituir (2 ficheiros)

| Origem (`handoff_pdw_site_v2/...`) | Destino (`pdw-site-v2/...`) |
|---|---|
| `src/components/sections/TrustTriangle.tsx` | `src/components/sections/TrustTriangle.tsx` |
| `src/components/sections/SolucaoContent.tsx` | `src/components/sections/SolucaoContent.tsx` |

### Adicionar (1 ficheiro novo)

| Origem | Destino |
|---|---|
| `src/components/sections/FlowImage.tsx` | `src/components/sections/FlowImage.tsx` |

### Append CSS

Acrescentar **apenas** o bloco identificado como `PR2 · Solução page` em `handoff_pdw_site_v2/globals.append.css` ao final de `pdw-site-v2/src/app/globals.css`.

Para evitar duplicar o que já fizeste no PR1, este bloco está claramente delimitado no ficheiro com:

```css
/* ============================================================
   PR2 · Solução page — Trust Triangle (real image) + Flow image
   ...
   ============================================================ */
```

Copia **apenas a partir desse comentário** até ao final do `globals.append.css`. As regras anteriores já foram aplicadas no PR1.

---

## 3 · Checklist antes do push

- [ ] `/pt/solucao` mostra a imagem `trust-triangle.png` com 3 botões pílula (Emissor · Utilizador · Verificador)
- [ ] Clicar nos botões muda o texto do painel debaixo deles
- [ ] Secção «Como funciona» mostra `Como-funciona.png` em moldura suave
- [ ] As imagens existem em `public/trust-triangle.png` e `public/Como-funciona.png` (já existiam — não copiar nada)
- [ ] `pnpm build` passou sem erros

---

## 4 · Se algo correr mal

| Sintoma | Causa provável |
|---|---|
| Imagem `trust-triangle.png` não aparece | Verificar caminho `/trust-triangle.png` em `public/`. Caso `next/image` recuse, verificar `next.config.js` para domínios externos (não devia ser preciso, é local). |
| Triângulo mostra mas botões não trocam o texto | `TrustTriangle.tsx` não tem `"use client"` no topo. Verificar. |
| Layout do triângulo fica desalinhado | CSS novo (`.trust-triangle-real`, `.trust-tab*`) não foi acrescentado ao `globals.css`. |

---

## 5 · Próximo passo

**19 de maio**, retomamos com a página `/atualidades` + `/admin/atualidades` + storage SQLite. O plano detalhado está em `NEXT_STEPS_atualidades.md` neste mesmo pacote.
