import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import type { Todo } from "../types/todo";

const DASHBOARD_TITLE = "Coda Baevers - Mini Todolist";

function TrashIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

type TodoRowProps = {
  t: Todo;
  variant: "active" | "done";
  editingId: string | null;
  editDraft: string;
  onEditDraftChange: (value: string) => void;
  onStartEdit: (todo: Todo) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  toggleTodoComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
};

function TodoRow({
  t,
  variant,
  editingId,
  editDraft,
  onEditDraftChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  toggleTodoComplete,
  deleteTodo,
}: TodoRowProps) {
  const isEditing = editingId === t.id;
  const completeAria =
    variant === "active"
      ? `Mark «${t.title}» complete`
      : `Mark «${t.title}» not done`;
  const due =
    t.dueDate != null && t.dueDate !== "" ? (
      <span className="muted todo-due">
        {variant === "active" ? "Due " : "Was due "}
        {t.dueDate}
      </span>
    ) : null;

  return (
    <li
      className={
        variant === "done" ? "todo-row todo-row--done" : "todo-row"
      }
    >
      <div className="todo-row-main">
        <div className="todo-label">
          <input
            type="checkbox"
            checked={t.completed}
            onChange={() => toggleTodoComplete(t.id)}
            aria-label={completeAria}
          />
          {isEditing ? (
            <div className="todo-edit-wrap">
              <input
                type="text"
                className="todo-title-input"
                value={editDraft}
                onChange={(e) => onEditDraftChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onSaveEdit(t.id);
                  }
                  if (e.key === "Escape") {
                    e.preventDefault();
                    onCancelEdit();
                  }
                }}
                aria-label={`Edit title for «${t.title}»`}
              />
              <div className="todo-edit-actions">
                <button
                  type="button"
                  className="link-button"
                  onClick={() => onSaveEdit(t.id)}
                >
                  Save
                </button>
                <button type="button" className="link-button" onClick={onCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <span className="todo-title">{t.title}</span>
          )}
          {due}
        </div>
        <div className="todo-row-actions">
          {isEditing ? null : (
            <button
              type="button"
              className="todo-edit"
              aria-label={`Edit ${t.title}`}
              onClick={() => onStartEdit(t)}
            >
              <PencilIcon />
            </button>
          )}
          <button
            type="button"
            className="todo-delete"
            aria-label={`Delete ${t.title}`}
            onClick={() => deleteTodo(t.id)}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </li>
  );
}

export function DashboardPage() {
  const {
    todos,
    toggleTodoComplete,
    deleteAllTodos,
    deleteTodo,
    updateTodoTitle,
  } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");

  const active = todos.filter((t) => !t.completed);
  const done = todos.filter((t) => t.completed);

  function startEdit(todo: Todo) {
    setEditingId(todo.id);
    setEditDraft(todo.title);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditDraft("");
  }

  function saveEdit(id: string) {
    const next = editDraft.trim();
    if (!next) return;
    updateTodoTitle(id, next);
    cancelEdit();
  }

  const rowProps = {
    editingId,
    editDraft,
    onEditDraftChange: setEditDraft,
    onStartEdit: startEdit,
    onSaveEdit: saveEdit,
    onCancelEdit: cancelEdit,
    toggleTodoComplete,
    deleteTodo,
  };

  return (
    <div className="page dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">{DASHBOARD_TITLE}</h1>
          <p className="dashboard-subtitle muted">
            {todos.length === 0
              ? "Nothing here yet — add your first todo."
              : `${active.length} active · ${done.length} done`}
          </p>
        </div>
        <div className="dashboard-header-actions">
          <button type="button" className="secondary" onClick={deleteAllTodos}>
            Delete all
          </button>
          <Link to="/add-todo" className="button primary">
            Add todo
          </Link>
        </div>
      </header>

      <section className="todo-section" aria-labelledby="active-heading">
        <h2 id="active-heading" className="todo-section-title">
          To do
        </h2>
        {active.length === 0 ? (
          <p className="muted empty-hint">No open todos</p>
        ) : (
          <ul className="todo-list">
            {active.map((t) => (
              <TodoRow key={t.id} t={t} variant="active" {...rowProps} />
            ))}
          </ul>
        )}
      </section>

      <section className="todo-section" aria-labelledby="done-heading">
        <h2 id="done-heading" className="todo-section-title">
          Done
        </h2>
        {done.length === 0 ? (
          <p className="muted empty-hint">No completed todos yet</p>
        ) : (
          <ul className="todo-list">
            {done.map((t) => (
              <TodoRow key={t.id} t={t} variant="done" {...rowProps} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
