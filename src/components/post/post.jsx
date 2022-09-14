import React from 'react'
import './post.css'
import { FaDownload, FaHeart, FaRegComment } from 'react-icons/fa'
import { RiSendPlaneLine } from 'react-icons/ri'
import { AiOutlineHeart } from 'react-icons/ai'
import API from '../../API/API'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../firebase-config'
import { useRef } from 'react'
import { useEffect } from 'react'

const Post = ({ post }) => {
  const authData = useSelector((state) => state.authReducer.authData)
  const [liked, setLiked] = useState(post.likes.includes(authData._id))
  const [likes, setLikes] = useState(post.likes.length)
  const postImgRef = useRef()
  useEffect(() => {
    const getImageUrl = async () => {
      postImgRef.current.src = await getDownloadURL(ref(storage, 'images/' + post.image))
    }
    getImageUrl()
  }, [post.image])

  const likePost = async (id) => {
    setLiked((prev) => !prev)
    await API.put(`post/like/${id}`, { userId: authData._id })
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }

  return (
    <div className='post'>
      <div className='post-img-container'>
      <img src='' className='post-img' alt='' ref={postImgRef} />
    </div>
      <div className='post-content-box'>
        <span className='post-content'>{post.content}</span>
        <div className='rxn-btns' onClick={() => likePost(post._id)}>
          {liked ? <FaHeart className='btn' /> : <AiOutlineHeart className='btn' />}
          <FaRegComment className='btn' />
          <RiSendPlaneLine className='btn' />
        </div>
        <h2 className='likes-counter'>{likes} Likes </h2>
        {/* <div className='comment'>
                <span style={{ display: 'inline-block' }}>
                  {post.comments[0].userName} :
                </span>
                <span>
                  {post.comments[0].comment}
                </span>
              </div>
            <a href="!#" className='more-comments-btn'>{(post.comments.length) - 1} more comments</a> */}
      </div>
    </div>
  )
}

export default Post