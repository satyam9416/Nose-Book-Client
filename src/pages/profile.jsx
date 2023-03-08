import React from "react"
import '../app.css'
import LeftSide from '../components/leftside/leftside'
import RightSide from '../components/rightside/rightside'
import PostSide from '../components/postside/postside'

const Profile = () => (
    <div className='app'>
        <LeftSide location='profile' />
        <PostSide location='profile' />
        <RightSide />
    </div>
)

export default Profile