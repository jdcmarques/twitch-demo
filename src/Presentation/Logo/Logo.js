import React from 'react'
import './Logo.css'

export const Logo = React.memo(() => {
  return (
    <div className="logo">
      <img alt="Logo" src="assets/images/twitch_white.svg"></img>
      <span>Twitch Viewer</span>
    </div>
  )
})

export default Logo
