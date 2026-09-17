import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";

const TaskItem = ({
  task,
  onToggleTask,
  onDeleteTask,
}) => {
  return (
    <article
      className={`group flex items-center gap-3 rounded-2xl border px-3 py-3 transition-all hover:border-sky-500/30 hover:shadow-sm sm:px-4 ${
        task.completed ? "bg-muted/30" : "bg-background"
      }`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={task.completed}
        aria-label={`${task.completed ? "Mark incomplete" : "Mark complete"}: ${task.title}`}
        onClick={() => onToggleTask(task._id)}
        className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${
          task.completed
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-muted-foreground/30 text-transparent hover:border-sky-500"
        }`}
      >
        <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span
            className={`truncate text-sm font-medium sm:text-[15px] ${
              task.completed ? "text-muted-foreground line-through" : "text-foreground"
            }`}
          >
            {task.title}
          </span>
          <Badge
            variant={task.completed ? "secondary" : "outline"}
            className="hidden sm:inline-flex"
          >
            {task.completed ? "Done" : "Open"}
          </Badge>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {task.completed ? "Completed" : "Ready when you are"}
        </p>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Delete ${task.title}`}
        title="Delete task"
        onClick={() => onDeleteTask(task._id)}
        className="shrink-0 text-muted-foreground opacity-100 hover:bg-destructive/10 hover:text-destructive sm:opacity-0 sm:group-hover:opacity-100"
      >
        <Trash2 className="size-4" aria-hidden="true" />
      </Button>
    </article>
  );
};

export default TaskItem;