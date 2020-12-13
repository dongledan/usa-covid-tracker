import React from 'react'
import { Link } from "react-router-dom"



export default function Navbar() {
  return (
    <div className="navbar-container">
    <nav className="navbar">
      <a href={'#'} className="navbar-logo">
        <div className="logo-top">Spread FACTS</div>
        <div className="logo-bot">Not COVID</div>
      </a>
      <div className="navbar-links">
      <a href={'#'} className="link">
          <div className="link-text">About</div>
        </a>
        <a href={'#'} className="link">
          <div className="link-text">Learn</div>
        </a>
      </div>
    </nav>
  </div>
  )
}
