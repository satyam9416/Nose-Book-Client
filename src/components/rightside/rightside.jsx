import React from 'react'
import Navbar from '../navbar/navbar';
import Trends from '../trends/trends';


const RightSide = () => {
    return(
    <div className='right-side'>
    <Navbar />
    <Trends />
    <button className='btn big-share-btn'>Share</button>
    </div>
    )
}
export default RightSide;