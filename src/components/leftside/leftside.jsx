import React from 'react'
import SearchBar from '../search-bar/search-bar'
import Profile from '../profile-card/profile-card'
import Followers from '../followers/followers'
import Infocard from '../info-card/info-card'

const LeftSide = ({location}) => {
    return (
        <div className='left-side'>
            <SearchBar />
            {location === 'homepage' && <Profile />}
            {location === 'profile' && <Infocard />}
            <div style={{ width: '100%', padding: '0 1rem', fontSize: '2rem' }}><span>Who is following you</span></div>
            <Followers />
        </div> 
    )
}
export default LeftSide;