# Handoff Package · pdw-site-v2

> **🎯 PR 2 (agora):** abre `PR_GUIDE_2.md` — pequeno, 3 minutos.
> **🗓 19 de maio:** abre `NEXT_STEPS_atualidades.md` — plano para Atualidades + SQLite.
> **📚 PR 1 (já merged):** ver `PR_GUIDE.md` (arquivo).

Pacote pronto-a-copiar para o repositório de produção (`https://github.com/rshermans/pdw-site-v2`). Cada ficheiro indica o caminho de destino no comentário do topo.

## Conteúdo

```
handoff_pdw_site_v2/
├── README.md                                  ← este ficheiro
├── HANDOFF.md                                 ← guia detalhado (raiz do projeto)
├── i18n-additions.json                        ← copy novo (merge em pt.json/en.json)
├── globals.append.css                         ← CSS novo (concat ao globals.css)
└── src/
    ├── app/[lang]/
    │   ├── sobre/page.tsx                    ← substituir o existente
    │   ├── solucao/page.tsx                  ← substituir o existente
    │   ├── privacidade/page.tsx              ← substituir o existente
    │   ├── termos/page.tsx                   ← substituir o existente
    │   └── admin/
    │       ├── layout.tsx                    ← novo · gate de auth
    │       └── page.tsx                      ← novo · dashboard com changelog
    ├── components/
    │   ├── sections/
    │   │   ├── PageHero.tsx                  ← novo · header partilhado
    │   │   ├── SobreContent.tsx              ← novo · secções da página Sobre
    │   │   ├── SolucaoContent.tsx            ← novo · secções da Solução
    │   │   ├── TrustTriangle.tsx             ← novo · client component
    │   │   └── AdminDashboard.tsx            ← novo · dashboard interno
    │   └── legal/
    │       └── LegalDocument.tsx             ← novo · privacidade + termos
    └── middleware.ts                          ← novo · gate `/admin`
```

## Ordem recomendada de port (PRs separados)

1. **Copy + i18n** (PR pequeno, não muda nada visualmente ainda) — merge `i18n-additions.json` em `src/i18n/locales/pt.json` e `en.json`.
2. **CSS** (PR pequeno, isolado) — appendar `globals.append.css` ao `src/app/globals.css`.
3. **Páginas legais** (Privacidade + Termos) — risco mais baixo, mais fácil de aprovar pelo DPO.
4. **Sobre** — depende dos dois PRs acima.
5. **Solução** — depende do `TrustTriangle.tsx` (client component).
6. **Admin gate** — independente, pode ir em qualquer altura.

## Convenções respeitadas

- **Server Components por defeito.** Apenas `TrustTriangle.tsx`, `LegalDocumentWithToc.tsx` e o dashboard de admin usam `"use client"`.
- **Path aliases `@/...`** — todos os imports usam o alias configurado no `tsconfig.json` do `pdw-site-v2`.
- **`Locale` import** vem de `@/i18n/config` (já existe).
- **`getDictionary`** vem de `@/i18n/dictionaries` (já existe).
- **Componentes existentes reutilizados**: `SectionHeading`, `AnimatedSection`, `LeadFormSection`, etc.

## NÃO mexer

- `src/app/api/contact/route.ts` — integração Resend ativa.
- `src/components/sections/LeadFormSection.tsx` — usado em `/contactos` e `/diplomas-digitais`.
- `src/app/[lang]/page.tsx` — home page (já está OK).
- Qualquer dependência em `package.json`.

## Como testar localmente antes do PR

```bash
git checkout -b design/<nome-da-pagina>
# copia os ficheiros
pnpm dev                    # → http://localhost:3000/pt/sobre
pnpm build                  # tem de passar antes do PR
pnpm lint                   # idem
```
