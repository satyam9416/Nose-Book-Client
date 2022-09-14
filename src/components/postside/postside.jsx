import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import NewPost from '../new-post/new-post';
import PostsBox from '../posts-box/posts-box';
import ProfileCard from '../profile-card/profile-card';
import './postside.css'

const PostSide = ({location}) => {
    const {id} = useParams()
    const { _id } = useSelector((state) => state.authReducer.authData)
    
    return (
        <div className='postside'>
            {location === 'profile' && <ProfileCard location={location}/>}
            {location !== 'profile' ? <NewPost /> : id === _id && <NewPost />}
            <PostsBox location={location}/>
        </div>
    )
}
export default PostSide;