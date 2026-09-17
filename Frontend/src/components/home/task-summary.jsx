import { CheckCircle2, CircleDashed, ListTodo } from "lucide-react";

const metrics = [
  {
    key: "total",
    label: "Total tasks",
    icon: ListTodo,
    iconClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    key: "open",
    label: "In progress",
    icon: CircleDashed,
    iconClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    iconClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
];

const TaskSummary = ({ total, open, completed }) => {
  const values = { total, open, completed };

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {metrics.map(({ key, label, icon: Icon, iconClass }) => (
        <div
          key={key}
          className="group flex items-center justify-between rounded-2xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {label}
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
              {values[key]}
            </p>
          </div>
          <div className={`rounded-xl p-2.5 ${iconClass}`}>
            <Icon className="size-5" aria-hidden="true" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskSummary;
