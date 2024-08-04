import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

function NavBar() {
  const handleLogout = () => {
    localStorage.clear()
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Welcome</Link>
        </li>
        <li>
          <Link to="/profile">My Profile</Link>
        </li>
        <li>
          <Link to="/" onClick={ handleLogout }>Logout</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;