import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

const TaskItem = ({
  task,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleEdit = () => {
    if (!title.trim()) return;

    onEditTask(task.id, title);
    setIsEditing(false);
  };

  return (
    <TableRow className={task.completed ? "opacity-70" : ""}>
      <TableCell>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
          className="h-4 w-4 accent-primary"
        />
      </TableCell>

      <TableCell>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <Button size="sm" onClick={handleEdit}>
              Save
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span
              className={task.completed ? "line-through text-muted-foreground" : "font-medium"}
            >
              {task.title}
            </span>
            <Badge variant={task.completed ? "secondary" : "outline"}>
              {task.completed ? "Done" : "Open"}
            </Badge>
          </div>
        )}
      </TableCell>

      <TableCell className="text-right">
        {isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        ) : (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>

            <Button variant="destructive" size="sm" onClick={() => onDeleteTask(task.id)}>
              Delete
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TaskItem;