import { Link, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function Layout() {
  const { userEmail, logout } = useApp();

  return (
    <div className="layout">
      <header className="header">
        <Link to="/dashboard" className="brand">
          Coda Beavers - Mini Todolist
        </Link>
        <nav className="nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/add-todo">Add todo</Link>
          {userEmail ? (
            <span className="user-meta">
              <span className="muted">{userEmail}</span>
              <button type="button" className="link-button" onClick={logout}>
                Log out
              </button>
            </span>
          ) : null}
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
