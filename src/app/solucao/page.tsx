import { SectionHeading } from "@/components/ui/SectionHeading";

export default function SolucaoPage() {
  return (
    <section className="section-card">
      <SectionHeading
        title="Solucao"
        subtitle="Fluxo Emissor > Titular > Verificador com credenciais verificaveis."
      />
      <ol className="simple-list">
        <li>1. Emissao institucional da credencial.</li>
        <li>2. Armazenamento seguro na carteira do titular.</li>
        <li>3. Verificacao instantanea por entidade autorizada.</li>
      </ol>
    </section>
  );
}
