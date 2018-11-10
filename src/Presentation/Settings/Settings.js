import React from 'react'
import './Settings.css'
export const Settings = React.memo((props) => {
  return (
    <div>
      {props.settingsShow && 
        <div className='popup'>
        <div className='popup_inner'>
          <input type="number" min="1" max = "100" value={props.settingsDummy} onChange={props.handleSettingsInput}></input>
        <button onClick={props.handleSettingsSave}>close me</button>
        </div>
      </div>
      }
    </div>
  )
})

export default Settings
