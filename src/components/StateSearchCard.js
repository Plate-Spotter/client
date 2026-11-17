import React, { useState } from "react";
import "./StateSearchCard.css";
import { getGameSessionById, postUserLicensePlate } from "../api/UsersApi";

function StateSearch({ userId, gameId, userGameSessionData, setUserGameSessionData }) {
  const uncollectedLpStates = userGameSessionData?.uncollected_states || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNames, setSelectedNames] = useState(() => new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const query = searchQuery.trim().toLowerCase();
  const filteredUncollectedLpStates = uncollectedLpStates.filter(
    (state) =>
      state.name.toLowerCase().includes(query) ||
      state.abbreviation?.toLowerCase().includes(query)
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStateSelection = (stateName) => {
    setSelectedNames((prev) => {
      const next = new Set(prev);
      if (next.has(stateName)) next.delete(stateName);
      else next.add(stateName);
      return next;
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const selectedStates = uncollectedLpStates.filter((s) => selectedNames.has(s.name));
    if (selectedStates.length === 0) {
      alert("Please select at least one state");
      return;
    }

    setIsSubmitting(true);
    try {
      const results = await Promise.allSettled(
        selectedStates.map((s) => postUserLicensePlate(userId, gameId, s.id))
      );

      // Refresh even if some failed, so the list matches the server
      const gameSessionData = await getGameSessionById(userId, gameId);
      setUserGameSessionData(gameSessionData);
      setSelectedNames(new Set());

      const collected = selectedStates.filter((_, i) => results[i].status === "fulfilled");
      const failed = selectedStates.filter((_, i) => results[i].status === "rejected");

      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      if (collected.length) alert(`Collected: ${collected.map((s) => s.name).join(", ")}`);
      if (failed.length) alert(`Couldn't collect: ${failed.map((s) => s.name).join(", ")}`);
    } catch (error) {
      alert("There was an error collecting these license plates.");
    } finally {
      setIsSubmitting(false);
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
        <h3>Uncollected States: {uncollectedLpStates.length} left</h3>
        <form id="uncollected-states-box" onSubmit={handleFormSubmit}>
          <fieldset>
            {filteredUncollectedLpStates.length > 0 ? (
              filteredUncollectedLpStates.map((state) => (
                <div key={state.id} className="radio-group">
                  <input
                    type="checkbox"
                    id={`state-${state.id}`}
                    name="license-plate-state"
                    value={state.name}
                    checked={selectedNames.has(state.name)}
                    onChange={() => handleStateSelection(state.name)}
                  />
                  <label htmlFor={`state-${state.id}`}>
                    {state.name} ({state.abbreviation})
                  </label>
                </div>
              ))
            ) : (
              <p>No States Match Your Search</p>
            )}
          </fieldset>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting
              ? "Collecting..."
              : `Collect License Plate${selectedNames.size > 1 ? "s" : ""}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StateSearch;