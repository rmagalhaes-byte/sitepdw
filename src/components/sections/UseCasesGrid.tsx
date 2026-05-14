import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";

const cases = [
  {
    title: "Diplomas Universitarios",
    text: "Emissao e verificacao de diplomas com partilha seletiva e instantanea.",
    status: "available" as const,
    href: "/casos-de-uso/diplomas-digitais"
  },
  {
    title: "Identidade Estudantil",
    text: "Credencial estudantil multisservicos para ecossistemas academicos.",
    status: "development" as const,
    href: "/casos-de-uso"
  },
  {
    title: "Microcredenciais Profissionais",
    text: "Validacao de competencias e percursos de aprendizagem continua.",
    status: "research" as const,
    href: "/casos-de-uso"
  }
];

export function UseCasesGrid() {
  return (
    <section style={{ marginTop: 14 }}>
      <div className="grid-3">
        {cases.map((item) => (
          <article key={item.title} className="section-card">
            <StatusBadge status={item.status} />
            <h3 style={{ margin: "2px 0 8px" }}>{item.title}</h3>
            <p style={{ marginTop: 0, color: "var(--color-muted)" }}>{item.text}</p>
            <Link href={item.href} style={{ fontWeight: 700, color: "var(--color-primary)" }}>
              Ver detalhes
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
