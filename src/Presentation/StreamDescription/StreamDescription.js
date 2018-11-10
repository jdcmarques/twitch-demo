import React from 'react'
import './StreamDescription.css'

export const StreamDescription = React.memo((props) => {
  return (
    <div className="description_container">
      <div className="info">
        <img className="logo" alt={props.streamer} src={props.logo}/>
        <div className="information">
          <span>{props.name}</span>
          <span>{props.streamer} is playing {props.game}</span> 
          <span>{props.viewers} viewers</span>
        </div>
      </div>
      <div className="chatToggle" onClick={props.toggleChat}>
        <img className={props.showChat? '': 'rotate'}alt="Toggle Chat" src="assets/images/right-arrow.svg"/>
      </div>
    </div>
  )
})

export default StreamDescription
