/* Admin /admin — Feed manager with smart compose, media library, logos */

const AdminTab = ({ active, label, count, icon, onClick }) => (
  <button onClick={onClick} style={{
    padding: "10px 16px",
    borderRadius: 10,
    border: 0,
    cursor: "pointer",
    background: active ? "#181c1e" : "transparent",
    color: active ? "#fff" : "#3d4a42",
    fontFamily: "inherit", fontSize: 13, fontWeight: active ? 600 : 500,
    display: "inline-flex", alignItems: "center", gap: 8,
    transition: "all .2s",
  }}>
    <Icon name={icon} size={14} color={active ? "#fff" : "#3d4a42"} />
    {label}
    {count != null && (
      <span style={{
        padding: "1px 7px", borderRadius: 999, fontSize: 10, fontWeight: 700,
        background: active ? "rgba(255,255,255,0.15)" : "rgba(0,108,75,0.08)",
        color: active ? "#fff" : "#006c4b",
      }}>{count}</span>
    )}
  </button>
);

/* ---------- Smart compose: paste-to-embed ---------- */
const ComposeBar = ({ onPaste, detectedProvider, urlValue, onChange }) => (
  <div style={{
    background: "#fff",
    border: "1px solid rgba(0,108,75,0.1)",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
      <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#181c1e", display: "flex", alignItems: "center", gap: 8 }}>
        <Icon name="sparkle" size={14} color="#006c4b" />
        Compor novo post
      </h2>
      <span style={{ fontSize: 11, color: "#3d4a42" }}>
        Cola um link ou começa do zero
      </span>
    </div>

    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "10px 12px", borderRadius: 12,
      background: "#f7fafc",
      border: detectedProvider ? `2px solid ${PROVIDER_META[detectedProvider].color}` : "2px solid transparent",
      transition: "all .2s",
    }}>
      <Icon name="link" size={16} color="#3d4a42" />
      <input
        type="text"
        value={urlValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://youtube.com/watch?v=… · https://open.spotify.com/… · https://linkedin.com/posts/…"
        style={{
          flex: 1, border: 0, background: "transparent",
          outline: "none", fontFamily: "inherit", fontSize: 13, color: "#181c1e",
        }}
      />
      {detectedProvider && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "5px 10px", borderRadius: 999,
          background: PROVIDER_META[detectedProvider].color,
          color: "#fff", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.05em", textTransform: "uppercase",
        }}>
          <Icon name={detectedProvider} size={11} color="#fff" stroke={2.4} />
          {PROVIDER_META[detectedProvider].label} detectado
        </div>
      )}
    </div>

    {/* Type selector for non-URL posts */}
    <div style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
      <span style={{ fontSize: 11, color: "#3d4a42", padding: "6px 8px 6px 0" }}>ou começar:</span>
      {[
        { id: "imagem", label: "Imagem + legenda", icon: "image" },
        { id: "evento", label: "Evento",   icon: "calendar" },
        { id: "pdw",    label: "Release",  icon: "sparkle"  },
      ].map(t => (
        <button key={t.id} style={{
          padding: "6px 12px", borderRadius: 999,
          border: "1px solid #d1d9e0", background: "#fff",
          fontSize: 11, color: "#3d4a42", cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "inherit",
        }}>
          <Icon name={t.icon} size={11} color="#3d4a42" />
          {t.label}
        </button>
      ))}
    </div>
  </div>
);

