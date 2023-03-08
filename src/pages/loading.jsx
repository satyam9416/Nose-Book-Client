import React from 'react'
import './loading.css'


const Loading = ({page}) => {
  return (
      <div className='loader-layout' style={{ 'height': page ? '100dvh' : '100%'}}>
        <div className="loader"></div>
        <h3>Loading ... please be patient !</h3>
    </div>
  )
}

export default Loading