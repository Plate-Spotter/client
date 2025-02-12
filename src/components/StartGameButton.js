import React from "react";
import { postNewGame } from "../api/UsersApi";

function StartGameButton({ gameName, gameDate, userId }) {

  const handleStartGame = async(e) => {
    e.preventDefault();
    console.log("Game Name:", gameName);
    console.log("Game Date:", gameDate);
    console.log("Starting game...");
    try {
      const gameData = await postNewGame(gameName, gameDate, userId);
      console.log("Game data:", gameData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button onClick={ handleStartGame }>Start Game</button>
  )

};

export default StartGameButton;