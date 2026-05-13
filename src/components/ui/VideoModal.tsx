"use client";

import { createPortal } from "react-dom";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

export function VideoModal({ isOpen, onClose, videoSrc }: VideoModalProps) {
  if (!isOpen || typeof document === 'undefined') return null;

  // Garantir que a URL do YouTube usa a versão 'embed'
  let embedUrl = videoSrc;
  if (videoSrc.includes("youtube.com/shorts/")) {
    const videoId = videoSrc.split("youtube.com/shorts/")[1]?.split("?")[0];
    // Adicionando parâmetros para uma experiência mais limpa (modestbranding, rel, etc)
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1`;
  }

  return createPortal(
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '400px', // Mais estreito para formato Short (vertical)
          width: '90%',
          backgroundColor: '#000', 
          padding: 0, 
          border: 'none', 
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden'
        }}
      >
        <button 
          onClick={onClose} 
          aria-label="Fechar"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.5)',
            border: 'none',
            color: 'white',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <iframe
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ 
            width: '100%', 
            aspectRatio: '9/16', // Formato Short
            display: 'block' 
          }}
        />
      </div>
    </div>,
    document.body
  );
}

