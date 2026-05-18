-- Tabela de secções do site — controlo de visibilidade e conteúdo editável via admin.
-- Cada linha representa uma secção identificada por 'key'.
-- Idempotente: pode correr múltiplas vezes sem efeito.

CREATE TABLE IF NOT EXISTS site_sections (
  key          TEXT PRIMARY KEY,
  enabled      INTEGER NOT NULL DEFAULT 1,
  content_json TEXT,
  updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO site_sections (key, enabled, content_json) VALUES
  ('github', 1, '{"repo_url":"https://github.com/tecminho","repo_name":"tecminho/pdw","description":"Sistema de credenciais verificáveis W3C VC conforme EBSI e eIDAS 2.0. Transparente, auditável e pronto para integrar."}'),
  ('contact-form', 1, NULL);
