import React from 'react'
import './Navbar.css'
import { Logo, Search, SettingsIcon } from "../../Utils/ImportsPresentation";

export const Navbar = React.memo((props) => {
  const searchProps = {
      query: props.query,
      handleSearchInput: props.handleSearchInput,
  }
  const settingsProps = {
    handleSettingsInput: props.handleSettingsInput,
    settingsDummy: props.settingsDummy,
    settingsShow: props.settingsShow,
    handleSettingsSave: props.handleSettingsSave,
    toggleSettingsShow: props.toggleSettingsShow,
  }
  return (
    <div className="navbar">
      <Logo returnHome={props.returnHome}></Logo>
      <Search {...searchProps}></Search>
      <SettingsIcon {...settingsProps}></SettingsIcon>
    </div>
  )
})

export default Navbar
