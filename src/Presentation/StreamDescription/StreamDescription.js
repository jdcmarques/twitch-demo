import React from 'react'
import './StreamDescription.css'

// Stateless Presentation Component
// Component for Stream Description on Stream Showing Page -> Shows the information of the currently watched stream ->
// Also triggers showing / hiding chat frame

export const StreamDescription = React.memo((props) => {
  return (
    <div className="stream-description">
      <div className="stream-description__details">
        <img className="stream-description__logo" alt={props.streamer} src={props.logo}/>
        <div className="stream-description__information">
          <span className="stream-description__title">{props.name}</span>
          <span>{props.streamer} is playing {props.game}</span> 
          <span>{props.viewers} viewers</span>
        </div>
      </div>
      <div className="stream-description__chat-toggle" onClick={props.toggleChat}>
        <img className={`stream-description__chat-icon ${props.showChat ? '' : 'stream-description__chat-icon--rotate'}`} alt="Toggle Chat" src="assets/images/right-arrow.svg"/>
      </div>
    </div>
  )
})

export default StreamDescription
