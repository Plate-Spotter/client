import React from "react";
import { useState, useEffect} from "react";
import "./GameCard.css"
import { Link } from "react-router-dom";
import { getGameSessionById } from "../api/UsersApi.js";


function GameCard({ gameData }) {
  const {
    id,
    type,
    attributes: {
      name,
      start_date,
      end_date,
      collected_states,
      created_at,
      updated_at
    }
  } = gameData;

  const gameId = gameData.id
  const [userId, setUserId] = useState(null);
  const [gameCardSessionData, setGameCardSessionData] = useState([]);
  const uncollectedStates = gameCardSessionData?.attributes?.uncollected_states || [];

  const statesLeftToCollect = uncollectedStates.length

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
          setGameCardSessionData(gameSessionData);
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




  return (
    <div className="game-card-container">
      <label className="game-card-label">
        <h3>Active Game: { name }</h3>
        <p>States Collected: {collected_states.length}</p>
        <p>Number of States Left to Collect: { statesLeftToCollect }</p>
        <p>You started this game on: { start_date} </p>
      </label>
      <Link to="/game_session" state={{ gameId: id }}>
        <button className="game-session-button">Continue Game</button>
      </Link>
    </div>
  );
}

export default GameCard;