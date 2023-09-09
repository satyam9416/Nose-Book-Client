import './post-modal.css'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import API from '../../API/API'
import LazyImage from '../lazy-image/lazy-image'
import { useNavigate } from 'react-router-dom'

const PostModal = ({ isOpenPostModal, post:prevpost, setIsOpenPostModal }) => {
    const [post, setPost] = useState(prevpost)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null);
    const [comment, setComment] = useState('');
    const [IsCommenting, setIsCommenting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            const { data } = await API.get(`user/${post.userId}`)
            setUserData(data)
            setLoading(false)
        }
        getUserData()
    }, [post])

    const handleNewComment = async e => {
        e.preventDefault();
        try {
            setIsCommenting(true)
            const {data} = await API.put(`post/comment/`+post._id, { comment })
            setComment('')
            setPost(data?.post)
            setIsCommenting(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        isOpenPostModal && !loading && <div className='modal-overlay'>
            <AiOutlineClose className='post-modal-close-btn' onClick={() => setIsOpenPostModal(false)} />
            <div className='post-modal'>
                <div className='post-modal-media-container' >
                    {post.image && <img className='post-modal-media' src={post.image} alt="" />}
                </div>
                <div className='post-modal-comments-wrapper'>
                    <div className='post-user-info' onClick={() => navigate(`/profile/${userData?._id}`)}>
                        <LazyImage className='post-user-profile-img' image={userData?.profileImg} aspectRatio={[1, 1]} altSrc='/images/defaultProfile.jpg' />
                        <div className='post-user-name-wrapper'>
                            <span style={{ fontSize: '2.5rem' }}>{userData?.fName}</span>
                            <span>{userData?.userName}</span>
                        </div>
                    </div>
                    <ul className='post-modal-comment-section'>
                        {post.comments.map((comment, i) => {
                            return <li key={comment.text+i}>{comment.text}</li>
                        })}
                    </ul>
                    <form className='comment-input-wrapper' onSubmit={handleNewComment}>
                        <input type="text" placeholder='Add a comment...' value={comment} onChange={e=>setComment(e.target.value)}/>
                        <button type='submit' disabled={comment === '' || IsCommenting}>{IsCommenting ? 'posting...' : 'post'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostModal