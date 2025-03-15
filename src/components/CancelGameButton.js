import React from "react";
import { useNavigate } from "react-router-dom";


function CancelGameButton() {

  const navigate = useNavigate();

  const handleCancelGame = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this game?");
    if (confirmCancel) {
      navigate("/profile");
    }
  };

  return (
    <button className="cancel-game-button" onClick={ handleCancelGame }>
      Cancel Game
    </button>
  )
};

export default CancelGameButton;