import React from "react";
import { useState, useEffect} from "react";
import "./GameSession.css"

function GameSession({ gameData }) {
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
    <div className="game-session-container">
      <label className="game-session-label">
        <h3>Active Game: { name }</h3>
        <p>States Left to Collect: </p>
        <p>You started this game on: { start_date} </p>
      </label>
    </div>
  );
}

export default GameSession;