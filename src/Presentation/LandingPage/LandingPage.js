import React from 'react'
import './LandingPage.css'

export const LandingPage = React.memo(() => {
  // Inline style background Image -> CRA doesn't append relative path to urls in css 
  const style = {
    backgroundImage: `url('${process.env.PUBLIC_URL}/assets/images/background_image.jpg')`,
  };

  return (
    <div style={style} className="landing-page">
    </div>
  )
})

export default LandingPage