"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [contrast, setContrast] = useState<"normal" | "high">("normal");

  useEffect(() => {
    document.documentElement.setAttribute("data-contrast", contrast);
  }, [contrast]);

  return (
    <div className="accessibility-widget">
      <button
        className="accessibility-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Opções de acessibilidade"
        title="Acessibilidade"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="4" r="2"/>
          <path d="M12 7v8"/>
          <path d="M5 10l7-1.5 7 1.5"/>
          <path d="M9 16l-2 5"/>
          <path d="M15 16l2 5"/>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
