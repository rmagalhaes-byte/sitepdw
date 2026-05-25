// pdw-site-v2/src/components/admin/AdminTabs.tsx
import Link from "next/link";

const TABS = [
  { id: "feed",   label: "Feed · Atualidades" },
  { id: "videos", label: "Vídeos" },
  { id: "logos",  label: "Logos" },
];

export function AdminTabs({ active }: { active: string }) {
  return (
    <nav className="admin-tabs" aria-label="Áreas de administração">
      {TABS.map(t => (
        <Link
          key={t.id}
          href={`?tab=${t.id}`}
          className={"admin-tab" + (active === t.id ? " is-active" : "")}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
