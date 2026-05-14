type Status = "available" | "development" | "research";

const map = {
  available: { label: "Disponivel", className: "status status-ok" },
  development: { label: "Em desenvolvimento", className: "status status-dev" },
  research: { label: "Em investigacao", className: "status status-rd" }
};

export function StatusBadge({ status }: { status: Status }) {
  const item = map[status];
  return <span className={item.className}>{item.label}</span>;
}
