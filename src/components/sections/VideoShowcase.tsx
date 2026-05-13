"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface VideoShowcaseProps {
  dict: any;
}

export function VideoShowcase({ dict }: VideoShowcaseProps) {
  // URL de embed do YouTube (Shorts) com parâmetros otimizados
  const embedUrl = "https://www.youtube.com/embed/zIJcgnQia1o?modestbranding=1&rel=0&showinfo=0&controls=1";

  return (
    <AnimatedSection delay={0.15}>
      <section className="video-showcase-section">
        <div className="video-showcase-header">
          <span className="video-showcase-badge">
            {dict.videoShowcase?.badge || "🎬 Demo"}
          </span>
          <h2 className="video-showcase-title">
            {dict.videoShowcase?.title || "Veja a PDW em ação"}
          </h2>
          <p className="video-showcase-subtitle">
            {dict.videoShowcase?.subtitle || "Descubra como funciona a carteira digital portuguesa em menos de 2 minutos."}
          </p>
        </div>

        <div className="video-showcase-wrapper">
          <div className="video-showcase-glow" />
          <div 
            className="video-showcase-container" 
            style={{ 
              maxWidth: '400px', // Mais estreito para formato Short (vertical)
              margin: '0 auto',
              aspectRatio: '9/16'
            }}
          >
            <iframe
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
