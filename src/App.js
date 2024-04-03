import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import Profile from './components/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )

};

export default App;
