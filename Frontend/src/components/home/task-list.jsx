import TaskItem from "./task-item";
import { ClipboardList } from "lucide-react";

const TaskList = ({
  tasks,
  totalTasks,
  isLoading,
  hasFilters,
  onToggleTask,
  onDeleteTask,
}) => {
  return (
    <div className="px-4 pb-4 sm:px-6 sm:pb-6">
      {isLoading ? (
        <div className="space-y-2" aria-label="Loading tasks">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-[68px] animate-pulse rounded-2xl bg-muted/60" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-14 text-center">
          <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-600 dark:text-sky-400">
            <ClipboardList className="size-6" aria-hidden="true" />
          </div>
          <h3 className="mt-4 font-semibold">
            {hasFilters ? "No matching tasks" : "Your list is ready"}
          </h3>
          <p className="mt-1 max-w-xs text-sm leading-6 text-muted-foreground">
            {hasFilters
              ? "Try a different search or filter to find what you need."
              : "Add your first task above and make the next step concrete."}
          </p>
        </div>
      ) : (
        <div className="space-y-2" aria-live="polite">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}

      {!isLoading && totalTasks > 0 && (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Keep going. Small completions compound.
        </p>
      )}
    </div>
  );
};

export default TaskList;