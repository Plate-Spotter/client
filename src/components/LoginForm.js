import React from "react";
import { useState, useEffect } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/UsersApi";

function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const userData = await loginUser(usernameOrEmail, password);
      if (!userData.id) {
        throw new Error("Invalid login credentials");
      }
      setIsLoggedIn(true);
      setUserId(userData.id);
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    if (setIsLoggedIn && userId) {
      localStorage.setItem("userId", userId)
      navigate("/profile");
    }
  }, [setIsLoggedIn, userId, navigate]);

  return (
    <div className="login-form-container">
      {error && <div className="error-popup" onClick={() => setError(null)}>
        <div className="error-popup-content" onClick={(e) => e.stopPropagation()}>
          <p>{error}</p>
        </div>
      </div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-form-label">
          Username or Email:
          <input
            className="login-form-input"
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
        </label>
        <label className="login-form-label">
          Password:
          <input
            className="login-form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="login-button" type="submit">
          Login User
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
