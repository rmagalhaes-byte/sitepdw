"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Locale } from "@/i18n/config";

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Locale;
}

export function ChangelogModal({ isOpen, onClose, lang }: ChangelogModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const changelogData = [
    {
      version: "v1.7.3",
      date: "14/05/2026",
      changes: [
        "Integração total da Homepage com secções de Casos de Uso, Demonstração em Vídeo e Formulário de Lead",
        "Correção de bugs estruturais no CSS global (herança de estilos e sintaxe)",
        "Otimização de metadados para o novo domínio digitalwallet.pt",
        "Melhoria na robustez das interfaces TypeScript"
      ]
    },
    {
      version: "v1.7.2",
      date: "14/05/2026",
      changes: [
        "Otimização profunda de acessibilidade (WCAG 2.1)",
        "Correção de inconsistências visuais no Dark Mode em múltiplos componentes",
        "Refinamento de variáveis de cor para melhor contraste"
      ]
    },
    {
      version: "v1.7.1",
      date: "13/05/2026",
      changes: [
        "Navegação dinâmica com destaque para página ativa (Active Links)",
        "Deteção inteligente de rota na troca de idioma (manutenção da página atual)",
        "Refinamento do leitor de vídeo com parâmetros de marca limpa (YouTube Modest Branding)",
        "Reestruturação visual e interativa da secção de financiadores no rodapé",
        "Ajustes de densidade visual e dimensões nos cartões de parceiros",
        "Implementação do Simulador Interativo e Widget de Acessibilidade"
      ]
    },
    {
      version: "v1.6.0",
      date: "13/05/2026",
      changes: [
        "Correção do posicionamento do Modal de Changelog (agora centrado no ecrã)",
        "Integração do YouTube (formato Short) no pop-up de Demonstração",
        "Substituição de vídeo local por iFrame para melhor performance"
      ]
    },
    {
      version: "v1.5.0",
      date: "12/05/2026",
      changes: [
        "Integração do Changelog Timeline",
        "Adicionada nova badge de versão dinâmica no cabeçalho",
        "Atualização das redes sociais no rodapé com ícone dedicado para comunidade"
      ]
    },
    {
      version: "v1.4.0",
      date: "10/05/2026",
      changes: [
        "Otimização visual do Footer (Glassmorphism e hover effects nas logos dos parceiros)",
        "Refatoração de links institucionais e navegação inferior",
      ]
    },
    {
      version: "v1.3.0",
      date: "09/05/2026",
      changes: [
        "Integração de Imagem Disruptiva na Homepage com animações",
        "Atualização de nomenclaturas de estado no roadmap (de 'research' para 'development')",
      ]
    },
    {
      version: "v1.2.0",
      date: "08/05/2026",
      changes: [
        "Otimização do Site e SEO (Sitemaps, estruturação de páginas, Open Graph)",
        "Resolução de vulnerabilidades Next.js para deploy na Netlify",
      ]
    },
    {
      version: "v1.1.0",
      date: "08/05/2026",
      changes: [
        "Criação de repositórios independentes no GitHub e sincronismo",
        "Estruturação da Estratégia B2B2C e regras de negócio base (.vide)",
      ]
    },
    {
      version: "v1.0.0",
      date: "07/05/2026",
      changes: [
        "Lançamento do MVP (Minimum Viable Product)",
        "Implementação base da arquitetura e i18n (Internacionalização pt/en)",
      ]
    }
  ];

  return createPortal(
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {lang === "pt" ? "Atualizações (Changelog)" : "Updates (Changelog)"}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="modal-body">
          <p className="modal-description">
            {lang === "pt" 
              ? "Acompanhe as evoluções e novidades implementadas no portal PDW. A nossa plataforma está em contínua evolução baseada na nossa pipeline do GitHub."
              : "Track the evolution and new features implemented on the PDW portal. Our platform is continuously evolving based on our GitHub pipeline."}
          </p>

          <div className="timeline">
            {changelogData.map((item, index) => (
              <div className="timeline-item" key={item.version}>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-version">{item.version}</span>
                    <span className="timeline-date">{item.date}</span>
                  </div>
                  <ul className="timeline-list">
                    {item.changes.map((change, i) => (
                      <li key={i}>{change}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
