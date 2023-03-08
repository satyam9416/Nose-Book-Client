import React from 'react'
import './trends.css'

const Trends = () => {
  const trends = [
    '#tempTrend',
    '#tempTrend',
    '#tempTrend',
    '#tempTrend',
    '#tempTrend'
  ]

  
  return (
    <div className='trends-box'>
        <h3>Suggestions for You</h3>



    </div>
  )
}

export default Trends
// {/* <h1 style={{ fontSize: '2.5rem', color: 'orange', fontWeight: '900'}}>Trends for you</h1>
// {trends.map((item, id) => (
//   <div className='trend' key={id}>
//       <h2 style={{fontSize : '2rem', lineHeight: '0.8', fontWeight: '700'}}>{item}</h2>
//       {/* <h4 style={{ fontSize: '1.5rem', fontWeight : 'normal'}}>{item.shares} Shares</h4> */}
//   </div>
// ))} */}