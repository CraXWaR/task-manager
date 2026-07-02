import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TaskListPage from "./pages/TaskListPage";
import TaskCreatePage from "./pages/TaskCreatePage";
import TaskEditPage from "./pages/TaskEditPage";

function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h1>Task Manager</h1>
        <main>
          <Routes>
            <Route path="/" element={<TaskListPage />} />
            <Route path="/tasks/new" element={<TaskCreatePage />} />
            <Route path="/tasks/:id/edit" element={<TaskEditPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