/* ---------- Embed preview after URL paste ---------- */
const EmbedPreview = ({ provider }) => {
  if (!provider) return null;
  const meta = PROVIDER_META[provider];
  return (
    <div style={{
      background: "#fff",
      border: "1px solid rgba(0,108,75,0.1)",
      borderRadius: 16, padding: 18,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <Icon name="eye" size={14} color="#3d4a42" />
        <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>Pré-visualização</h3>
        <span style={{
          marginLeft: "auto",
          fontSize: 10, padding: "3px 8px", borderRadius: 999,
          background: `${meta.color}14`, color: meta.color, fontWeight: 700,
          letterSpacing: "0.05em", textTransform: "uppercase",
        }}>
          {meta.label}
        </span>
      </div>

      {provider === "youtube" && (
        <div>
          <div style={{ aspectRatio: "16/9", borderRadius: 10, overflow: "hidden", position: "relative" }}>
            <StripedPlaceholder label="youtube thumbnail (auto-fetched)" color="#FF0033" />
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", background: "#FF0033",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name="play" size={22} color="#fff" />
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: "#3d4a42", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Título auto-detectado</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4, color: "#181c1e" }}>Demo · Carteira PDW em 90 segundos</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#3d4a42", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Duração</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4, color: "#181c1e" }}>1:32</div>
            </div>
          </div>
        </div>
      )}

      {/* Editable caption */}
      <div style={{ marginTop: 14 }}>
        <label style={{ fontSize: 10, color: "#3d4a42", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Legenda (opcional)
        </label>
        <textarea
          defaultValue="Como obter uma credencial verificável, partilhá-la e revogá-la."
          style={{
            display: "block", width: "100%", marginTop: 4,
            padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d9e0",
            fontSize: 12, fontFamily: "inherit", color: "#181c1e",
            resize: "vertical", minHeight: 60,
            outline: "none",
          }}
        />
      </div>
    </div>
  );
};

/* ---------- Schedule / publish controls ---------- */
const PublishControls = () => (
  <div style={{
    background: "#fff",
    border: "1px solid rgba(0,108,75,0.1)",
    borderRadius: 16,
    padding: 18,
  }}>
    <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700 }}>Publicação</h3>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#181c1e", cursor: "pointer" }}>
        <input type="checkbox" defaultChecked /> Fixar no topo do feed
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#181c1e", cursor: "pointer" }}>
        <input type="checkbox" defaultChecked /> Permitir likes
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#181c1e", cursor: "pointer" }}>
        <input type="checkbox" /> Permitir comentários
        <span style={{ marginLeft: "auto", fontSize: 10, color: "#3d4a42", padding: "2px 6px", borderRadius: 4, background: "#f0f0f0" }}>fase 2</span>
      </label>
      <hr style={{ border: 0, borderTop: "1px solid #eef2f0", margin: "4px 0" }}/>
      <label style={{ fontSize: 10, color: "#3d4a42", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        Agendar (opcional)
      </label>
      <input
        type="datetime-local"
        defaultValue="2026-05-17T09:00"
        style={{
          padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d9e0",
          fontSize: 12, fontFamily: "inherit",
        }}
      />
    </div>
    <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
      <button style={{
        flex: 1, padding: "11px 14px", borderRadius: 10, border: 0, cursor: "pointer",
        background: "#006c4b", color: "#fff", fontWeight: 700, fontSize: 13, fontFamily: "inherit",
      }}>Publicar agora</button>
      <button style={{
        padding: "11px 14px", borderRadius: 10, border: "1px solid #d1d9e0", cursor: "pointer",
        background: "#fff", color: "#181c1e", fontWeight: 600, fontSize: 13, fontFamily: "inherit",
      }}>Rascunho</button>
    </div>
  </div>
);

/* ---------- Posts list ---------- */
const PostsListItem = ({ post }) => {
  const meta = PROVIDER_META[post.type];
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "40px 1fr auto auto auto",
      gap: 12, alignItems: "center",
      padding: "12px 14px",
      borderRadius: 10,
      border: "1px solid transparent",
      transition: "all .15s",
      cursor: "pointer",
    }}
    onMouseEnter={e => { e.currentTarget.style.background = "#f7fafc"; e.currentTarget.style.borderColor = "rgba(0,108,75,0.12)"; }}
    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}>
      <div style={{
        width: 36, height: 36, borderRadius: 8,
        background: `${meta.color}14`, color: meta.color,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name={post.type === "pdw" ? "sparkle" : (post.type === "evento" ? "calendar" : (post.type === "imagem" ? "image" : post.type))} size={16} color={meta.color} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#181c1e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</span>
          {post.pinned && <Icon name="pin" size={11} color="#1a3b5d" />}
        </div>
        <div style={{ fontSize: 11, color: "#3d4a42" }}>
          {meta.label} · {post.ts}
        </div>
      </div>
      <div style={{ fontSize: 11, color: "#3d4a42", display: "flex", alignItems: "center", gap: 4 }}>
        <Icon name="heart" size={11} /> {post.likes}
      </div>
      <div style={{ fontSize: 11, color: "#3d4a42", display: "flex", alignItems: "center", gap: 4 }}>
        <Icon name="chat" size={11} /> {post.comments}
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        <button style={{ padding: 6, borderRadius: 6, border: 0, background: "transparent", cursor: "pointer", color: "#3d4a42" }}>
          <Icon name="edit" size={13} />
        </button>
        <button style={{ padding: 6, borderRadius: 6, border: 0, background: "transparent", cursor: "pointer", color: "#FF0033" }}>
          <Icon name="trash" size={13} />
        </button>
      </div>
    </div>
  );
};

