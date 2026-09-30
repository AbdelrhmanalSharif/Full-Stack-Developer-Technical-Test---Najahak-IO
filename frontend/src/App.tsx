import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  function handleLogin() {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}

export default App;