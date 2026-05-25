/* Shared icons, mock data, helpers for /atualidades + /admin mockups */

const Icon = ({ name, size = 16, color = "currentColor", stroke = 2 }) => {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const paths = {
    youtube: <><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M10 9l5 3-5 3z" fill={color} stroke="none"/></>,
    spotify: <><circle cx="12" cy="12" r="10"/><path d="M7 9c3-1 8-1 11 1M7 13c3-1 7-1 10 1M7 16c2-1 6-1 8 1"/></>,
    linkedin: <><rect x="2" y="2" width="20" height="20" rx="3"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill={color}/></>,
    x: <><path d="M4 4l16 16M20 4L4 20"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></>,
    play: <><polygon points="6 4 20 12 6 20" fill={color} stroke="none"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    heart: <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>,
    chat: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49"/></>,
    pin: <><path d="M12 2l-2 7H4l5 4-2 7 5-4 5 4-2-7 5-4h-6z"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></>,
    trash: <><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    chevron: <><polyline points="9 18 15 12 9 6"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
    list: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1" fill={color}/><circle cx="4" cy="12" r="1" fill={color}/><circle cx="4" cy="18" r="1" fill={color}/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
    sparkle: <><path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z"/></>,
    mapPin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    arrowUp: <><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></>,
  };
  return <svg {...props}>{paths[name]}</svg>;
};

const PROVIDER_META = {
  pdw:       { label: "PDW",       color: "#006c4b", logo: "PDW" },
  youtube:   { label: "YouTube",   color: "#FF0033" },
  spotify:   { label: "Spotify",   color: "#1DB954" },
  linkedin:  { label: "LinkedIn",  color: "#0A66C2" },
  instagram: { label: "Instagram", color: "#E1306C" },
  x:         { label: "X",         color: "#000000" },
  evento:    { label: "Evento",    color: "#1a3b5d" },
  imagem:    { label: "Imagem",    color: "#3d4a42" },
};

/* ----------- Mock posts data ------------- */
const MOCK_POSTS = [
  {
    id: "p1", type: "youtube", size: "wide",
    title: "Demo · Carteira PDW em 90 segundos",
    excerpt: "Como obter uma credencial verificável, partilhá-la e revogá-la.",
    embed: { videoId: "dQw4w9WgXcQ", duration: "1:32", views: "2.4K" },
    ts: "há 3 horas", likes: 84, comments: 12, pinned: true,
  },
  {
    id: "p2", type: "evento", size: "tall",
    title: "PDW no EBSI Summit 2026",
    excerpt: "Painel sobre interoperabilidade de carteiras na Europa.",
    event: { date: "28 MAI", time: "14:30", location: "Bruxelas · Berlaymont", rsvp: 132, countdown: "12 dias" },
    ts: "ontem", likes: 41, comments: 4,
  },
  {
    id: "p3", type: "spotify", size: "normal",
    title: "Podcast · Identidade Digital Soberana",
    excerpt: "Episódio 14 do Tech Sovereign com a equipa da PDW.",
    embed: { kind: "episode", duration: "42 min" },
    ts: "há 2 dias", likes: 28, comments: 3,
  },
  {
    id: "p4", type: "linkedin", size: "normal",
    title: "Post no LinkedIn · Lançamento v1.7",
    excerpt: "Marco importante: 10.000 carteiras activas em Portugal. Obrigado a todos…",
    embed: { author: "Portuguese Digital Wallet", reactions: 247 },
    ts: "há 4 dias", likes: 95, comments: 18,
  },
  {
    id: "p5", type: "imagem", size: "normal",
    title: "Equipa PDW · Demo Day em Guimarães",
    excerpt: "Workshop com investigadores da UMinho e parceiros do consórcio.",
    image: { alt: "Equipa em workshop", caption: "Workshop TecMinho, 12 Mai 2026" },
    ts: "há 5 dias", likes: 67, comments: 9,
  },
  {
    id: "p6", type: "instagram", size: "normal",
    title: "Instagram · Bastidores",
    excerpt: "@portuguesedigitalwallet",
    embed: { author: "portuguesedigitalwallet", likes: 312 },
    ts: "há 6 dias", likes: 22, comments: 2,
  },
  {
    id: "p7", type: "x", size: "wide",
    title: "X · Thread sobre EUDI Wallet",
    excerpt: "1/7 · A PDW alinha-se com o regulamento europeu eIDAS 2.0. Aqui está o que muda para os cidadãos →",
    embed: { author: "@PDW_PT", reposts: 78 },
    ts: "há 1 semana", likes: 113, comments: 24,
  },
  {
    id: "p8", type: "pdw", size: "normal",
    title: "Release · v1.7.3",
    excerpt: "Refactor de Sobre/Solução, widget de acessibilidade, voz pt-PT formal.",
    release: { version: "1.7.3" },
    ts: "há 1 semana", likes: 19, comments: 1,
  },
];

const STORIES = [
  { id: "s1", type: "youtube",   label: "Demo 90s",      seen: false },
  { id: "s2", type: "evento",    label: "EBSI Summit",   seen: false },
  { id: "s3", type: "spotify",   label: "Ep. 14",        seen: false },
  { id: "s4", type: "linkedin",  label: "v1.7 launch",   seen: true  },
  { id: "s5", type: "imagem",    label: "Demo Day",      seen: true  },
  { id: "s6", type: "instagram", label: "Bastidores",    seen: true  },
  { id: "s7", type: "x",         label: "Thread EUDI",   seen: true  },
  { id: "s8", type: "pdw",       label: "v1.7.3",        seen: true  },
];

/* ------ Striped placeholder used as image stand-in ------ */
const StripedPlaceholder = ({ label, height = "100%", color = "#006c4b" }) => (
  <div style={{
    height,
    width: "100%",
    background: `repeating-linear-gradient(135deg, ${color}11 0 12px, ${color}06 12px 24px)`,
    border: `1px dashed ${color}55`,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 11,
    color: `${color}aa`,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  }}>
    {label}
  </div>
);

Object.assign(window, {
  Icon, PROVIDER_META, MOCK_POSTS, STORIES, StripedPlaceholder,
});
