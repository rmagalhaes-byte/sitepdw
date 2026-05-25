/**
 * pdw-site-v2/src/components/sections/FlowImage.tsx
 *
 * NOVO (PR2). Substitui o array `flowSteps` por uma figura única
 * usando o infográfico oficial `/Como-funciona.png`. Mantém um
 * fallback de texto (caption) para leitores de ecrã.
 *
 * Server Component (sem estado).
 */
import Image from "next/image";

interface FlowImageProps {
  lang: string;
}

export function FlowImage({ lang }: FlowImageProps) {
  const src = lang === "en" ? "/EN/Como-funciona-EN.png" : "/Como-funciona.png";
  const alt =
    lang === "en"
      ? "How PDW works: 1 Request — a service requests the necessary information. 2 Authorisation — the user approves sharing. 3 Verification — credentials are validated via EBSI. 4 Action — the service is executed. Data stays secure under the user's control."
      : "Como funciona a PDW: 1 Pedido — um serviço solicita as informações necessárias. 2 Autorização — o utilizador aprova a partilha. 3 Verificação — as credenciais são validadas via EBSI. 4 Ação — o serviço é executado. Os dados ficam seguros no controlo do utilizador.";

  return (
    <figure className="flow-image">
      <Image src={src} alt={alt} width={1200} height={520} loading="lazy" />
    </figure>
  );
}
