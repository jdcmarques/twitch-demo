import React from 'react'
import './ResultsItem.css'

export const ResultsItem = React.memo((props) => {
  const {stream} = props;
  return (
    <div className="streamCard">
      <img className="preview" alt={stream.channel.name} src={stream.preview.medium} data-id={stream.channel._id} onClick={(evt) => props.handleClickedStream(stream, evt)}></img>
      <div className="info">
        <img className="logo" alt={stream.channel.name} src={stream.channel.logo}/>
        <div className="information">
          <span>{stream.channel.status}</span>
          <span>{stream.channel.name} </span>
          <span>{stream.viewers} viewers</span>
        </div>
      </div>
    </div>
  )
})

export default ResultsItem
