import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Profile.css";
import NavBar from "../components/NavBar";
import { getUserById, getUsersGameSessions, getUser } from "../api/UsersApi";
import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";

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
            getUsersGameSessions(userId),
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
      <h2>Welcome back, friend</h2>
      <h3>{user.username}'s profile page</h3>
      <Link to="/start" state={{ userId: userId }}>
        <button className="start-button">Start New Game</button>
      </Link>
      <div className="game-sessions-container">
        {gameSessions.map((session) => (
          <GameCard key={session.id} gameData={session} />
        ))}
      </div>
    </div>
  );
}

export default Profile;