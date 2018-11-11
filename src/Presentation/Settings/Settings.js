import React from 'react'
import './Settings.css'
export const Settings = React.memo((props) => {
  return (
    <div>
      {props.settingsShow && 
        <div className='settings_popup'>
          <div className='settings-popup__content'>
            <span className="settings-popup__title">Number of streams to search (1-100)</span>
            <input className="settings-popup__input" type="number" min="1" max = "100" value={props.settingsDummy} onChange={props.handleSettingsInput}></input>
            <div className="settings-popup__controls">
              <button className="settings-popup__button" onClick={props.handleSettingsSave} data-type="cancel">Cancel</button>
              <button className="settings-popup__button" onClick={props.handleSettingsSave} data-type="save">Save</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
})

export default Settings
