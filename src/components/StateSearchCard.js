import React from "react";
import { useState } from "react";
import "./StateSearchCard.css"
import { getGameSessionById, postUserLicensePlate } from "../api/UsersApi"

function StateSearch({ userId, gameId, userGameSessionData, setUserGameSessionData }) {

  const uncollectedLpStates = userGameSessionData?.uncollected_states || [];

  const [uncollectedStatesMap, setUncollectedStatesMap] = useState(() =>
    uncollectedLpStates.reduce((map, currentState) => {
    map[currentState.name] = {...currentState, selected: false}
    return map
  }, {})
  )

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedLpStateName, setSelectedLpStateName] = useState("");

  const filteredUncollectedLpStates = uncollectedLpStates.filter(state =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStateSelection = (event) => {
    setUncollectedStatesMap(prev => ({
      ...prev,
      [event]: { ...prev[event], selected: !prev[event].selected}
    }))
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
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      alert(`${selectedLpStateName} has been collected`);
    } catch (error) {
      alert("There was an error collecting this license plate.");
    }
  };
  console.log(uncollectedStatesMap, "here ye")

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
            <form id="uncollected-states-box" onSubmit={handleFormSubmit}>
              <fieldset>
                {filteredUncollectedLpStates.length > 0 ? (
                  Object.values(uncollectedStatesMap).map((state) => (
                    <div key={index} className="radio-group">
                      <input
                        type="checkbox"
                        id={`state-${index}`}
                        name="license-plate-state"
                        value={state.name}
                        checked={state.selected}
                        onChange={() => handleStateSelection(state.name)}
                        />
                      <label htmlFor={`state-${index}`}>{state.name} ({state.abbreviation})</label>
                    </div>
                  ))
                ) : (
                  <li>No States Match Your Search</li>
                )}
              </fieldset>
              <button type="submit" className="submit-button">Collect License Plate</button>
            </form>
        </div>
      </div>
  );
}

export default StateSearch;
