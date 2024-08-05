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
      </label>
    </div>
  );
}

export default GameSession;