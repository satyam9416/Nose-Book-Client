import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../API/API';
import LazyImage from '../lazy-image/lazy-image';
import './profile-card.css'

const ProfileCard = ({ location }) => {
    const [userData, setUserData] = useState({})
    const { _id } = useSelector((state) => state.authReducer.authData)
    const newShare = useSelector((state) => state.shareReducer.data)
    const { id } = useParams()
    const [posts, setPosts] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const userId = location === 'profile' ? id : _id
        const fetchUserData = async () => {
            const { data } = await API.get(`user/${userId}`)
            setUserData(data)
        }
        const fetchUserPosts = async () => {
            const { data } = await API.get(`user/posts/${userId}`)
            setPosts(data)
        }
        fetchUserData()
        fetchUserPosts()
    }, [location, id, _id, newShare])

    return userData._id ? <div className='profile-box'>
            <div className='profile-images'>
                <LazyImage image={userData.coverImg || null} className='cover-img' altSrc='/images/defaultCover.jpg' onClick={() => { navigate('/profile/' + userData._id) }} aspectRatio={[1, 1]} loading={userData.fName === undefined} />

               <LazyImage image={userData.profileImg || null} className='profile-img' altSrc='/images/defaultProfile.jpg' onClick={() => { navigate('/profile/' + userData._id) }} aspectRatio={[1, 1]} loading={userData.fName === undefined} />
            </div>
            <div className='profile-name' onClick={() => navigate('/profile/' + userData._id)}>
                <span><h1>{userData?.fName}</h1></span>
                <span>{userData?.status || ''}</span>

            </div>
            <div className='hr' style={{ width: "90%" }} />
            <div className='follow-status'>
                <div className='followers'>
                    <span>{userData?.followers?.length}</span>
                    <span>Followers</span>
                </div>
                <div className='vl' style={{ height: "85%" }} />
                <div className='following'>
                    <span>{userData?.followings?.length}</span>
                    <span>Following</span>
                </div>
                {location === 'profile' &&
                    <>
                        <div className='vl' style={{ height: "85%" }} />
                        <div className='posts-count'>
                            <span>{posts?.length}</span>
                            <span>{posts?.length < 2 ? 'Post' : 'Posts'}</span>
                        </div>
                    </>
                }
            </div>
            <div className='hr' style={{ width: "90%" }} />
        </div> : null
};
export default ProfileCard;