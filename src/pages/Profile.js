import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const location = useLocation();
  const userId = location.state.userId;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`https://03f6ed0f-78cd-482b-ac54-e1ad190432be.mock.pstmn.io/users/${userId}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .then(data => {
          setUser(data);
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    }
  }, [userId]);

  return (
    user == null ? (
      <div></div>
    ) : (
      <div className="profile">
        <h2>Yo Bitch</h2>
        <p>{user.username}'s profile page</p>
        <button>Start New Game</button>
      </div>
    )
  );
}

export default Profile;
