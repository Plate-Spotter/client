import React from "react";
import { useState, useEffect } from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";

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
    console.log("submitting:", username, email, password);
    try {
      const response = await fetch(
        "https://03f6ed0f-78cd-482b-ac54-e1ad190432be.mock.pstmn.io/users",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
          }),
        }
      );

      if (response.status === 201) {
        const data = await response.json();
        setIsRegistered(true);
        setUserId(data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isRegistered && userId) {
      navigate("/profile", { state: { userId: userId } });
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
