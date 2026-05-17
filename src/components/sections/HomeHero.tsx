/**
 * pdw-site-v2/src/components/sections/HomeHero.tsx
 *
 * NOVO · Client Component (wrapper).
 *
 * O <HeroInstitutional /> precisa de um onClick para abrir o vídeo
 * conceito. Como o page.tsx tem de continuar a ser Server Component
 * (precisa de generateMetadata + SEO), isolamos a interactividade
 * neste wrapper.
 *
 * Composição:
 *   <HeroInstitutional onPlayDemo={...} ... />
 *   <VideoModal open={...} onClose={...} />
 */
"use client";

import { useState } from "react";
import { HeroInstitutional } from "@/components/sections/HeroInstitutional";
import { VideoModal } from "@/components/ui/VideoModal";
import type { Locale } from "@/i18n/config";

interface HomeHeroProps {
  dict: any;
  lang: Locale;
}

export function HomeHero({ dict, lang }: HomeHeroProps) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <HeroInstitutional
        dict={dict}
        lang={lang}
        onPlayDemo={() => setVideoOpen(true)}
      />
      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        src="/concept_video.mp4"
        caption={
          lang === "pt"
            ? "Vídeo conceito · Portuguese Digital Wallet"
            : "Concept video · Portuguese Digital Wallet"
        }
      />
    </>
  );
}
