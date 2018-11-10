import React from 'react'
import { Iframe, StreamDescription } from "../../Utils/ImportsPresentation";
import './StreamPage.css'

export const StreamPage = React.memo((props) => {
  const {showChat, streamInfo, videoUrl, chatUrl, streamDescriptionProps} = props;
  return (
    <div className="streamPage_container">
        <div className={`stream_container ${showChat? '': 'hidden'}`}>
          <div className="stream_frame">
            <Iframe url={videoUrl}></Iframe>
          </div>
          <StreamDescription {...streamDescriptionProps}></StreamDescription>
        </div>
        <div className={`stream_chat ${showChat? '': 'hidden'}`}>
          {showChat && 
          <Iframe url={chatUrl} channel={streamInfo.streamer}></Iframe>
            }
        </div>
      </div>
  )
})

export default StreamPage
