import React from "react";
import "./Welcome.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Welcome() {
  useEffect(() => {
    fetch("https://03f6ed0f-78cd-482b-ac54-e1ad190432be.mock.pstmn.io/users/1", {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }, [])
  return (
    <>
      <div className="Welcome">
        <h3>Welcome to the Plate Spottah Game!</h3>
        <Link to="/register">Sign Up or Login</Link>
      </div>
    </>
  );
}

export default Welcome;
