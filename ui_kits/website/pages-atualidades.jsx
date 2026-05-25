// PDW · Atualidades (News) — content the admin can update without code.
//
// Item types: youtube · linkedin · instagram · podcast · press
// Each item lives in a single data array (later: backed by a CMS/DB).
// On the public page we render a filterable feed.
// On /admin/atualidades we render a CMS-like manager with a form.

const { useState: useStateAtual, useMemo: useMemoAtual } = React;

// ====== Demo data (replaced by API/CMS in production) ======
const ATUALIDADES_SEED = [
  {
    id: "n1",
    type: "youtube",
    date: "2026-05-08",
    title: "PDW · Vídeo conceito institucional",
    description: "Apresentação da Portuguese Digital Wallet no contexto da Agenda Blockchain.PT.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    source: "Canal oficial PDW"
  },
  {
    id: "n2",
    type: "press",
    date: "2026-04-22",
    title: "Universidade do Minho passa a emitir diplomas digitais via PDW",
    description: "A UMinho torna-se a primeira instituição portuguesa a emitir diplomas verificáveis em formato W3C VC.",
    url: "https://example.com/noticia-uminho-diplomas",
    source: "Público",
    image: "../../assets/Imagem-home.png"
  },
  {
    id: "n3",
    type: "linkedin",
    date: "2026-04-15",
    title: "TecMinho anuncia entrada da PDW em produção",
    description: "Publicação institucional sobre o go-live da fase de produção, com agradecimento ao consórcio.",
    url: "https://www.linkedin.com/feed/update/example",
    source: "TecMinho"
  },
  {
    id: "n4",
    type: "podcast",
    date: "2026-03-30",
    title: "Identidade digital: o que muda em Portugal — entrevista a Pedro Xavier",
    description: "Episódio especial sobre o impacto da PDW na soberania digital portuguesa.",
    url: "https://open.spotify.com/embed/episode/example",
    source: "Podcast «Estado Digital» · ep. 47",
    duration: "42 min"
  },
  {
    id: "n5",
    type: "instagram",
    date: "2026-03-12",
    title: "Bastidores da PDW: equipa em encontro técnico do EBSI",
    description: "Carrossel da participação da equipa no encontro europeu da EBSI, em Bruxelas.",
    url: "https://www.instagram.com/p/example",
    source: "@tecminho"
  },
  {
    id: "n6",
    type: "press",
    date: "2026-02-28",
    title: "Portugal entre os primeiros países a operacionalizar identidade auto-soberana",
    description: "Cobertura editorial sobre o posicionamento estratégico de Portugal na carteira europeia.",
    url: "https://example.com/eco-pdw",
    source: "ECO"
  }
];

const TYPE_LABEL = {
  youtube:   "Vídeo",
  linkedin:  "LinkedIn",
  instagram: "Instagram",
  podcast:   "Podcast",
  press:     "Imprensa"
};

const TYPE_ICON = {
  youtube:   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>,
  linkedin:  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.25 6.5 1.78 1.78 0 0 1 6.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>,
  instagram: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
  podcast:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v4"/><path d="M8 23h8"/></svg>,
  press:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V4z"/><path d="M18 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2"/><path d="M8 8h6M8 12h6M8 16h4"/></svg>
};

