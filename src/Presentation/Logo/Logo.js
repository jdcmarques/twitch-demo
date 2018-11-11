import React from 'react'
import './Logo.css'

export const Logo = React.memo((props) => {
  return (
    <div className="logo" onClick={props.returnHome}>
      <img alt="Logo" src="assets/images/twitch_white.svg"></img>
      <span>Twitch Viewer</span>
    </div>
  )
})

export default Logo
