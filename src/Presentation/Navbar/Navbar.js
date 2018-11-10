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
    settingsNumber: props.settingsNumber,
  }
  return (
    <div className="navbar">
      <Logo></Logo>
      <Search {...searchProps}></Search>
      <Settings {...settingsProps}></Settings>
    </div>
  )
})

export default Navbar
