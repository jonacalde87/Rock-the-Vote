import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props){
  const { logout, token } = props
  return (
    <div className="navbar">

      {/* conditional view: wrap the navbar in a condition so it wont be visible until user logs in */}
      { token && <Link to="/profile">Profile</Link>}

      { token && <Link to="/public">Public</Link>}

      { token && <button onClick={logout}>Logout</button>}
    </div>
  )
}