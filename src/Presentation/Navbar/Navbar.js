import React from 'react'
import './Navbar.css'
import { Logo, Search, Settings } from "../../Utils/ImportsPresentation";

export const Navbar = React.memo((props) => {
  const searchProps = {
      query: props.query,
      handleSearchInput: props.handleSearchInput,
  }
  const settingsProps = {
    handleSettingsInput: props.handleSettingsInput,
    settingsDummy: props.settingsDummy,
    settingsShow: props.settingsShow,
    handleSettingsSave: props.handleSettingsSave
  }
  return (
    <div className="navbar">
      <Logo></Logo>
      <Search {...searchProps}></Search>
      <img className="settings-icon" onClick={props.toggleSettingsShow} alt="Toggle settings" src="assets/images/controls.svg"/>
      <Settings {...settingsProps}></Settings>
    </div>
  )
})

export default Navbar