/* ---------- Media library tab ---------- */
const MediaLibrary = () => {
  const videos = [
    { id: "v1", name: "concept_video.mp4", size: "12.4 MB", uses: 1, ts: "há 2 meses" },
    { id: "v2", name: "demo-carteira-90s.mp4", size: "8.1 MB", uses: 1, ts: "há 1 semana" },
    { id: "v3", name: "testemunho-uminho.mp4", size: "24.7 MB", uses: 0, ts: "há 3 dias" },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Biblioteca de vídeos</h3>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#3d4a42" }}>
            Ficheiros guardados em <code style={{ fontFamily: "ui-monospace, monospace", padding: "1px 5px", borderRadius: 4, background: "#f0f0f0" }}>/public/uploads/videos</code>
          </p>
        </div>
        <button style={{
          padding: "10px 14px", borderRadius: 10,
          background: "#006c4b", color: "#fff",
          border: 0, cursor: "pointer", fontWeight: 600, fontSize: 12,
          display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "inherit",
        }}>
          <Icon name="upload" size={13} color="#fff" />
          Carregar vídeo
        </button>
      </div>

      {/* Drop zone */}
      <div style={{
        marginBottom: 16,
        border: "2px dashed rgba(0,108,75,0.3)",
        borderRadius: 14,
        padding: 24,
        textAlign: "center",
        background: "rgba(0,108,75,0.02)",
      }}>
        <Icon name="upload" size={28} color="#006c4b" />
        <div style={{ marginTop: 10, fontSize: 13, fontWeight: 600, color: "#181c1e" }}>
          Arrasta aqui um MP4, MOV ou WebM
        </div>
        <div style={{ marginTop: 4, fontSize: 11, color: "#3d4a42" }}>
          Máx. 200 MB · será gerada thumbnail automática
        </div>
      </div>

      {/* List */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {videos.map(v => (
          <div key={v.id} style={{
            background: "#fff",
            border: "1px solid rgba(0,108,75,0.1)",
            borderRadius: 12,
            overflow: "hidden",
          }}>
            <div style={{ position: "relative", aspectRatio: "16/9" }}>
              <StripedPlaceholder label="video poster" color="#1a3b5d" />
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "rgba(0,0,0,0.6)", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon name="play" size={16} color="#fff" />
                </div>
              </div>
              {v.uses > 0 && (
                <div style={{
                  position: "absolute", top: 8, left: 8,
                  padding: "2px 7px", borderRadius: 4,
                  background: "#006c4b", color: "#fff",
                  fontSize: 10, fontWeight: 700,
                }}>EM USO</div>
              )}
            </div>
            <div style={{ padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#181c1e", marginBottom: 3,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}>{v.name}</div>
              <div style={{ fontSize: 11, color: "#3d4a42" }}>
                {v.size} · {v.ts}
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                <button style={{
                  flex: 1, padding: "6px 10px", borderRadius: 7, fontSize: 11,
                  border: "1px solid #d1d9e0", background: "#fff", cursor: "pointer", fontFamily: "inherit",
                  color: "#181c1e", fontWeight: 600,
                }}>Substituir</button>
                <button style={{
                  padding: 7, borderRadius: 7, border: "1px solid #d1d9e0",
                  background: "#fff", cursor: "pointer", color: "#3d4a42",
                }}>
                  <Icon name="trash" size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- Logos tab ---------- */
const LogosManager = () => {
  const logos = [
    { id: "l1", name: "pdw_logo.png",       slot: "Header · Footer", status: "active" },
    { id: "l2", name: "uminho_logo.png",    slot: "Footer parceiros",  status: "active" },
    { id: "l3", name: "tcminho-logo.png",   slot: "Footer parceiros",  status: "active" },
    { id: "l4", name: "logo-ebsi.png",      slot: "TrustBar",          status: "active" },
    { id: "l5", name: "logo-Blockchain-pt.png", slot: "TrustBar",      status: "active" },
    { id: "l6", name: "PRR.png",            slot: "Financiadores",     status: "active" },
    { id: "l7", name: "FEU.png",            slot: "Financiadores",     status: "active" },
    { id: "l8", name: "RP.png",             slot: "Financiadores",     status: "active" },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Logos de parceiros e financiadores</h3>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#3d4a42" }}>
            Mantém os ficheiros em <code style={{ fontFamily: "ui-monospace, monospace", padding: "1px 5px", borderRadius: 4, background: "#f0f0f0" }}>/public</code> e a sua atribuição a cada secção do site.
          </p>
        </div>
        <button style={{
          padding: "10px 14px", borderRadius: 10,
          background: "#006c4b", color: "#fff",
          border: 0, cursor: "pointer", fontWeight: 600, fontSize: 12,
          display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "inherit",
        }}>
          <Icon name="plus" size={13} color="#fff" />
          Adicionar logo
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {logos.map(l => (
          <div key={l.id} style={{
            background: "#fff",
            border: "1px solid rgba(0,108,75,0.1)",
            borderRadius: 12, padding: 12,
          }}>
            <div style={{
              height: 64, borderRadius: 8,
              background: "#f7fafc", border: "1px solid #eef2f0",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 10,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 10, color: "#3d4a42aa", textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}>{l.name.split('.')[0]}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#181c1e",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              fontFamily: "ui-monospace, monospace",
            }}>{l.name}</div>
            <div style={{ fontSize: 10, color: "#3d4a42", marginTop: 2 }}>{l.slot}</div>
            <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
              <button style={{
                flex: 1, padding: "5px 8px", borderRadius: 6, fontSize: 10,
                border: "1px solid #d1d9e0", background: "#fff", cursor: "pointer",
                color: "#181c1e", fontWeight: 600, fontFamily: "inherit",
              }}>Substituir</button>
              <button style={{
                padding: 6, borderRadius: 6, border: "1px solid #d1d9e0",
                background: "#fff", cursor: "pointer", color: "#3d4a42",
              }}>
                <Icon name="settings" size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============== Main /admin screen ============== */
const AdminScreen = () => {
  const [tab, setTab] = React.useState("feed");
  const [urlValue, setUrlValue] = React.useState("https://youtube.com/watch?v=dQw4w9WgXcQ");
  const detectedProvider = urlValue.includes("youtube") ? "youtube"
    : urlValue.includes("spotify") ? "spotify"
    : urlValue.includes("linkedin") ? "linkedin"
    : urlValue.includes("instagram") ? "instagram"
    : urlValue.match(/(twitter|x\.com)/) ? "x"
    : null;

  return (
    <div style={{ background: "#f7fafc", minHeight: "100%", fontFamily: '"Public Sans", system-ui, sans-serif', color: "#181c1e" }}>
      {/* Yellow admin banner — preserved from current layout */}
      <div style={{
        background: "linear-gradient(90deg, #fef9c3, #fde68a)",
        borderBottom: "1px solid #facc15",
      }}>
        <div style={{ width: "min(1280px, 96%)", margin: "0 auto", padding: "8px 0", display: "flex", alignItems: "center", gap: 10, fontSize: 12 }}>
          <span style={{
            display: "inline-block", width: 8, height: 8, borderRadius: "50%",
            background: "#ca8a04", boxShadow: "0 0 6px #ca8a04",
          }}/>
          <strong style={{ color: "#713f12" }}>Modo administração</strong>
          <span style={{ color: "#713f12", opacity: 0.8 }}>· acesso restrito · sessão registada</span>
          <a style={{ marginLeft: "auto", color: "#713f12", fontWeight: 600, cursor: "pointer" }}>Sair →</a>
        </div>
      </div>

      <main style={{ width: "min(1280px, 96%)", margin: "0 auto", padding: "28px 0 60px" }}>
        {/* Page header */}
        <header style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#006c4b" }}>Painel interno</span>
            <h1 style={{ margin: "6px 0 0", fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em" }}>
              Administração · Conteúdo
            </h1>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: "#3d4a42", maxWidth: 540 }}>
              Gere o feed de atualidades, vídeos e logos do site. Mudanças aplicadas em produção sem deploy.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{
              padding: "8px 12px", borderRadius: 10,
              background: "#fff", border: "1px solid #d1d9e0",
              fontSize: 11, color: "#3d4a42",
            }}>
              Versão <strong style={{ color: "#181c1e" }}>v1.7.3</strong>
            </div>
            <button style={{
              padding: "10px 14px", borderRadius: 10,
              background: "#fff", color: "#181c1e",
              border: "1px solid #d1d9e0", cursor: "pointer",
              fontWeight: 600, fontSize: 12, fontFamily: "inherit",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              <Icon name="eye" size={13} />
              Ver site público
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div style={{
          display: "inline-flex", gap: 4,
          padding: 4, borderRadius: 12,
          background: "#fff", border: "1px solid #d1d9e0",
          marginBottom: 20,
        }}>
          <AdminTab active={tab === "feed"}   icon="grid"     label="Feed · Atualidades"    count={MOCK_POSTS.length} onClick={() => setTab("feed")} />
          <AdminTab active={tab === "videos"} icon="play"     label="Vídeos"                count={3} onClick={() => setTab("videos")} />
          <AdminTab active={tab === "logos"}  icon="image"    label="Logos"                 count={8} onClick={() => setTab("logos")} />
          <AdminTab active={tab === "stats"}  icon="sparkle"  label="Estatísticas"          onClick={() => setTab("stats")} />
        </div>

        {/* Feed tab content */}
        {tab === "feed" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20 }}>
            {/* Left: posts list */}
            <div style={{
              background: "#fff",
              border: "1px solid rgba(0,108,75,0.1)",
              borderRadius: 16,
              padding: 16,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px 12px", borderBottom: "1px solid #eef2f0", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>Posts</h2>
                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "rgba(0,108,75,0.08)", color: "#006c4b", fontWeight: 700 }}>
                    {MOCK_POSTS.length} publicados
                  </span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "6px 10px", borderRadius: 8,
                    background: "#f7fafc", fontSize: 11, color: "#3d4a42",
                  }}>
                    <Icon name="search" size={11} /> Filtrar…
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {MOCK_POSTS.map(p => <PostsListItem key={p.id} post={p} />)}
              </div>

              {/* Rascunhos */}
              <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: "#f7fafc", border: "1px dashed #d1d9e0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#3d4a42" }}>
                  <Icon name="edit" size={13} />
                  <strong style={{ color: "#181c1e" }}>2 rascunhos</strong> · 1 agendado para 17 Mai · <a style={{ color: "#006c4b", fontWeight: 600 }}>Ver →</a>
                </div>
              </div>
            </div>

            {/* Right: compose + preview + publish */}
            <aside style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <ComposeBar urlValue={urlValue} onChange={setUrlValue} detectedProvider={detectedProvider} />
              <EmbedPreview provider={detectedProvider} />
              <PublishControls />
            </aside>
          </div>
        )}

        {/* Videos tab */}
        {tab === "videos" && (
          <div style={{
            background: "#fff",
            border: "1px solid rgba(0,108,75,0.1)",
            borderRadius: 16, padding: 22,
          }}>
            <MediaLibrary />
          </div>
        )}

        {/* Logos tab */}
        {tab === "logos" && (
          <div style={{
            background: "#fff",
            border: "1px solid rgba(0,108,75,0.1)",
            borderRadius: 16, padding: 22,
          }}>
            <LogosManager />
          </div>
        )}

        {/* Stats tab */}
        {tab === "stats" && (
          <div style={{
            background: "#fff",
            border: "1px solid rgba(0,108,75,0.1)",
            borderRadius: 16, padding: 22, textAlign: "center", color: "#3d4a42",
          }}>
            <Icon name="sparkle" size={32} color="#006c4b" />
            <p style={{ marginTop: 12 }}>Métricas por post (vistas, likes, tempo no feed) — disponível na fase 2.</p>
          </div>
        )}
      </main>
    </div>
  );
};

window.AdminScreen = AdminScreen;
