import React from "react";
import { useState } from "react";
import "./StateSearchCard.css"

function StateSearch({ gameId, userGameSessionData, userId }) {
  console.log("userGameSessionData:", userGameSessionData);
  // const {
  //   attributes: { collected_states, uncollected_states },
  // } = userGameSessionData;

  const collectedStates = userGameSessionData?.attributes?.collected_states || [];
  const uncollectedStates = userGameSessionData?.attributes?.uncollected_states || [];

  console.log("Collected States:", collectedStates);
  console.log("Uncollected States:", uncollectedStates);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchListSelection, setSearchListSelection] = useState("");

  const filteredUncollectedStates = uncollectedStates.filter(state =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRadionChange = (event) => {
    setSearchListSelection(event.target.value);
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
          <h3>Uncollected States: {filteredUncollectedStates.length} left</h3>
            <form>
              {filteredUncollectedStates.length > 0 ? (
                filteredUncollectedStates.map((state, index) => (
                  <div key={index} className="radio-group">
                    <input
                      type="radio"
                      id={`state-${index}`}
                      name="state"
                      value={state.name}
                      checked={searchListSelection === state.name}
                      onChange={handleRadionChange}
                    />
                    <label htmlFor={`state-${index}`}>{state.name} ({state.abbreviation})</label>
                  </div>
                ))
              ) : (
                <li>No States Match Your Search</li>
              )}
            </form>
        </div>
      </div>
  );
}

export default StateSearch;
