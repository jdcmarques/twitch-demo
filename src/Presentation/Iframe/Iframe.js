import React from 'react'
import './Iframe.css'

// Stateless Presentation Component
// Component for Embedded frames
export const Iframe = React.memo((props) => {
  return (
    <div className="iframe">
      <iframe
        title="Twitch stream"
        src={props.url}
        className="iframe__frame"
        frameBorder="0"
        scrolling="no"
        allowFullScreen={true}
        >
      </iframe>
    </div>
  )
})

export default Iframe
