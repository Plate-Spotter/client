import React from "react";
import { postNewGame } from "../api/UsersApi";
import { useNavigate } from "react-router-dom";
import "./StartGameButton.css";

function StartGameButton({ gameName, gameDate, userId }) {
  const navigate = useNavigate();

  const handleStartGame = async(e) => {

    e.preventDefault();
    try {
      const gameData = await postNewGame(gameName, gameDate, userId);

      if (gameData?.id) {
        navigate(`/game-session`, { state: { gameId: gameData.id } });
      } else {
        console.error("Game ID not found in response data");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button className="start-game-button" onClick={ handleStartGame }>Start Game</button>
  )

};

export default StartGameButton;