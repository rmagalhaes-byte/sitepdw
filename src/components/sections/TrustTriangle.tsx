/**
 * pdw-site-v2/src/components/sections/TrustTriangle.tsx
 *
 * ATUALIZADO (PR2): substitui o SVG hand-drawn pela ilustração real
 * `/trust-triangle.png` à esquerda, com 3 abas pílula à direita que
 * trocam o painel de detalhe. Mantém a interatividade.
 */
"use client";

import Image from "next/image";
import { useState } from "react";

type NodeKey = "issuer" | "holder" | "verifier";

interface NodeContent {
  title: string;
  sub: string;
  body: string;
  examples: string;
}

interface TrustTriangleProps {
  nodes?: Record<NodeKey, NodeContent>;
}

const DEFAULT_NODES: Record<NodeKey, NodeContent> = {
  issuer: {
    title: "Emissor",
    sub: "Issuer",
    body: "Entidade autorizada que cria e assina criptograficamente a credencial. Universidades, ministérios, instituições de saúde, autoridades.",
    examples: "ex.: Universidade do Minho, Ordem dos Médicos, Direção-Geral da Saúde.",
  },
  holder: {
    title: "Utilizador",
    sub: "Holder",
    body: "O cidadão que guarda a credencial na sua PDW. Decide o que partilha, com quem, e durante quanto tempo. Os dados ficam cifrados no dispositivo.",
    examples: "ex.: estudante, profissional de saúde, candidato a um emprego.",
  },
  verifier: {
    title: "Verificador",
    sub: "Verifier",
    body: "Quem precisa de validar a credencial. Verifica a assinatura junto da rede EBSI em segundos — sem contactar o emissor.",
    examples: "ex.: recrutador, hospital noutro país, banco, serviço público.",
  },
};

export function TrustTriangle({ nodes = DEFAULT_NODES }: TrustTriangleProps) {
  const [active, setActive] = useState<NodeKey>("holder");
  const current = nodes[active];

  return (
    <div className="trust-triangle-real">
      <div className="trust-triangle-img">
        <Image
          src="/trust-triangle.png"
          alt="Triângulo de confiança PDW: Emissor, Utilizador e Verificador conectados pela camada EBSI"
          width={520}
          height={520}
          loading="lazy"
        />
      </div>
      <div className="trust-triangle-tabs">
        <div
          className="trust-triangle-tabs-head"
          role="tablist"
          aria-label="Selecionar papel"
        >
          {(Object.keys(nodes) as NodeKey[]).map((key) => {
            const n = nodes[key];
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active === key}
                className={`trust-tab ${active === key ? "is-active" : ""}`}
                onClick={() => setActive(key)}
              >
                <span className="trust-tab-title">{n.title}</span>
                <span className="trust-tab-sub">{n.sub}</span>
              </button>
            );
          })}
        </div>
        <div className="trust-tab-panel" role="tabpanel">
          <p>{current.body}</p>
          <p className="trust-detail-eg">{current.examples}</p>
        </div>
      </div>
    </div>
  );
}
