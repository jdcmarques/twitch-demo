import React from 'react'
import './Iframe.css'
export const Iframe = React.memo((props) => {
  return (
    <div className="resp-container">
      <iframe
        title="Twitch stream"
        src={props.url}
        className="resp-iframe"
        frameBorder="0"
        scrolling="no"
        allowFullScreen={true}
        >
      </iframe>
    </div>
  )
})

export default Iframe
