/* Public /atualidades page — disruptive: stories + animated filters + bento mural */

const FilterPills = ({ active, onChange, counts }) => {
  const filters = [
    { id: "all",       label: "Todos",     count: counts.all },
    { id: "pdw",       label: "PDW",       count: counts.pdw },
    { id: "evento",    label: "Eventos",   count: counts.evento },
    { id: "youtube",   label: "YouTube",   count: counts.youtube },
    { id: "spotify",   label: "Spotify",   count: counts.spotify },
    { id: "linkedin",  label: "LinkedIn",  count: counts.linkedin },
    { id: "instagram", label: "Instagram", count: counts.instagram },
    { id: "x",         label: "X",         count: counts.x },
  ];
  return (
    <div style={{
      display: "inline-flex",
      gap: 6,
      padding: 6,
      background: "rgba(255,255,255,0.65)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(0,108,75,0.12)",
      borderRadius: 999,
      boxShadow: "0 8px 30px rgba(0,108,75,0.06)",
    }}>
      {filters.map(f => {
        const isActive = active === f.id;
        return (
          <button key={f.id}
            onClick={() => onChange(f.id)}
            style={{
              border: 0,
              cursor: "pointer",
              padding: "8px 14px",
              borderRadius: 999,
              background: isActive ? "#006c4b" : "transparent",
              color: isActive ? "#fff" : "#181c1e",
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: isActive ? 600 : 500,
              transition: "all .25s cubic-bezier(.4,0,.2,1)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}>
            {f.label}
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "1px 6px",
              borderRadius: 999,
              background: isActive ? "rgba(255,255,255,0.2)" : "rgba(0,108,75,0.08)",
              color: isActive ? "#fff" : "#006c4b",
              minWidth: 16,
              textAlign: "center",
            }}>{f.count}</span>
          </button>
        );
      })}
    </div>
  );
};

const StoryRail = () => (
  <div style={{
    display: "flex",
    gap: 18,
    padding: "4px 0 18px",
    overflowX: "auto",
  }}>
    {/* Add story button (admin will see this) */}
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: "rgba(0,108,75,0.06)",
        border: "2px dashed rgba(0,108,75,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#006c4b", cursor: "pointer",
      }}>
        <Icon name="plus" size={28} stroke={2.2} />
      </div>
      <span style={{ fontSize: 11, color: "#3d4a42", fontWeight: 500 }}>Novo</span>
    </div>

    {STORIES.map(s => {
      const meta = PROVIDER_META[s.type];
      return (
        <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0, cursor: "pointer" }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            padding: 3,
            background: s.seen
              ? `linear-gradient(135deg, #d1d9e088, #d1d9e0)`
              : `conic-gradient(from 0deg, ${meta.color}, ${meta.color}88, ${meta.color})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
            transition: "transform .3s",
          }}>
            <div style={{
              width: "100%", height: "100%", borderRadius: "50%",
              background: "#fff",
              padding: 2,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: "100%", height: "100%", borderRadius: "50%",
                background: `linear-gradient(135deg, ${meta.color}22, ${meta.color}05)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: meta.color,
              }}>
                <Icon name={s.type === "pdw" ? "sparkle" : s.type} size={26} stroke={2} />
              </div>
            </div>
            {!s.seen && (
              <div style={{
                position: "absolute", bottom: -2, right: -2,
                width: 18, height: 18, borderRadius: "50%",
                background: "#FF0033", border: "2px solid #fff",
              }}/>
            )}
          </div>
          <span style={{ fontSize: 11, color: "#181c1e", fontWeight: 500, maxWidth: 78, textAlign: "center", lineHeight: 1.2 }}>
            {s.label}
          </span>
        </div>
      );
    })}
  </div>
);

