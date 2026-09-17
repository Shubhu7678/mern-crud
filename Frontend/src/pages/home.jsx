import { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import TaskForm from "@/components/home/task-form";
import TaskList from "@/components/home/task-list";
import TaskSummary from "@/components/home/task-summary";
import TaskToolbar from "@/components/home/task-toolbar";
import * as taskApi from "@/lib/api";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setError("");
        setTasks(await taskApi.getTasks());
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = async (title) => {
    try {
      setError("");
      setIsSubmitting(true);
      const newTask = await taskApi.createTask(title);
      setTasks((currentTasks) => [newTask, ...currentTasks]);
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTask = async (id) => {
    try {
      setError("");
      const updatedTask = await taskApi.toggleTask(id);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      setError("");
      await taskApi.deleteTask(id);
      setTasks((currentTasks) => currentTasks.filter((task) => task._id !== id));
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const visibleTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" || (filter === "completed" ? task.completed : !task.completed);
    return matchesSearch && matchesFilter;
  });

  const completedCount = tasks.filter((task) => task.completed).length;
  const openCount = tasks.length - completedCount;

  return (
    <main className="mx-auto w-full max-w-6xl pb-8">
      <section className="relative mb-6 overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-xl shadow-slate-950/10 sm:px-9 sm:py-10">
        <div className="absolute -right-16 -top-20 size-64 rounded-full border-[22px] border-sky-400/15" />
        <div className="absolute -bottom-32 right-24 size-72 rounded-full border-[1px] border-emerald-300/20" />
        <div className="relative max-w-2xl">
          <div className="mb-5 flex items-center gap-2 text-sm font-medium text-sky-200">
            <Sparkles className="size-4" aria-hidden="true" />
            Your focused workspace
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Make progress feel visible.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
            Capture the next thing, keep your momentum, and close the loop one task at a time.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-300">
            <span className="size-2 rounded-full bg-emerald-400" />
            {openCount === 0 ? "Everything is clear" : `${openCount} ${openCount === 1 ? "task" : "tasks"} in motion`}
            <ArrowUpRight className="size-3.5 text-slate-400" aria-hidden="true" />
          </div>
        </div>
      </section>

      <TaskSummary total={tasks.length} open={openCount} completed={completedCount} />

      <section className="mt-6 overflow-hidden rounded-3xl border bg-card shadow-sm">
        <div className="flex flex-col gap-4 px-4 pb-5 pt-6 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400">
              Task inbox
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">Today&apos;s priorities</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {visibleTasks.length} of {tasks.length} shown
          </p>
        </div>

        <TaskForm onAddTask={addTask} isSubmitting={isSubmitting} />

        {error && (
          <p className="mx-4 mb-4 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive sm:mx-6">
            {error}
          </p>
        )}

        <TaskToolbar
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
        />

        <TaskList
          tasks={visibleTasks}
          totalTasks={tasks.length}
          isLoading={isLoading}
          hasFilters={Boolean(search) || filter !== "all"}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </section>
    </main>
  );
};

export default Home;