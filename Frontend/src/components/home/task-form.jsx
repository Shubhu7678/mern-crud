import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAddTask(trimmedTitle);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-3 mb-4">
      <Input
        type="text"
        placeholder="Enter a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1"
      />

      <Button type="submit" size="sm">
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;