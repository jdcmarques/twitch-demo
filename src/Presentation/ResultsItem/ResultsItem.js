import React from 'react'
import './ResultsItem.css'

export const ResultsItem = React.memo((props) => {
  console.log(props);
  const {stream} = props;
  return (
    <div className="streamCard">
      <img className="preview" alt={stream.channel.name} src={stream.preview.medium} data-name={stream.channel.name} onClick={props.handleClickedStream}></img>
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
