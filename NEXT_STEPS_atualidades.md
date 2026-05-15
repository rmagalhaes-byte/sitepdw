# Próximos passos · 19 de maio · Atualidades + storage SQLite

> **Objetivo:** retomar com a página pública `/atualidades` + painel `/admin/atualidades` (CRUD) + persistência em SQLite via `better-sqlite3`.
> **O que está pronto:** o desenho da página e do gestor está validado no design system (`ui_kits/website/pages-atualidades.jsx`). Falta levá-lo para o repositório com backend real.

---

## 1 · Decisões tomadas (recap)

| Decisão | Valor |
|---|---|
| Nome da rota pública | `/atualidades` (pt-PT formal) |
| Nome da rota de admin | `/admin/atualidades` |
| Tipos de conteúdo | YouTube · LinkedIn · Instagram · Podcast (Spotify/Apple) · Imprensa |
| Persistência | **SQLite** (1.ª fase) via `better-sqlite3` |
| Migração futura | Caminho aberto para Postgres/Supabase quando crescer |
| Auth do admin | Reutilizar o middleware do PR1 (`PDW_ADMIN_TOKEN`) |
| Embeds | YouTube e Spotify por iframe direto; LinkedIn e Instagram como **link cards** (evita problemas de CORS/oEmbed sem auth) |

---

## 2 · Schema SQLite

Ficheiro: `data/pdw.db` (gitignored). Migração inicial:

```sql
CREATE TABLE IF NOT EXISTS atualidades (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  type         TEXT    NOT NULL CHECK (type IN ('youtube','linkedin','instagram','podcast','press')),
  title        TEXT    NOT NULL,
  description  TEXT    NOT NULL DEFAULT '',
  url          TEXT    NOT NULL,
  source       TEXT    NOT NULL DEFAULT '',
  image        TEXT,
  date         TEXT    NOT NULL,                    -- ISO date YYYY-MM-DD
  duration     TEXT,                                -- só para podcast
  published    INTEGER NOT NULL DEFAULT 1,          -- 0/1 — rascunho vs publicado
  created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_atualidades_date ON atualidades(date DESC);
CREATE INDEX IF NOT EXISTS idx_atualidades_type ON atualidades(type);
```

Index secundário em `(published, date)` para a query pública.

---

## 3 · Estrutura de ficheiros a criar no `pdw-site-v2`

```
pdw-site-v2/
├── data/
│   └── pdw.db                                  ← criado em runtime, gitignore
├── src/
│   ├── lib/
│   │   ├── db.ts                               ← singleton better-sqlite3 + migrações
│   │   └── atualidades.ts                      ← queries tipadas (CRUD)
│   ├── app/
│   │   ├── [lang]/
│   │   │   ├── atualidades/
│   │   │   │   └── page.tsx                    ← rota pública (server component)
│   │   │   └── admin/
│   │   │       └── atualidades/
│   │   │           ├── page.tsx                ← listagem + ações
│   │   │           └── [id]/
│   │   │               └── edit/page.tsx       ← formulário de edição
│   │   └── api/
│   │       └── atualidades/
│   │           ├── route.ts                    ← GET (list) + POST (create)
│   │           └── [id]/
│   │               └── route.ts                ← GET single + PUT + DELETE
│   └── components/
│       └── atualidades/
│           ├── AtualHeader.tsx
│           ├── AtualFilters.tsx                ← client component (URL search params)
│           ├── AtualItem.tsx                   ← rota por tipo → sub-componentes
│           ├── YouTubeItem.tsx
│           ├── PodcastItem.tsx
│           ├── PressItem.tsx
│           ├── SocialItem.tsx
│           └── admin/
│               ├── AtualTable.tsx
│               └── AtualEditor.tsx             ← client component (form)
```

---

## 4 · Dependências a instalar

```bash
pnpm add better-sqlite3
pnpm add -D @types/better-sqlite3
```

> `better-sqlite3` é síncrono — perfeito para Server Components do Next 14+.
> Em Vercel **NÃO** funciona com Edge runtime. Forçar `export const runtime = 'nodejs'` em todas as rotas que tocam na DB.

---

## 5 · Pontos críticos a discutir a 19/05

1. **Onde fica o `data/pdw.db` em produção?**
   Em Vercel o filesystem é efémero. Opções:
   - (A) **Vercel KV / Vercel Postgres** — alternativa serverless-friendly.
   - (B) **Manter SQLite** e mudar para uma VM/Docker (Railway, Fly.io, droplet).
   - (C) **Turso (libSQL)** — SQLite gerido para serverless, drop-in.
   - **Sugestão:** SQLite local em dev; Turso em produção (mantém o schema, troca só a connection string).

2. **Como autenticar o admin nas rotas de API?**
   Reutilizar o cookie `pdw_admin` do PR1 ou subir para NextAuth com email allowlist?
   - **Sugestão:** continuar com cookie partilhado para MVP, migrar para NextAuth quando houver mais de 1 admin.

3. **Upload de imagens (campo `image` do tipo "press")**
   - (A) URL externo — o admin cola URL de imagem alojada algures.
   - (B) Upload local para `public/atualidades/` — simples, mas suja o repo.
   - (C) Vercel Blob — pago a partir de certa quota.
   - **Sugestão:** começar por (A) URL externo, migrar para Blob se incomodar.

4. **Embeds: confirmar comportamento de cada plataforma**
   - **YouTube:** iframe `https://www.youtube.com/embed/<id>` — ✓ funciona
   - **Spotify:** iframe `https://open.spotify.com/embed/episode/<id>` — ✓ funciona
   - **LinkedIn:** oEmbed exige API key + utilizador logado. → **link card** (sem embed)
   - **Instagram:** oEmbed deprecated para utilizadores sem app aprovada. → **link card**
   - **Apple Podcasts:** tem iframe de embed oficial. Adicionar como variante de podcast.

5. **Estados de publicação**
   Campo `published` (0/1) permite rascunhos. O admin pode preparar várias entradas e só publicar quando quiser. UI sugerida: toggle "Visível no site" + filtro "Mostrar rascunhos" no admin.

6. **Auditoria mínima**
   Cada operação de admin deve registar (em `data/pdw.db` ou stderr): timestamp · ação · id · admin. Para PMEs basta um `console.info` estruturado por agora.

---

## 6 · Trabalho preparatório que podes fazer antes de 19/05

- [ ] Decidir entre **SQLite local + Turso** ou **Vercel KV** para produção.
- [ ] Recolher 4-6 entradas reais para semear a base (canal YouTube, URLs do podcast, etc).
- [ ] Confirmar com o consórcio quem vai ter acesso ao `/admin/atualidades`.
- [ ] Verificar a política de RGPD para guardar URLs de redes sociais (não é dado pessoal, mas convém documentar).

---

## 7 · Esboço da página pública (já validado)

Layout no design system: `ui_kits/website/pages-atualidades.jsx`. Replica exatamente:
- Hero "A PDW em movimento"
- Filtros pílula (Todas · Vídeos · Imprensa · Podcasts · LinkedIn · Instagram)
- Grid responsivo, 1 cartão por entrada
- Cartões adaptam-se ao tipo (cor + ícone + treatment)

---

Quando voltarmos, começamos pelo passo 1: instalar `better-sqlite3` e ligar o singleton em `src/lib/db.ts`. Em 2-3 horas teremos página pública + admin a ler e escrever na DB.
