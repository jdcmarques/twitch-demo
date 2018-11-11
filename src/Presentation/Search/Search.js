import React from 'react'
import './Search.css'

// Stateless Presentation Component
// Component for search bar Input -> passing initial value and calling handler from props

export const Search = React.memo((props) => {
  return (
    <div className="search-bar">
        <input
        className="search-bar__input"
        value={props.query}
        placeholder="Search for..."
        onChange={props.handleSearchInput}
        />
    </div>
  )
})

export default Search
