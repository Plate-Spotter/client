import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Profile.css";
import NavBar from "../components/NavBar";
import { getUserById, getGameSessionsById, getUser } from "../api/UsersApi";
import { Link } from "react-router-dom";

function Profile() {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [user, setUser] = useState(null);
  const [gameSessions, setGameSessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const [userData, userGameSessions] = await Promise.all([
            getUserById(userId),
            getGameSessionsById(userId)
          ]);
          setUser(userData);
          setGameSessions(userGameSessions)
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

  useEffect(() => {
    const fetchGameSessions = async() => {
      try {
        if (userId) {
          const userGameSessions = await getGameSessionsById(userId);
          setGameSessions(userGameSessions)
        }
      } catch (error) {
        console.log("Issue in fetchGameSessions", error)
      }
    };

    fetchGameSessions();
  }, [userId]);

  return user == null ? (
    <div></div>
  ) : (
    <div className="profile">
      <NavBar />
      <h2>Yo Bitch</h2>
      <p>{user.username}'s profile page</p>
      <Link to="/start"><button>Start New Game</button></Link>
    </div>
  );
}

export default Profile;
