import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/i18n/config";

interface HeroProps {
  lang: Locale;
  dict: any;
}

export function HeroInstitutional({ lang, dict }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          <span className="text-gradient">{dict.hero.title}</span>
        </h1>
        <p className="hero-subtitle">
          {dict.hero.subtitle}
        </p>
        <p className="hero-description">
          {dict.hero.description}
        </p>
        <div className="btn-row">
          <Link href={`/${lang}/casos-de-uso/diplomas-digitais`} className="cta cta-disruptive">
            {dict.hero.ctaDemo}
          </Link>
          <Link href={`/${lang}/contactos`} className="btn-secondary">
            {dict.hero.ctaAccess}
          </Link>
        </div>
      </div>
      <div className="hero-image-container">
        <div className="image-glow"></div>
        <Image 
          src={dict.hero.image} 
          alt={dict.hero.title} 
          width={600} 
          height={600} 
          className="disruptive-image"
          priority
        />
      </div>
    </section>
  );
}