/* ---------- Card body per provider ---------- */
const CardBody = ({ post }) => {
  const meta = PROVIDER_META[post.type];
  switch (post.type) {
    case "youtube":
      return (
        <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: "16/9" }}>
          <StripedPlaceholder label="youtube thumbnail" color="#FF0033" />
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4))",
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "#FF0033", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 32px rgba(255,0,51,0.5)",
            }}>
              <Icon name="play" size={28} color="#fff" />
            </div>
          </div>
          <div style={{
            position: "absolute", bottom: 10, right: 10,
            padding: "3px 8px", borderRadius: 4,
            background: "rgba(0,0,0,0.75)", color: "#fff",
            fontSize: 11, fontWeight: 600, fontFamily: "ui-monospace, monospace",
          }}>{post.embed.duration}</div>
        </div>
      );
    case "spotify":
      return (
        <div style={{
          borderRadius: 12, padding: 14,
          background: "linear-gradient(135deg, #1DB954, #0e6b2e)",
          color: "#fff", display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 8,
            background: "rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="spotify" size={28} color="#fff" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, opacity: 0.75, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>Episódio · Spotify</div>
            <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Tech Sovereign · Ep. 14</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>{post.embed.duration}</div>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "#fff", color: "#1DB954",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="play" size={16} color="#1DB954" />
          </div>
        </div>
      );
    case "evento":
      return (
        <div style={{ borderRadius: 12, overflow: "hidden", position: "relative", padding: 18,
          background: "linear-gradient(135deg, #1a3b5d, #0e2238)", color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{
              padding: "10px 12px", borderRadius: 10,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
              minWidth: 64, textAlign: "center",
            }}>
              <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.7, letterSpacing: "0.1em" }}>MAI</div>
              <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1, marginTop: 2 }}>28</div>
              <div style={{ fontSize: 10, opacity: 0.75, marginTop: 4 }}>{post.event.time}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 4 }}>
                <span style={{
                  display: "inline-block",
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#3ddb95", marginRight: 5,
                  boxShadow: "0 0 8px #3ddb95",
                  animation: "evtPulse 2s infinite",
                }}/>
                Daqui a {post.event.countdown}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, opacity: 0.85 }}>
                <Icon name="mapPin" size={12} />
                {post.event.location}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
                <button style={{
                  padding: "8px 14px", borderRadius: 999, border: 0, cursor: "pointer",
                  background: "#3ddb95", color: "#062a17", fontWeight: 700, fontSize: 12,
                  fontFamily: "inherit",
                }}>RSVP</button>
                <span style={{ fontSize: 11, opacity: 0.75 }}>{post.event.rsvp} confirmados</span>
              </div>
            </div>
          </div>
        </div>
      );
    case "linkedin":
      return (
        <div style={{
          borderRadius: 12, padding: 14, background: "#fff",
          border: "1px solid rgba(10,102,194,0.18)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "#0A66C2", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name="linkedin" size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{post.embed.author}</div>
              <div style={{ fontSize: 10, color: "#3d4a42" }}>Patrocinado pela TecMinho</div>
            </div>
          </div>
          <StripedPlaceholder label="linkedin media preview" height={120} color="#0A66C2" />
          <div style={{ marginTop: 10, fontSize: 11, color: "#3d4a42", display: "flex", gap: 12 }}>
            <span>👍 {post.embed.reactions} reacções</span>
            <span style={{ color: "#0A66C2", fontWeight: 600, marginLeft: "auto" }}>Ver no LinkedIn →</span>
          </div>
        </div>
      );
    case "instagram":
      return (
        <div style={{ borderRadius: 12, overflow: "hidden", position: "relative", aspectRatio: "1/1" }}>
          <StripedPlaceholder label="instagram post" color="#E1306C" />
          <div style={{
            position: "absolute", top: 10, left: 10, right: 10,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, #E1306C, #fd1d1d, #f77737)",
              padding: 1.5,
            }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#fff" }}/>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 600, color: "#fff",
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}>@{post.embed.author}</span>
          </div>
          <div style={{
            position: "absolute", bottom: 10, left: 10,
            color: "#fff", fontSize: 11, fontWeight: 600,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            display: "flex", gap: 12,
          }}>
            <span>♥ {post.embed.likes}</span>
          </div>
        </div>
      );
    case "x":
      return (
        <div style={{
          borderRadius: 12, padding: 14, background: "#fff",
          border: "1px solid #181c1e22",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "#000", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name="x" size={14} color="#fff" stroke={2.5} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>Portuguese Digital Wallet</div>
              <div style={{ fontSize: 10, color: "#3d4a42" }}>{post.embed.author}</div>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "#181c1e" }}>
            {post.excerpt}
          </p>
          <div style={{ marginTop: 10, fontSize: 11, color: "#3d4a42", display: "flex", gap: 14 }}>
            <span>🔁 {post.embed.reposts}</span>
            <span>♥ {post.likes}</span>
          </div>
        </div>
      );
    case "imagem":
      return (
        <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "4/3" }}>
          <StripedPlaceholder label={post.image.caption} color="#3d4a42" />
        </div>
      );
    case "pdw":
      return (
        <div style={{
          borderRadius: 12, padding: 18,
          background: "linear-gradient(135deg, #006c4b, #00543a)",
          color: "#fff", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 160, height: 160, borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}/>
          <div style={{ fontSize: 10, opacity: 0.75, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Release oficial
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, marginTop: 4, letterSpacing: "-0.02em" }}>
            v{post.release.version}
          </div>
          <div style={{ fontSize: 12, opacity: 0.9, marginTop: 8 }}>
            Ver changelog completo →
          </div>
        </div>
      );
    default:
      return null;
  }
};

