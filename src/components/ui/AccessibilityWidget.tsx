"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [contrast, setContrast] = useState<"normal" | "high">("normal");
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");

  useEffect(() => {
    document.documentElement.setAttribute("data-contrast", contrast);
    document.documentElement.setAttribute("data-font-size", fontSize);
  }, [contrast, fontSize]);

  return (
    <div className="accessibility-widget">
      <button
        className="accessibility-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Opções de acessibilidade"
        title="Acessibilidade"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v8"/>
          <path d="M8 12h8"/>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 10 }}
            className="accessibility-menu"
          >
            <div className="acc-option">
              <span className="acc-label">Alto Contraste</span>
              <div className="acc-control">
                <button 
                  className={`acc-control-btn ${contrast === 'normal' ? 'active' : ''}`}
                  onClick={() => setContrast('normal')}
                >
                  Não
                </button>
                <button 
                  className={`acc-control-btn ${contrast === 'high' ? 'active' : ''}`}
                  onClick={() => setContrast('high')}
                >
                  Sim
                </button>
              </div>
            </div>

            <div className="acc-option">
              <span className="acc-label">Tamanho do Texto</span>
              <div className="acc-control">
                <button 
                  className={`acc-control-btn ${fontSize === 'normal' ? 'active' : ''}`}
                  onClick={() => setFontSize('normal')}
                >
                  A
                </button>
                <button 
                  className={`acc-control-btn ${fontSize === 'large' ? 'active' : ''}`}
                  onClick={() => setFontSize('large')}
                >
                  A+
                </button>
                <button 
                  className={`acc-control-btn ${fontSize === 'xlarge' ? 'active' : ''}`}
                  onClick={() => setFontSize('xlarge')}
                >
                  A++
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
