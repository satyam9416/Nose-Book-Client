import React from 'react'
import Navbar from '../navbar/navbar';
import Trends from '../trends/trends';

const shareHandler = () => {
    const el = document.getElementById('new-post-share-input')
    el.focus()
    el.style.border = '2px solid black'
    el.addEventListener('focusout', () => {
        el.style.border = null
    })
}

const RightSide = () => {
    return(
    <div className='right-side'>
    <Navbar />
    <Trends />
    <button onClick={shareHandler} className='btn big-share-btn'>Share</button>
    </div>
    )
}
export default RightSide;