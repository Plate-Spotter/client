import React from "react";
import { useState, useEffect } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/UsersApi";

function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setIsLoggedIn, setIsLoggedInsetIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = await loginUser(usernameOrEmail, password);
      setIsLoggedInsetIsLoggedIn(true);
      setUserId(userData.id);
    } catch (error) {
      console.log(error);
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
