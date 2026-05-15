/**
 * pdw-site-v2/src/components/ui/VideoModal.tsx
 *
 * NOVO. Modal de vídeo full-screen para o concept_video.mp4
 * (substitui o `alert()` que estava na Hero antiga).
 *
 * Acessível: fecha com Esc, click no overlay, ou botão de fecho.
 * Bloqueia scroll do body enquanto aberto.
 */
"use client";

import { useEffect } from "react";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  /** Caminho do vídeo. Default: /concept_video.mp4 (público) */
  src?: string;
  caption?: string;
}

export function VideoModal({
  open,
  onClose,
  src = "/concept_video.mp4",
  caption = "Vídeo conceito · Portuguese Digital Wallet",
}: VideoModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="video-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-label="Vídeo conceito PDW"
    >
      <div className="video-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="video-modal-close"
          onClick={onClose}
          aria-label="Fechar vídeo"
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <video src={src} controls autoPlay playsInline className="video-modal-player" />
        <div className="video-modal-caption">{caption}</div>
      </div>
    </div>
  );
}
