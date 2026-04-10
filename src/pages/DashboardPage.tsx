import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function DashboardPage() {
  const { todos, toggleTodoComplete } = useApp();

  const active = todos.filter((t) => !t.completed);
  const done = todos.filter((t) => t.completed);

  return (
    <div className="page dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Todo dashboard</h1>
          <p className="dashboard-subtitle muted">
            {todos.length === 0
              ? "Nothing here yet — add your first todo."
              : `${active.length} active · ${done.length} done`}
          </p>
        </div>
        <Link to="/add-todo" className="button primary">
          Add todo
        </Link>
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
              <li key={t.id} className="todo-row">
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked={false}
                    onChange={() => toggleTodoComplete(t.id)}
                    aria-label={`Mark «${t.title}» complete`}
                  />
                  <span className="todo-title">{t.title}</span>
                  {t.dueDate ? (
                    <span className="muted todo-due">Due {t.dueDate}</span>
                  ) : null}
                </label>
              </li>
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
              <li key={t.id} className="todo-row todo-row--done">
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked
                    onChange={() => toggleTodoComplete(t.id)}
                    aria-label={`Mark «${t.title}» not done`}
                  />
                  <span className="todo-title">{t.title}</span>
                  {t.dueDate ? (
                    <span className="muted todo-due">Was due {t.dueDate}</span>
                  ) : null}
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
