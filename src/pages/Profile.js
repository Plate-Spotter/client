import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Profile.css";
import NavBar from "../components/NavBar";
import { getUserById } from "../api/UsersApi";

function Profile() {
  const [userId, setUserId] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setUserId(localStorage.getItem('userId'));
      // console.log(localStorage.getItem('userId'));
    }
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId) {
          const userData = await getUserById(userId);
          setUser(userData);
        }
      } catch (error) {
        console.log("Issue is in fetchUser", error);
      }
    };

    fetchUser();
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
      <p>{user.username}'s profile page</p>
      <button>Start New Game</button>
    </div>
  );
}

export default Profile;
