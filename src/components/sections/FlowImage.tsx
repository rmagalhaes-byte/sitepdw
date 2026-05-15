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

export function FlowImage() {
  return (
    <figure className="flow-image">
      <Image
        src="/Como-funciona.png"
        alt="Como funciona a PDW: 1 Pedido — um serviço solicita as informações necessárias. 2 Autorização — o utilizador aprova a partilha. 3 Verificação — as credenciais são validadas via EBSI. 4 Ação — o serviço é executado. Os dados ficam seguros no controlo do utilizador."
        width={1200}
        height={520}
        loading="lazy"
      />
    </figure>
  );
}
