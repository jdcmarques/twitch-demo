import React from 'react'
import './LoadingAnimation.css';

export const LoadingAnimation = React.memo(() => {
  return (
    <div className="loading">
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div> 
  )
})

export default LoadingAnimation
