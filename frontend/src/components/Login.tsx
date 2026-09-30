import { useState } from "react";
import type { FormEvent } from "react";
import "../styles/login.css";

type LoginProps = {
  onLogin: () => void;
};

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    onLogin();
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Client Requests</h1>
        <p>Sign in to access the dashboard.</p>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="��������"
          />
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
