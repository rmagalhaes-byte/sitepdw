import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/sobre", label: "Sobre" },
  { href: "/solucao", label: "Solucao" },
  { href: "/casos-de-uso", label: "Casos de Uso" },
  { href: "/contactos", label: "Contactos" }
];

export function PdwHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/">
          Portuguese Digital Wallet
        </Link>
        <nav className="nav" aria-label="Navegacao principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contactos" className="cta">
          Solicitar acesso
        </Link>
      </div>
    </header>
  );
}
