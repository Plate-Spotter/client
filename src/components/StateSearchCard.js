import React from "react";
import { useState } from "react";
import "./StateSearchCard.css"
import { getGameSessionById, postUserLicensePlate } from "../api/UsersApi"

function StateSearch({ userId, gameId, userGameSessionData, setUserGameSessionData }) {

  const uncollectedLpStates = userGameSessionData?.uncollected_states || [];

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedLpStateName, setSelectedLpStateName] = useState("");

  const filteredUncollectedLpStates = uncollectedLpStates.filter(state =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRadioChange = (event) => {
    setSelectedLpStateName(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedLpStateName) {
      alert("Please select a state");
      return;
    }

    const license_plate_id = uncollectedLpStates.find(lpState => lpState.name === selectedLpStateName).id;

    try{
      const response = await postUserLicensePlate(userId, gameId, license_plate_id);
      const gameSessionData = await getGameSessionById(userId, gameId);
      setUserGameSessionData(gameSessionData);
      alert(`${selectedLpStateName} has been collected`);
    } catch (error) {
      alert("There was an error collecting this license plate.");
    }
  };


  return (
      <div className="state-search-container">
        <label htmlFor="search-input">Search for state:</label>
        <input
          type="text"
          id="search-input"
          name="search"
          placeholder="Enter State Name or Abbr."
          value={searchQuery}
          onChange={handleSearchChange}
          className="input-box"
        />

        <div className="uncollected-states-list">
          <h3>Uncollected States: {filteredUncollectedLpStates.length} left</h3>
            <form onSubmit={handleFormSubmit}>
              {filteredUncollectedLpStates.length > 0 ? (
                filteredUncollectedLpStates.map((state, index) => (
                  <div key={index} className="radio-group">
                    <input
                      type="radio"
                      id={`state-${index}`}
                      name="license-plate-state"
                      value={state.name}
                      checked={selectedLpStateName === state.name}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor={`state-${index}`}>{state.name} ({state.abbreviation})</label>
                  </div>
                ))
              ) : (
                <li>No States Match Your Search</li>
              )}
              <button type="submit" className="submit-button">Collect License Plate</button>
            </form>
        </div>
      </div>
  );
}

export default StateSearch;
