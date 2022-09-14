import { getDownloadURL, ref } from 'firebase/storage';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../API/API';
import { storage } from '../../firebase-config';
import './profile-card.css'

const ProfileCard = ({ location }) => {
    const [userData, setUserData] = useState({})
    const { _id } = useSelector((state) => state.authReducer.authData)
    const newShare = useSelector((state) => state.shareReducer.data)
    const { id } = useParams()
    const [posts, setPosts] = useState({})
    const navigate = useNavigate()
    const profileImgRef = useRef()
    const coverImgRef = useRef()

    useEffect(() => {
        const getImageUrl = async () => {
            profileImgRef.current.src = await getDownloadURL(ref(storage, 'images/' + userData.profileImg))
            coverImgRef.current.src = await getDownloadURL(ref(storage, 'images/' + userData.coverImg))
        }
        userData?.profileImg && getImageUrl()
    }, [userData?.profileImg, userData?.coverImg])

    useEffect(() => {
        const fetchUserData = async () => {
            const userID = location === 'profile' ? id : _id
            const { data } = await API.get(`user/${userID}`)
            setUserData(data)
        }
        const fetchUserPosts = async () => {
            const { data } = await API.get(`user/posts/${id}`)
            setPosts(data)
        }
        fetchUserData()
        fetchUserPosts()
    }, [location, id, _id, newShare])

    return (
        <div className='profile-box'>
            <div className='profile-images'>
                <img
                    src='/images/defaultProfile.jpg'
                    className='cover-img' alt='' ref={coverImgRef}/>
                <img
                    src='/images/defaultCover.jpg'
                    alt="" className='profile-img' ref={profileImgRef}/>
            </div>
            <form>
            </form>
            <div className='profile-name' onClick={() => navigate('/profile/'+ _id)}>
                <span><h1>{userData?.fName}</h1></span>
                <span>{userData?.status ? userData?.status : 'MERN Stack Developer'}</span>

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
        </div>
    )
};
export default ProfileCard;