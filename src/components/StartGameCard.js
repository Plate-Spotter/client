import React, { useEffect } from "react";
import "./StartGameCard.css";
import StartGameButton from "./StartGameButton";
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLocation } from "react-router-dom";

function StartGameCard() {
  const location = useLocation();
  const { userId } = location.state || {};
  const [gameName, setGameName] = React.useState("");
  const [gameDate, setGameDate] = React.useState(null);

  useEffect(() => {
    console.log("User ID in StartGameCard:", userId);
    if (!userId) {
      console.log("No user ID found in StartGameCard");
    }
  }, [userId]);

  const handleGameNameChange = (event) => {
    setGameName(event.target.value);
  };

  const handleGameDateChange = (date) => {
    setGameDate(date);
  };

  return (
    <div className="display">
      <h3>Start a Game, friend</h3>
      <h3>Other Friends...coming soon</h3>
      <div className="start-game-container">
        <form className="start-game-form">
          <label className="start-game-label">
            Game Name:
            <input
            className="start-game-input"
            type="text"
            value={gameName}
            onChange={handleGameNameChange}
            required />
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Select a Start Date" value={gameDate} onChange={handleGameDateChange}/>
            </DemoContainer>
          </LocalizationProvider>
        </form>
      </div>
      <StartGameButton gameName={gameName} gameDate={gameDate} userId={userId}/>
    </div>
  );
}

export default StartGameCard;
