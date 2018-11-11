import React from 'react'
import { Settings } from "../../Utils/ImportsPresentation";
import './SettingsIcon.css'

export const SettingsIcon = React.memo((props) => {
  return (
    <div className="settings-icon">
      <img className="settings-icon__icon" onClick={props.toggleSettingsShow} alt="Toggle settings" src="assets/images/controls.svg"/>
      <Settings {...props}></Settings>
    </div>
  )
})

export default SettingsIcon
