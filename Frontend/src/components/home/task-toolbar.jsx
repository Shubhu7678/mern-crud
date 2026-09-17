import { ListFilter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const filters = [
  { value: "all", label: "All tasks" },
  { value: "open", label: "Open" },
  { value: "completed", label: "Completed" },
];

const TaskToolbar = ({ search, onSearchChange, filter, onFilterChange }) => {
  return (
    <div className="flex flex-col gap-3 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="relative w-full sm:max-w-xs">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          aria-label="Search tasks"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-10 rounded-xl border-0 bg-muted/70 pl-9 shadow-none focus-visible:bg-background"
        />
      </div>

      <div className="flex items-center gap-1 overflow-x-auto rounded-xl bg-muted/70 p-1">
        <ListFilter className="ml-2 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        {filters.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={filter === option.value}
            onClick={() => onFilterChange(option.value)}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === option.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskToolbar;
