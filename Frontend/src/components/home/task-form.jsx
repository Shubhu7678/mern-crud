import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TaskForm = ({ onAddTask, isSubmitting }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const wasAdded = await onAddTask(trimmedTitle);
    if (wasAdded) {
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2 px-4 pb-5 sm:gap-3 sm:px-6">
      <Input
        type="text"
        aria-label="New task title"
        placeholder="What needs your attention?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-11 flex-1 rounded-xl bg-muted/50 px-4 shadow-none"
      />

      <Button type="submit" size="sm" disabled={isSubmitting} className="h-11 rounded-xl px-3 sm:px-4">
        <Plus className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">{isSubmitting ? "Adding..." : "Add task"}</span>
        <span className="sr-only sm:hidden">{isSubmitting ? "Adding task" : "Add task"}</span>
      </Button>
    </form>
  );
};

export default TaskForm;