import React from 'react'
import './Settings.css'
export const Settings = React.memo((props) => {
  return (
    <div>
      {props.settingsShow && 
        <div className='popup'>
        <div className='popup_inner'>
          <span>Number of streams to search</span>
          <input type="number" min="1" max = "100" value={props.settingsDummy} onChange={props.handleSettingsInput}></input>
          <div className="controls">
            <button onClick={props.handleSettingsSave} data-type="cancel">Cancel</button>
            <button onClick={props.handleSettingsSave} data-type="save">Save</button>
          </div>
        </div>
      </div>
      }
    </div>
  )
})

export default Settings
