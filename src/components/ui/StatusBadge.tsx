type Status = "available" | "development" | "research";

interface StatusBadgeProps {
  status: Status;
  dict: any;
}

export function StatusBadge({ status, dict }: StatusBadgeProps) {
  const classMap = {
    available: "status status-ok",
    development: "status status-dev",
    research: "status status-rd"
  };

  const label = dict.status[status] || status;

  return <span className={classMap[status]}>{label}</span>;
}
