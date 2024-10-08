import React from "react";
import "./Welcome.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../api/UsersApi";
import NavBar from "../components/NavBar";


function Welcome() {

  return (
    <>
      <div className="Welcome">
        <NavBar />
        <h3>Welcome to the Plate Spottah Game!</h3>
        <Link to="/register">Sign Up</Link>
        <Link to="/login">Log In</Link>


      </div>
    </>
  );
}

export default Welcome;