// ====== Item rendering by type ======
function YouTubeItem({ item }) {
  return (
    <article className="atual-card atual-card-youtube">
      <div className="atual-embed">
        <iframe
          src={item.url}
          title={item.title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <AtualMeta item={item}/>
    </article>
  );
}

function PodcastItem({ item }) {
  return (
    <article className="atual-card atual-card-podcast">
      <div className="atual-podcast-player">
        <div className="atual-podcast-art" aria-hidden="true">
          {TYPE_ICON.podcast}
        </div>
        <div className="atual-podcast-info">
          <div className="atual-podcast-source">{item.source}</div>
          <div className="atual-podcast-title">{item.title}</div>
          <div className="atual-podcast-bar">
            <span className="atual-podcast-progress" style={{width: '32%'}}></span>
          </div>
          <div className="atual-podcast-time">
            <span>14:08</span>
            <span>{item.duration}</span>
          </div>
        </div>
        <button className="atual-podcast-play" aria-label="Reproduzir episódio">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>
      <AtualMeta item={item}/>
    </article>
  );
}

function PressItem({ item }) {
  return (
    <article className="atual-card atual-card-press">
      <a className="atual-press-link" href={item.url} target="_blank" rel="noopener noreferrer">
        {item.image && (
          <div className="atual-press-image">
            <img src={item.image} alt=""/>
          </div>
        )}
        <div className="atual-press-body">
          <AtualMeta item={item}/>
        </div>
      </a>
    </article>
  );
}

function SocialItem({ item }) {
  // LinkedIn / Instagram — captioned card linking to the original
  // (full embeds require auth proxies; this is the institutional version)
  const isLinkedIn = item.type === 'linkedin';
  return (
    <article className={`atual-card atual-card-${item.type}`}>
      <a className="atual-social-link" href={item.url} target="_blank" rel="noopener noreferrer">
        <div className="atual-social-header">
          <span className="atual-social-platform">{TYPE_ICON[item.type]} {TYPE_LABEL[item.type]}</span>
          <span className="atual-social-handle">{item.source}</span>
        </div>
        <div className="atual-social-body">
          <p>{item.description}</p>
          {isLinkedIn
            ? <span className="atual-social-cta">Ler publicação no LinkedIn →</span>
            : <span className="atual-social-cta">Ver no Instagram →</span>
          }
        </div>
      </a>
      <AtualMeta item={item} hideDescription/>
    </article>
  );
}

function AtualMeta({ item, hideDescription }) {
  const date = new Date(item.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' });
  return (
    <div className="atual-meta">
      <div className="atual-meta-head">
        <span className={`atual-tag atual-tag-${item.type}`}>
          {TYPE_ICON[item.type]} {TYPE_LABEL[item.type]}
        </span>
        <time className="atual-date">{date}</time>
      </div>
      <h3 className="atual-title">{item.title}</h3>
      {!hideDescription && <p className="atual-desc">{item.description}</p>}
      <div className="atual-source">{item.source}</div>
    </div>
  );
}

function AtualItem({ item }) {
  switch (item.type) {
    case 'youtube':   return <YouTubeItem item={item}/>;
    case 'podcast':   return <PodcastItem item={item}/>;
    case 'press':     return <PressItem item={item}/>;
    case 'linkedin':
    case 'instagram': return <SocialItem item={item}/>;
    default:          return <PressItem item={item}/>;
  }
}

// ====== Page header ======
function AtualHeader() {
  return (
    <header className="page-hero">
      <span className="eyebrow">Atualidades</span>
      <h1 className="page-hero-title">
        <span className="text-gradient">A PDW em movimento.</span>
      </h1>
      <p className="page-hero-lead">
        Cobertura institucional, vídeos, podcasts e publicações em redes sociais. Atualizado
        diretamente pela equipa de comunicação da TecMinho via painel de administração.
      </p>
    </header>
  );
}

// ====== Public Atualidades page ======
function AtualidadesPage() {
  const [filter, setFilter] = useStateAtual('all');
  const items = ATUALIDADES_SEED;

  const counts = useMemoAtual(() => {
    const c = { all: items.length };
    items.forEach(i => { c[i.type] = (c[i.type] || 0) + 1; });
    return c;
  }, [items]);

  const filters = [
    { v: 'all',       label: 'Todas' },
    { v: 'youtube',   label: 'Vídeos' },
    { v: 'press',     label: 'Imprensa' },
    { v: 'podcast',   label: 'Podcasts' },
    { v: 'linkedin',  label: 'LinkedIn' },
    { v: 'instagram', label: 'Instagram' },
  ];

  const visible = items
    .filter(i => filter === 'all' || i.type === filter)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <article className="atualidades-page">
      <AtualHeader/>

      <div className="atual-filter" role="tablist" aria-label="Filtrar por tipo">
        {filters.map(f => (
          <button
            key={f.v}
            type="button"
            role="tab"
            aria-selected={filter === f.v}
            className={`atual-filter-tab ${filter === f.v ? 'is-active' : ''}`}
            onClick={() => setFilter(f.v)}
          >
            {f.label}
            <span className="atual-filter-count">{counts[f.v] || 0}</span>
          </button>
        ))}
      </div>

      <div className="atual-feed">
        {visible.map(it => <AtualItem key={it.id} item={it}/>)}
        {visible.length === 0 && (
          <div className="atual-empty">Sem entradas para este filtro.</div>
        )}
      </div>
    </article>
  );
}

// ====== Admin · Atualidades manager ======
function AtualAdminPage() {
  const [items, setItems] = useStateAtual(ATUALIDADES_SEED);
  const [editing, setEditing] = useStateAtual(null); // null | {…item} | 'new'

  const startNew = () => setEditing({
    id: `n${Date.now()}`,
    type: 'youtube',
    date: new Date().toISOString().slice(0,10),
    title: '',
    description: '',
    url: '',
    source: ''
  });

  const save = (draft) => {
    setItems(prev => {
      const exists = prev.find(p => p.id === draft.id);
      return exists ? prev.map(p => p.id === draft.id ? draft : p) : [draft, ...prev];
    });
    setEditing(null);
  };

  const remove = (id) => {
    if (!confirm('Eliminar esta entrada?')) return;
    setItems(prev => prev.filter(p => p.id !== id));
  };

  return (
    <article className="admin-atual">
      <header className="admin-atual-head">
        <div>
          <span className="eyebrow">Painel interno</span>
          <h1 className="admin-atual-title">Atualidades · gestão de conteúdo</h1>
          <p className="admin-atual-deck">
            Adicione, edite e remova entradas da página pública <code>/atualidades</code>.
            As alterações ficam visíveis no site sem necessidade de novo deploy.
          </p>
        </div>
        <button className="cta cta-disruptive" onClick={startNew}>+ Nova entrada</button>
      </header>

      <table className="admin-atual-table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Título</th>
            <th>Data</th>
            <th>Origem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map(it => (
            <tr key={it.id}>
              <td><span className={`atual-tag atual-tag-${it.type}`}>{TYPE_ICON[it.type]} {TYPE_LABEL[it.type]}</span></td>
              <td className="admin-atual-tcell">{it.title}</td>
              <td className="admin-atual-dcell">{new Date(it.date).toLocaleDateString('pt-PT')}</td>
              <td className="admin-atual-scell">{it.source}</td>
              <td>
                <button className="admin-row-btn" onClick={() => setEditing(it)}>Editar</button>
                <button className="admin-row-btn admin-row-btn-danger" onClick={() => remove(it.id)}>Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <AtualEditor
          draft={editing}
          onSave={save}
          onCancel={() => setEditing(null)}
        />
      )}
    </article>
  );
}

function AtualEditor({ draft, onSave, onCancel }) {
  const [d, setD] = useStateAtual(draft);
  const set = (k, v) => setD(prev => ({ ...prev, [k]: v }));
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content admin-atual-modal" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h3 className="modal-title">{draft.title ? 'Editar entrada' : 'Nova entrada'}</h3>
          <button className="modal-close" onClick={onCancel} aria-label="Fechar">
            <Icon name="x" size={18}/>
          </button>
        </header>
        <div className="modal-body admin-atual-form">
          <label className="admin-atual-field">
            <span>Tipo</span>
            <select value={d.type} onChange={e => set('type', e.target.value)}>
              <option value="youtube">YouTube · vídeo</option>
              <option value="podcast">Podcast · Spotify / Apple</option>
              <option value="press">Imprensa · artigo</option>
              <option value="linkedin">LinkedIn · publicação</option>
              <option value="instagram">Instagram · publicação</option>
            </select>
          </label>

          <label className="admin-atual-field">
            <span>Título</span>
            <input type="text" value={d.title} onChange={e => set('title', e.target.value)} placeholder="Ex.: PDW entra em produção na UMinho"/>
          </label>

          <label className="admin-atual-field">
            <span>Descrição curta</span>
            <textarea rows={3} value={d.description} onChange={e => set('description', e.target.value)} placeholder="2-3 frases sobre o conteúdo da entrada."/>
          </label>

          <div className="admin-atual-grid2">
            <label className="admin-atual-field">
              <span>Data de publicação</span>
              <input type="date" value={d.date} onChange={e => set('date', e.target.value)}/>
            </label>
            <label className="admin-atual-field">
              <span>Origem · canal · publicação</span>
              <input type="text" value={d.source} onChange={e => set('source', e.target.value)} placeholder="Ex.: ECO · Público · TecMinho"/>
            </label>
          </div>

          <label className="admin-atual-field">
            <span>URL ou embed
              <span className="admin-atual-help">
                {d.type === 'youtube'   && '— Cole o URL do vídeo. Será convertido em embed automaticamente.'}
                {d.type === 'podcast'   && '— Cole o URL do episódio Spotify ou Apple Podcasts.'}
                {d.type === 'press'     && '— URL completo do artigo. Abre em nova janela.'}
                {d.type === 'linkedin'  && '— URL da publicação no LinkedIn.'}
                {d.type === 'instagram' && '— URL da publicação no Instagram.'}
              </span>
            </span>
            <input type="url" value={d.url} onChange={e => set('url', e.target.value)} placeholder="https://..."/>
          </label>

          {d.type === 'press' && (
            <label className="admin-atual-field">
              <span>Imagem destacada (opcional)</span>
              <input type="text" value={d.image || ''} onChange={e => set('image', e.target.value)} placeholder="URL da imagem ou caminho relativo"/>
            </label>
          )}
        </div>
        <footer className="admin-atual-foot">
          <button className="btn-secondary" onClick={onCancel}>Cancelar</button>
          <button className="cta cta-disruptive" onClick={() => onSave(d)}>Guardar</button>
        </footer>
      </div>
    </div>
  );
}

Object.assign(window, { AtualidadesPage, AtualAdminPage });
