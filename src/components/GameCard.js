import React from "react";
import { useState, useEffect} from "react";
import "./GameCard.css"
import { Link } from "react-router-dom";


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

  return (
    <div className="game-card-container">
      <label className="game-card-label">
        <h3>Active Game: { name }</h3>
        <p>States Left to Collect: </p>
        <p>You started this game on: { start_date} </p>
      </label>
      <Link to="/game_session" state={{ gameId: id }}>
        <button className="game-session-button">Continue Game</button>
      </Link>
    </div>
  );
}

export default GameCard;