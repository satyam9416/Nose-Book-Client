import React from 'react'
// import data from '../../data/data'
import './trends.css'

const Trends = () => {
  return (
    <div className='trends-box'>
          <h1 style={{ fontSize: '2.5rem', color: 'orange'}}>Trends for you</h1>
          {/* {data.trends.map((item, id) => (
            <div className='trend' key={id}>
                <h2 style={{fontSize : '2rem', lineHeight: '0.8', fontWeight: 'bolder'}}>{item.name}</h2>
                <h4 style={{ fontSize: '1.5rem', fontWeight : 'normal'}}>{item.shares} Shares</h4>
            </div>
          ))} */}
    </div>
  )
}

export default Trends