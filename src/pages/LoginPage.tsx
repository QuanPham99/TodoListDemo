import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { setUserEmail } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setError(null);
    setUserEmail(email.trim());
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="page narrow">
      <h1>Sign in</h1>
      <p className="hint">Demo login: enter any email and password to open your todo dashboard</p>
      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>
        {error ? <p className="error">{error}</p> : null}
        <button type="submit" className="primary">
          Log in
        </button>
      </form>
    </div>
  );
}