/* ---------- Generic post card wrapper ---------- */
const PostCard = ({ post }) => {
  const meta = PROVIDER_META[post.type];
  return (
    <article style={{
      background: "#fff",
      borderRadius: 18,
      border: "1px solid rgba(0,108,75,0.1)",
      padding: 14,
      display: "flex", flexDirection: "column", gap: 12,
      transition: "all .3s cubic-bezier(.175,.885,.32,1.275)",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      cursor: "pointer",
      position: "relative",
      gridColumn: post.size === "wide" ? "span 2" : "span 1",
      gridRow: post.size === "tall" ? "span 2" : "span 1",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,108,75,0.1)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
    }}>
      {/* Header */}
      <header style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "3px 9px 3px 6px", borderRadius: 999,
          background: `${meta.color}14`, color: meta.color,
          fontSize: 10, fontWeight: 700,
          letterSpacing: "0.05em", textTransform: "uppercase",
        }}>
          <Icon name={post.type === "pdw" ? "sparkle" : (post.type === "evento" ? "calendar" : (post.type === "imagem" ? "image" : post.type))} size={11} color={meta.color} stroke={2.4} />
          {meta.label}
        </div>
        {post.pinned && (
          <div style={{ color: "#1a3b5d", display: "flex", alignItems: "center", gap: 3, fontSize: 10, fontWeight: 700 }}>
            <Icon name="pin" size={11} color="#1a3b5d" />
            Fixado
          </div>
        )}
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#3d4a42" }}>{post.ts}</span>
      </header>

      {/* Body */}
      <CardBody post={post} />

      {/* Title + excerpt (hide for some embed-only ones, keep for most) */}
      {post.type !== "x" && (
        <div>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#181c1e", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
            {post.title}
          </h3>
          {post.excerpt && post.type !== "spotify" && post.type !== "evento" && post.type !== "linkedin" && (
            <p style={{ margin: "6px 0 0", fontSize: 12, lineHeight: 1.5, color: "#3d4a42" }}>
              {post.excerpt}
            </p>
          )}
        </div>
      )}

      {/* Engagement footer */}
      <footer style={{
        display: "flex", alignItems: "center", gap: 14,
        paddingTop: 10, borderTop: "1px solid #eef2f0",
        color: "#3d4a42", fontSize: 12,
      }}>
        <button style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          background: "transparent", border: 0, cursor: "pointer",
          color: "#3d4a42", fontFamily: "inherit", fontSize: 12, padding: 0,
        }}>
          <Icon name="heart" size={14} />
          {post.likes}
        </button>
        <button style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          background: "transparent", border: 0, cursor: "pointer",
          color: "#3d4a42", fontFamily: "inherit", fontSize: 12, padding: 0,
        }}>
          <Icon name="chat" size={14} />
          {post.comments}
        </button>
        <button style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          background: "transparent", border: 0, cursor: "pointer",
          color: "#3d4a42", fontFamily: "inherit", fontSize: 12, padding: 0,
          marginLeft: "auto",
        }}>
          <Icon name="share" size={14} />
        </button>
      </footer>
    </article>
  );
};

