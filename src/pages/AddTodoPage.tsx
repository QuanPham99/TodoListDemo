import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function AddTodoPage() {
  const navigate = useNavigate();
  const { addTodo } = useApp();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setError(null);

    addTodo({
      title: title.trim(),
      completed: false,
      dueDate: dueDate || undefined,
    });

    navigate("/dashboard", { replace: true });
  }

  function handleCancel() {
    navigate("/dashboard");
  }

  return (
    <div className="page narrow">
      <h1>Add todo</h1>
      <p className="hint">Create a todo and submit</p>
      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Todo title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Buy milk"
          />
        </label>
        <label className="field">
          <span>Due date (optional)</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        {error ? <p className="error">{error}</p> : null}
        <div className="actions">
          <button type="submit" className="primary">
            Save todo
          </button>
          <button type="button" className="secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
