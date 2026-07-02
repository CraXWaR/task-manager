import { useState, useEffect } from "react";
import type { Task, Status } from "../types/task";

interface Props {
  initialData?: Task | null;
  onSubmit: (data: {
    title: string;
    description?: string;
    status: Status;
  }) => void;
  onCancel?: () => void;
}

export default function TaskForm({ initialData, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("todo");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description ?? "");
      setStatus(initialData.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("todo");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description, status });
  };

  const ticketNo = initialData ? String(initialData.id).padStart(4, "0") : "NEW";

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div className="ticket-form-head">
        <span className="ticket-no">Ticket No. {ticketNo}</span>
        <span className="ticket-form-title">
          {initialData ? "Amend ticket" : "File a new ticket"}
        </span>
      </div>

      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="description">Notes</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add detail, if any"
        />
      </div>

      <div className="field">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
        >
          <option value="todo">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Filed</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit">{initialData ? "Update ticket" : "File ticket"}</button>
        {onCancel && (
          <button type="button" className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}