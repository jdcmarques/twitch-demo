import React from 'react'
import { ResultsItem } from "../ResultsItem/ResultsItem";
import './ResultsGrid.css'

export const ResultsGrid = React.memo((props) => {
  return (
    <div className="results-grid">
      <div className="results-grid__results">
        <span>{props.results.streams ? props.results.streams.length : 0} results</span>
      </div>
      <div className="results-grid__grid">
        {props.results.streams && props.results.streams.map((stream) => {
          return <ResultsItem key={stream._id} stream={stream} handleClickedStream={props.handleClickedStream}/>
        })}
      </div>
    </div>
  )
})

export default ResultsGrid
