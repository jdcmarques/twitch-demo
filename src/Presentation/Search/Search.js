import React from 'react'
import './Search.css'

export const Search = React.memo((props) => {
  return (
    <div className="search">
        <input
        value={props.query}
        placeholder="Search for..."
        onChange={props.handleSearchInput}
        />
    </div>
  )
})

export default Search
