import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import Register from "./pages/Register"
import StartGame from './pages/StartGame';
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/start" element={<StartGame />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )

};

export default App;
