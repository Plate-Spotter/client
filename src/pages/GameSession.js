import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getGameSessionById, getUsersGameById } from "../api/UsersApi.js";
import StateSearch from "../components/StateSearchCard.js";
import UserScoreboard from "../components/UserScoreboardCard.js";
import "./GameSession.css"

function GameSession() {
  const [gameId, setGameId] = useState(useLocation().state.gameId);
  const [userId, setUserId] = useState(null);
  const [userGameSessionData, setUserGameSessionData] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (gameId && userId) {
        try {
          const gameSessionData = await getGameSessionById(userId, gameId);
          console.log("User Game Sessions Data:", gameSessionData);
          setUserGameSessionData(gameSessionData);
        } catch (error) {
          console.log(
            "Issue fetching userLicensePlate data in GameSession:",
            error
          );
        }
      }
    };

    fetchData();
  }, [gameId, userId]);

  return (
    <>
      <h1 className="game-session-header">Game Session Page, Dawg</h1>
      <div className="game-session-wrapper">
        <div className="state-search-box">
          <StateSearch
            gameId={gameId}
            userGameSessionData={userGameSessionData}
            userId={userId}
          />
        </div>
        <div className="user-scoreboard-container">
          <UserScoreboard
            gameId={gameId}
            userGameSessionData={userGameSessionData}
            userId={userId}
          />
        </div>
      </div>
    </>
  );
}

export default GameSession;
