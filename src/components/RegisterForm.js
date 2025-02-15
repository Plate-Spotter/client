import React from "react";
import { useState, useEffect } from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/UsersApi";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = await registerUser(username, email, password, confirmPassword);
      setIsRegistered(true);
      setUserId(userData.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isRegistered && userId) {
      localStorage.setItem("userId", userId)
      navigate("/profile");
    }
  }, [isRegistered, userId, navigate]);

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="register-form-label">
          Username:
          <input
            className="register-form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="register-form-label">
          Email:
          <input
            className="register-form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="register-form-label">
          Password:
          <input
            className="register-form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="register-form-label">
          Password Confirmation:
          <input
            className="register-form-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className="register-button" type="submit">
          Register User
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
