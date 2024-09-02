import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getGameSessionById, getUserById } from "../api/UsersApi.js";
import StateSearch from "../components/StateSearchCard.js";
import UserScoreboard from "../components/UserScoreboardCard.js";
import "./GameSession.css"
import NavBar from "../components/NavBar.js"

function GameSession() {
  const [gameId, setGameId] = useState(useLocation().state.gameId);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("")
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
          const [userData, gameSessionData] = await Promise.all([
          getUserById(userId),
          getGameSessionById(userId, gameId)
        ]);
        console.log("userData", userData)
        setUserGameSessionData(userData);
        setUsername(userData.username);
        setUserGameSessionData(gameSessionData);
        } catch (error) {
          console.log(
            "Issue fetching game session data in GameSession:",
            error
          );
        }
      }
    };

    fetchData();
  }, [gameId, userId]);

  console.log("Username in game session", username)

  return (
    <>
    <NavBar />
      <h1 className="game-session-header">{username}'s Game Session Page, Dawg</h1>
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
            username={username}
          />
        </div>
      </div>
    </>
  );
}

export default GameSession;
