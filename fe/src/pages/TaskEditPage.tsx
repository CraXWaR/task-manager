import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Task } from "../types/task";
import { taskService } from "../services/task.service";
import TaskForm from "../components/TaskForm";

export default function TaskEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      taskService
        .getTask(Number(id))
        .then(setTask)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    await taskService.updateTask(Number(id), data);
    navigate("/");
  };

  if (loading) return <p className="status-text">Loading ticket…</p>;
  if (!task) return <p className="status-text error-text">Ticket not found.</p>;

  return (
    <div>
      <div className="page-header">
        <div>
          <span className="eyebrow">Dispatch board</span>
          <h2>Edit ticket</h2>
        </div>
      </div>
      <TaskForm
        initialData={task}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </div>
  );
}