import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getGameSessionById, getUsersGameById } from "../api/UsersApi.js";
import StateSearch from "../components/StateSearchCard.js";

function GameSession() {
  const [gameId, setGameId] = useState(useLocation().state.gameId);
  const [userId, setUserId] = useState(null)
  const [userGameSessionData, setUserGameSessionData] = useState([]);
  console.log("GameSession gameId:", gameId);
  console.log("GameSession userId:", userId);
  console.log("GameSession userLicensePlates:", userGameSessionData);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
     setUserId(storedUserId);
    }
  }, [])

  useEffect(() => {
    const fetchData = async() => {
      if (gameId && userId) {
        try {
          const gameSessionData = await getGameSessionById(userId, gameId);
          console.log("User Game Sessions Data:", gameSessionData)
          setUserGameSessionData(gameSessionData)
        } catch (error) {
          console.log("Issue fetching userLicensePlate data in GameSession:", error);
        }
      }
     }

     fetchData();
  }, [gameId, userId])



  return (
    <div>
      <h1>dawg</h1>
      <StateSearch gameId={gameId} userGameSessionData={userGameSessionData} userId={userId} />
    </div>
  );
}

export default GameSession;
