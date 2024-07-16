import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Welcome</Link>
        </li>
        <li>
          <Link to="/profile">My Profile</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;