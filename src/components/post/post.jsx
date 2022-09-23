import React from 'react'
import './post.css'
import { FaHeart, FaRegComment } from 'react-icons/fa'
import { RiSendPlaneLine } from 'react-icons/ri'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import API from '../../API/API'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import LazyImage from '../lazy-image/lazy-image'
import PostModal from '../post-modal/post-modal'
import { Modal } from 'antd'

const Post = ({ post }) => {
  const authData = useSelector((state) => state.authReducer.authData)
  const [liked, setLiked] = useState(post.likes.includes(authData._id))
  const [likes, setLikes] = useState(post.likes.length)
  const [isOpenPostModal, setIsOpenPostModal] = useState(false)

  const likePost = async (id) => {
    setLiked((prev) => !prev)
    await API.put(`post/like/${id}`, { userId: authData._id })
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }

  return (
    <div className='post'>
      <LazyImage image={post.image} className='post-img'/>
      <div className='post-content-box'>
        <span className='post-content'>{post.content}</span>
        <div className='rxn-btns' >
          {liked ? <AiFillHeart className='btn' fill='red' onClick={() => likePost(post._id)} /> : <AiOutlineHeart className='btn' onClick={() => likePost(post._id)} />}
          <FaRegComment className='btn' onClick={() => { setIsOpenPostModal(true) }}/>
          <RiSendPlaneLine className='btn' />
        </div>
        <h2 className='likes-counter'>{likes} Likes </h2>

        <PostModal isOpenPostModal={isOpenPostModal} setIsOpenPostModal={setIsOpenPostModal} post={post} />
      </div>
    </div>
  )
}

export default Post