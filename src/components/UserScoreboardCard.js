import React from "react";
import "./UserScoreboardCard.css";

function UserScoreboard({ userId, gameId, username, userGameSessionData }) {
  const collectedStates =
    userGameSessionData?.attributes?.collected_states || [];


  return (
    <div className="user-scoreboard-box">
      <h3 className="user-scoreboard-header">{username}'s Collected States</h3>
      <ul className="collected-state-list">
        {collectedStates.length > 0 ? (
          collectedStates.map((state, index) => (
            <li key={index} className="colllected-state-item">
              {state.name} ({state.abbreviation})
            </li>
          ))
        ) : (
          <li>No States Collected Yet</li>
        )}
      </ul>
    </div>
  );
}

export default UserScoreboard;
