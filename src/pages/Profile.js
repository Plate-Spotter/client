import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Profile.css";
import NavBar from "../components/NavBar";
import { getUserById, getGameSessionsById, getUser } from "../api/UsersApi";
import { Link } from "react-router-dom";
import GameSession from "../components/GameSession";

function Profile() {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [user, setUser] = useState(null);
  const [gameSessions, setGameSessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const [userData, userGameSessions] = await Promise.all([
            getUserById(userId),
            getGameSessionsById(userId),
          ]);
          setUser(userData);
          setGameSessions(userGameSessions);
        } catch (error) {
          console.log("Issue fetching user or game sessions", error);
        }
      }
    };

    fetchData();
  }, [userId]);

  if (!user) {
    return <div>No User...?!</div>;
  }

  return user == null ? (
    <div></div>
  ) : (
    <div className="profile">
      <NavBar />
      <h2>Yo Bitch</h2>
      <h3>{user.username}'s profile page</h3>
      <Link to="/start">
        <button className="button">Start New Game</button>
      </Link>
      {
        gameSessions.map((session) => (
          <GameSession key={session.id} gameData={session} />
        ))
      }
    </div>
  );
}

export default Profile;
