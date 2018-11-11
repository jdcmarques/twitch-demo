import React from 'react'
import { Iframe, StreamDescription } from "../../Utils/ImportsPresentation";
import './StreamPage.css'

// Stateless Presentation Component
// Component for Stream Page -> Holds the Stream Video Frame and Description  (and?) Chat Frame

export const StreamPage = React.memo((props) => {
  const {showChat, streamInfo, videoUrl, chatUrl, streamDescriptionProps} = props;
  return (
    <div className="stream-page">
        <div className={`stream-page__stream ${showChat? '': 'stream-page__stream--hidden'}`}>
          <div className="stream-page__stream-frame">
            <Iframe url={videoUrl}></Iframe>
          </div>
          <StreamDescription {...streamDescriptionProps}></StreamDescription>
        </div>
        <div className={`stream-page__chat ${showChat? '': 'stream-page__chat--hidden'}`}>
          {showChat && 
          <Iframe url={chatUrl} channel={streamInfo.streamer}></Iframe>
            }
        </div>
    </div>
  )
})

export default StreamPage
