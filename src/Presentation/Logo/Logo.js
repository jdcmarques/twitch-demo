import React from 'react'
import './Logo.css'

// Stateless Presentation Component
// Component for the App Logo - Name

export const Logo = React.memo((props) => {
  return (
    <div className="navbar-logo" onClick={props.returnHome}>
      <img className="navbar-logo__icon "alt="Logo" src="assets/images/twitch_white.svg"></img>
      <span>Twitch Viewer</span>
    </div>
  )
})

export default Logo
