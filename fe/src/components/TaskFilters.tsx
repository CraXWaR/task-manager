import type { Status } from "../types/task";

interface Props {
  statusFilter: Status | "all";
  dateOrder: "asc" | "desc";
  search: string;

  onStatusChange: (value: Status | "all") => void;
  onDateOrderChange: (value: "asc" | "desc") => void;
  onSearchChange: (value: string) => void;
}

export default function TaskFilters({
  statusFilter,
  dateOrder,
  search,
  onStatusChange,
  onDateOrderChange,
  onSearchChange,
}: Props) {
  return (
    <div className="filters">
      <input
        type="text"
        value={search}
        placeholder="Search by title..."
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="field">
        <label>Status</label>
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as Status | "all")}
        >
          <option value="all">All</option>
          <option value="todo">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Filed</option>
        </select>
      </div>

      <div className="field">
        <label>By Date</label>
        <select
          value={dateOrder}
          onChange={(e) => onDateOrderChange(e.target.value as "asc" | "desc")}
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </div>
    </div>
  );
}
