import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { taskService } from "../services/task.service";
import { useState } from "react";

export default function TaskCreatePage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      await taskService.createTask(data);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <span className="eyebrow">Dispatch board</span>
          <h2>New ticket</h2>
        </div>
      </div>
      {error && <p className="error-text">{error}</p>}
      <TaskForm onSubmit={handleSubmit} onCancel={() => navigate("/")} />
    </div>
  );
}
