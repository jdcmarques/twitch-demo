import React from 'react'
import './ResultsItem.css'

export const ResultsItem = React.memo((props) => {
  const {stream} = props;
  return (
    <div className="stream-card">
      <img className="stream-card__preview" alt={stream.channel.name} src={stream.preview.medium} data-id={stream.channel._id} onClick={(evt) => props.handleClickedStream(stream, evt)}></img>
      <div className="stream-card__details">
        <img className="stream-card__logo" alt={stream.channel.name} src={stream.channel.logo}/>
        <div className="stream-card__information">
          <span className="stream-card__text">{stream.channel.status}</span>
          <span className="stream-card__text">{stream.channel.name} </span>
          <span className="stream-card__text">{stream.viewers} viewers</span>
        </div>
      </div>
    </div>
  )
})

export default ResultsItem
