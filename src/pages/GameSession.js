import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import StateSearch from "../components/StateSearchCard.js";

function GameSession() {
  const [gameId, setGameId] = useState(useLocation().state.gameId);
  console.log(gameId);

  return (
    <div>
      <h1>dawg</h1>
      <StateSearch></StateSearch>
    </div>
  );
}

export default GameSession;
