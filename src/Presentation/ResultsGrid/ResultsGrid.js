import React from 'react'
import { ResultsItem } from "../ResultsItem/ResultsItem";
import './ResultsGrid.css'

export const ResultsGrid = React.memo((props) => {
  console.log(props);
  return (
    <div>
      <div className="results">
        <span>{props.results.streams.length} results</span>
      </div>
      <div className="resultsGrid">
        {props.results.streams && props.results.streams.map((stream) => {
          return <ResultsItem key={stream._id} stream={stream} handleClickedStream={props.handleClickedStream}/>
        })}
      </div>
    </div>
  )
})

export default ResultsGrid
