import React from "react";

function StateSearch({ gameId, userGameSessionData, userId }) {
  console.log("StateSearch gameID:", gameId)
  console.log("StateSearch userID:", userId)
  console.log("StateSearch Collected License Plates:", userGameSessionData.attributes.collected_states)
  console.log("StateSearch Uncollected License Plates:", userGameSessionData.attributes.uncollected_states)

  return <h3>mmmkay</h3>;
}

export default StateSearch;