/* ============== Main /atualidades screen ============== */
const AtualidadesScreen = () => {
  const [filter, setFilter] = React.useState("all");
  const [viewMode, setViewMode] = React.useState("mural"); // mural | list

  const counts = MOCK_POSTS.reduce((acc, p) => {
    acc.all++; acc[p.type] = (acc[p.type] || 0) + 1;
    return acc;
  }, { all: 0 });

  const visiblePosts = filter === "all" ? MOCK_POSTS : MOCK_POSTS.filter(p => p.type === filter);

  return (
    <div style={{ background: "#f7fafc", minHeight: "100%", fontFamily: '"Public Sans", system-ui, sans-serif', color: "#181c1e" }}>
      {/* PDW Header (mini) */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,108,75,0.1)",
      }}>
        <div style={{ width: "min(1120px, 92%)", margin: "0 auto", minHeight: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <a style={{ display: "flex", alignItems: "center", gap: 10, color: "#006c4b", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em", textDecoration: "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: "#006c4b", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>PDW</div>
            Portuguese Digital Wallet
          </a>
          <nav style={{ display: "flex", gap: 22, fontSize: 13, fontWeight: 500, color: "#181c1eaa" }}>
            <a>Início</a>
            <a>Sobre</a>
            <a>Solução</a>
            <a>Casos de Uso</a>
            <a style={{ color: "#006c4b", fontWeight: 700, borderBottom: "2px solid #006c4b", paddingBottom: 4 }}>Atualidades</a>
            <a>Contactos</a>
          </nav>
          <button style={{ background: "#006c4b", color: "#fff", border: 0, borderRadius: 8, padding: "10px 14px", fontWeight: 600, fontSize: 13, fontFamily: "inherit", cursor: "pointer" }}>
            Descarregar App
          </button>
        </div>
      </header>

      <main style={{ width: "min(1200px, 94%)", margin: "0 auto", padding: "36px 0 56px" }}>
        {/* Hero strip */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#006c4b", marginBottom: 8 }}>
              <span style={{
                display: "inline-block", width: 8, height: 8, borderRadius: "50%",
                background: "#3ddb95", boxShadow: "0 0 12px #3ddb95",
                animation: "evtPulse 2s infinite",
              }}/>
              Em directo
            </div>
            <h1 style={{ margin: 0, fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em", color: "#181c1e", lineHeight: 1.05 }}>
              Atualidades
            </h1>
            <p style={{ margin: "8px 0 0", fontSize: 15, color: "#3d4a42", maxWidth: 540 }}>
              Tudo o que se passa na PDW, num só feed. Vídeos, podcasts, eventos e marcos &mdash; agregados das redes oficiais.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "8px 12px", borderRadius: 999,
              background: "#fff", border: "1px solid #d1d9e0",
              fontSize: 12, color: "#3d4a42",
            }}>
              <Icon name="arrowUp" size={12} color="#006c4b" />
              <strong style={{ color: "#006c4b" }}>12 novos</strong> esta semana
            </div>
            <div style={{ display: "flex", padding: 3, borderRadius: 10, border: "1px solid #d1d9e0", background: "#fff" }}>
              <button onClick={() => setViewMode("mural")} style={{
                padding: "6px 10px", borderRadius: 7, border: 0, cursor: "pointer",
                background: viewMode === "mural" ? "#006c4b" : "transparent",
                color: viewMode === "mural" ? "#fff" : "#3d4a42",
                display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, fontFamily: "inherit",
              }}><Icon name="grid" size={12} /> Mural</button>
              <button onClick={() => setViewMode("list")} style={{
                padding: "6px 10px", borderRadius: 7, border: 0, cursor: "pointer",
                background: viewMode === "list" ? "#006c4b" : "transparent",
                color: viewMode === "list" ? "#fff" : "#3d4a42",
                display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, fontFamily: "inherit",
              }}><Icon name="list" size={12} /> Linha</button>
            </div>
          </div>
        </div>

        {/* Stories rail */}
        <section style={{
          background: "#fff",
          border: "1px solid rgba(0,108,75,0.1)",
          borderRadius: 18,
          padding: "18px 22px 14px",
          marginBottom: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <h2 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#181c1e", letterSpacing: "-0.01em" }}>
              Destaques recentes
            </h2>
            <a style={{ fontSize: 11, color: "#3d4a42", cursor: "pointer" }}>Ver tudo →</a>
          </div>
          <StoryRail />
        </section>

        {/* Filters bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, gap: 16, flexWrap: "wrap" }}>
          <FilterPills active={filter} onChange={setFilter} counts={counts} />
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 14px", borderRadius: 999,
            background: "#fff", border: "1px solid #d1d9e0",
            fontSize: 12, color: "#3d4a42", maxWidth: 240,
          }}>
            <Icon name="search" size={13} color="#3d4a42" />
            <span style={{ flex: 1 }}>Pesquisar…</span>
            <kbd style={{ padding: "1px 5px", borderRadius: 4, background: "#f0f0f0", fontSize: 10, fontFamily: "ui-monospace, monospace" }}>⌘K</kbd>
          </div>
        </div>

        {/* Mural / Bento grid */}
        {viewMode === "mural" ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "minmax(280px, auto)",
            gap: 16,
          }}>
            {visiblePosts.map(p => <PostCard key={p.id} post={p} />)}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {visiblePosts.map(p => (
              <div key={p.id} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16, background: "#fff", border: "1px solid rgba(0,108,75,0.1)", borderRadius: 14, padding: 14 }}>
                <div style={{ minHeight: 120 }}><CardBody post={p} /></div>
                <div>
                  <header style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      padding: "3px 9px 3px 6px", borderRadius: 999,
                      background: `${PROVIDER_META[p.type].color}14`, color: PROVIDER_META[p.type].color,
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
                    }}>{PROVIDER_META[p.type].label}</div>
                    <span style={{ fontSize: 11, color: "#3d4a42" }}>{p.ts}</span>
                  </header>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{p.title}</h3>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#3d4a42" }}>{p.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load more */}
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button style={{
            padding: "12px 26px", borderRadius: 999, border: "1px solid #006c4b",
            background: "#fff", color: "#006c4b", fontWeight: 600, fontSize: 13,
            cursor: "pointer", fontFamily: "inherit",
          }}>
            Carregar mais ↓
          </button>
        </div>
      </main>

      <style>{`
        @keyframes evtPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
};

window.AtualidadesScreen = AtualidadesScreen;
