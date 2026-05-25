# PDW Feed de Atualidades + Admin — Guia de Aplicação

Pacote pronto a colar dentro do teu projeto **pdw-site-v2/**.

## O que está aqui

```
code/
├── migrations/
│   └── 001_feed.sql                          # Esquema SQLite (posts, likes, comments, media)
└── src/
    ├── lib/
    │   ├── db.ts                             # SUBSTITUI o existente — adiciona migrate automático
    │   ├── embed-parser.ts                   # Detecta provider + oEmbed best-effort
    │   └── posts-db.ts                       # CRUD posts/likes/media
    ├── app/
    │   ├── globals.append.feed.css           # APPEND ao globals.css
    │   ├── [lang]/
    │   │   ├── admin/page.tsx                # SUBSTITUI — dashboard com tabs
    │   │   └── atualidades/page.tsx          # NOVO — feed público
    │   └── api/
    │       ├── admin/
    │       │   ├── posts/route.ts            # GET list + POST create
    │       │   ├── posts/[id]/route.ts       # PATCH + DELETE
    │       │   ├── embed/route.ts            # POST → parse URL
    │       │   ├── upload/route.ts           # POST multipart upload
    │       │   └── media/route.ts            # GET list media
    │       └── public/
    │           ├── posts/route.ts            # GET feed público
    │           └── likes/route.ts            # POST like/unlike
    ├── components/
    │   ├── admin/
    │   │   ├── AdminTabs.tsx
    │   │   ├── PostsManager.tsx
    │   │   └── MediaLibrary.tsx
    │   └── atualidades/
    │       ├── EmbedRenderer.tsx
    │       ├── FeedMural.tsx
    │       └── PostCard.tsx
    └── i18n/locales/
        ├── pt.feed.json                      # MERGE com pt.json
        └── en.feed.json                      # MERGE com en.json
```

## Como aplicar (10 minutos)

### 1. Branch limpa

```bash
cd /caminho/para/pdw-site-v2
git status                       # garante que está tudo commitado
git checkout -b feat/feed-atualidades
```

### 2. Copiar ficheiros

**Substituir** (cuidado — guarda backup):
- `src/lib/db.ts` ← `code/src/lib/db.ts`
- `src/app/[lang]/admin/page.tsx` ← `code/src/app/[lang]/admin/page.tsx`

**Novos** — copiar directamente:
- Toda a árvore `src/lib/{embed-parser,posts-db}.ts`
- Toda a árvore `src/app/[lang]/atualidades/`
- Toda a árvore `src/app/api/{admin,public}/`
- Toda a árvore `src/components/{admin,atualidades}/`
- `migrations/` (na raiz do projeto, **não dentro de src/**)

### 3. Append ao CSS global

Abre `src/app/globals.css` e cola **no fim** o conteúdo de
`code/src/app/globals.append.feed.css`.

### 4. Merge das traduções

Abre `src/i18n/locales/pt.json` e funde as chaves de `pt.feed.json` no
objecto raiz (dentro das chaves `feed` e `nav`). Faz o mesmo para `en.json`.

### 5. Variáveis de ambiente

Adiciona ao `.env.local`:

```env
PDW_ADMIN_TOKEN=                  # já existe se admin já funciona
PDW_LIKES_SECRET=troca-isto       # salt para hash de visitantes
```

### 6. Adicionar link no header

Em `src/components/layout/PdwHeader.tsx`, no array `navItems`, acrescenta:

```ts
{ href: `/${lang}/atualidades`, label: dict.nav.news },
```

### 7. Criar pastas de uploads

```bash
mkdir -p public/uploads/videos public/uploads/logos public/uploads/images
echo "*" > public/uploads/.gitignore   # não comitar uploads para o repo
```

### 8. Instalar / correr

```bash
npm install                       # better-sqlite3 já está nas deps
npm run dev
```

Abre:
- `http://localhost:3000/pt/admin?admin_dev=1` (modo dev bypass auth)
- `http://localhost:3000/pt/atualidades`

### 9. Commit + push

```bash
git add .
git commit -m "feat: feed de atualidades + admin (PRD #N)"
git push -u origin feat/feed-atualidades
```

## Decisões de arquitectura

### Auth do /api/admin/*
O middleware existente só protege rotas HTML (matcher exclui `api/`). Cada endpoint admin valida o cookie `pdw_admin` directamente. Em DEV, `?admin_dev=1` bypassa.

### Embeds: oEmbed + iframes oficiais
- **YouTube** usa `youtube-nocookie.com/embed/{id}` (privacy-enhanced).
- **Spotify** usa `open.spotify.com/embed/{kind}/{id}` (player oficial).
- **LinkedIn / Instagram / X** mostram um *card linkado* (não embedam — os iframes oficiais destas plataformas exigem scripts third-party com cookies, o que é problemático em RGPD). Quando o utilizador clica, abre na rede social.
- Detecção é por regex local (`detectEmbed`). Enriquecimento de título/thumbnail é via oEmbed público (sem chaves API), com timeout de 4s e fallback silencioso.

### Likes anónimos
`visitor_hash = sha256(SECRET + IP + UserAgent)`. Não armazena IP em claro, RGPD-friendly. UNIQUE(post_id, visitor_hash) impede duplicação. Optimistic UI no cliente.

### Comentários (fase 2)
A tabela `post_comments` já existe. A coluna `comments_enabled` no post permite habilitar por post. Quando quiseres ligar:
1. Criar `POST /api/public/comments` (escreve com `status='pending'`)
2. Criar `/admin/comments` com fila de moderação
3. Activar checkbox no compose

Não há ainda nenhum código a expor comentários — zero risco de spam até decidires.

## Próximos passos sugeridos

1. **Worker para publicar agendados**: cron Vercel ou Netlify scheduled function que faz `UPDATE posts SET status='published', published_at=now() WHERE status='scheduled' AND scheduled_at <= now()`.
2. **Sitemap**: adicionar `/atualidades` ao `src/app/sitemap.ts` e gerar entries por post publicado.
3. **RSS feed**: `app/[lang]/atualidades/rss.xml/route.ts` que serve XML — ótimo para subscritores e para indexação.
4. **Notificações ao admin**: usar o Resend (já configurado para leads) quando um post é submetido por um editor não-admin (caso queiras multi-utilizador).
5. **Imagens responsivas**: o `EmbedRenderer` usa `<Image>` do Next; configurar `next.config.mjs` com `images.remotePatterns` se vais carregar de CDN externo.

## Limitações conhecidas

- **SQLite + Vercel**: o filesystem de Vercel serverless é efémero. Se hospedas em Vercel, a `pdw.db` precisa de migrar para um Postgres (Vercel Postgres / Neon / Supabase). O `posts-db.ts` está suficientemente isolado para essa troca ser fácil.
- **Uploads em produção**: idem. Em Netlify/Vercel, `/public/uploads` não persiste. Para self-hosted (Docker, VPS) funciona como está.
- **Comentários em tempo real**: não há WebSockets. Quando fizeres comentários, considera polling de 30s ou Server-Sent Events.
