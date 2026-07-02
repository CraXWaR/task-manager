import { Link } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";
import { useMemo, useState } from "react";
import type { Status } from "../types/task";

export default function TaskListPage() {
  const { tasks, loading, error, removeTask } = useTasks();

  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [dateOrder, setDateOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => {
        const matchesStatus =
          statusFilter === "all" ? true : task.status === statusFilter;

        const matchesSearch = task.title
          .toLowerCase()
          .includes(search.toLowerCase());

        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const aDate = new Date(a.created_at).getTime();
        const bDate = new Date(b.created_at).getTime();

        return dateOrder === "asc" ? aDate - bDate : bDate - aDate;
      });
  }, [tasks, statusFilter, dateOrder, search]);

  return (
    <div>
      <div className="page-header">
        <div>
          <span className="eyebrow">Dispatch board</span>
          <h2>Open tickets</h2>
        </div>
        <Link to="/tasks/new" className="btn">
          + New ticket
        </Link>
      </div>

      <TaskFilters
        statusFilter={statusFilter}
        dateOrder={dateOrder}
        search={search}
        onStatusChange={setStatusFilter}
        onDateOrderChange={setDateOrder}
        onSearchChange={setSearch}
      />

      {loading && <p className="status-text">Loading tickets…</p>}
      {error && <p className="status-text error-text">{error}</p>}

      <TaskList tasks={filteredTasks} onDelete={removeTask} />
    </div>
  );
}
