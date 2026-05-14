"use client";

import Image from "next/image";

interface TrustBarProps {
  dict: any;
}

interface PartnerInfo {
  logo: string;
  url: string;
  scale?: number;
}

export function TrustBar({ dict }: TrustBarProps) {
  const partnerData: Record<string, PartnerInfo> = {
    "Universidade do Minho": { logo: "/uminho_logo.png", url: "https://www.uminho.pt/PT" },
    "University of Minho": { logo: "/uminho_logo.png", url: "https://www.uminho.pt/PT" },
    "TecMinho": { logo: "/tcminho-logo.png", url: "https://www.tecminho.uminho.pt/" },
    "Agenda Blockchain.PT": { logo: "/logo-Blockchain-pt.png", url: "https://blockchain.pt" },
    "Blockchain.PT Agenda": { logo: "/logo-Blockchain-pt.png", url: "https://blockchain.pt" },
    "VOID Software": { logo: "/logo-void.png", url: "https://void.software/" },
    "EBSI": { logo: "/logo-ebsi.png", url: "https://hub.ebsi.eu/", scale: 1.8 },
  };

  return (
    <section className="section-card trust-bar-section" style={{
      marginTop: 14,
      background: 'white',
      border: '1px solid rgba(0, 108, 75, 0.1)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
    }}>
      <strong style={{
        display: 'block',
        marginBottom: '16px',
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--color-muted)',
        opacity: 0.8
      }}>
        {dict.trustBar.title}
      </strong>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '48px',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
        {dict.trustBar.partners.map((item: string) => {
          const partner = partnerData[item];

          if (partner) {
            return (
              <a
                key={item}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                title={item}
                style={{
                  height: '34px',
                  position: 'relative',
                  width: '110px',
                  display: 'block',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.06)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.filter = 'grayscale(0%) opacity(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.filter = 'grayscale(100%) opacity(0.65)';
                }}
              >
                <Image
                  src={partner.logo}
                  alt={item}
                  fill
                  style={{
                    objectFit: 'contain',
                    filter: 'grayscale(100%) opacity(0.65)',
                    transition: 'filter 0.3s ease',
                    ...(partner.scale && { transform: `scale(${partner.scale})` })
                  }}
                />
              </a>
            );
          }

          return (
            <span key={item} style={{
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--color-secondary)',
              opacity: 0.6,
              background: 'rgba(26, 59, 93, 0.05)',
              padding: '4px 12px',
              borderRadius: '6px',
              whiteSpace: 'nowrap'
            }}>
              {item}
            </span>
          );
        })}
      </div>
    </section>
  );
}
