import './post-modal.css'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../firebase-config'
import API from '../../API/API'
import LazyImage from '../lazy-image/lazy-image'
import { useNavigate } from 'react-router-dom'

const PostModal = ({ isOpenPostModal, post, setIsOpenPostModal }) => {
    const [src, setSrc] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const getPostUrl = async () => {
            const url = await getDownloadURL(ref(storage, '/images/' + post.image))
            setSrc(url)
            setLoading(false)
        }
        const getUserData = async () => {
            const { data } = await API.get(`user/${post.userId}`)
            setUserData(data)
        }
        getPostUrl()
        getUserData()
    }, [post])

    return (
        isOpenPostModal && !loading && <div className='modal-overlay'>
            <AiOutlineClose className='post-modal-close-btn' onClick={() => setIsOpenPostModal(false)} />
            <div className='post-modal'>
                <div className='post-modal-media-container' >
                    {src && <img className='post-modal-media' src={src} alt="" />}
                </div>
                <div className='post-modal-comments-wrapper'>
                    <div className='post-user-info' onClick={() => navigate(`/profile/${userData?._id}`)}>
                        <LazyImage className='post-user-profile-img' image={userData?.profileImg} aspectRatio={[1, 1]} altSrc='/images/defaultProfile.jpg' />
                        <div className='post-user-name-wrapper'>
                            <span style={{ fontSize: '2.5rem' }}>{userData?.fName}</span>
                            <span>{userData?.userName}</span>
                        </div>
                    </div>
                    <div className='post-modal-comment-section'>

                    </div>
                    <div className='comment-input-wrapper'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostModal