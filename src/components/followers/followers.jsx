import React from 'react';
import FollowerCard from '../follower-card/follower-card'
import './followers.css'
import { useSelector } from 'react-redux';

const Follower = () => {
    const authData = useSelector((state) => state.authReducer.authData)
    return (
        <div className='followers-box'>
                {authData.followers?.map(((id) => {
                return (
                <FollowerCard id={id} key={id} />
            )}))}
        </div>
    )
};
export default Follower;