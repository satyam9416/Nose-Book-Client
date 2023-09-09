import React, { useRef } from 'react';
import './post.css';
import { FaRegComment } from 'react-icons/fa';
import { RiSendPlaneLine } from 'react-icons/ri';
import { AiOutlineHeart, AiFillHeart, AiOutlineMenu } from 'react-icons/ai';
import API from '../../API/API';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LazyImage from '../lazy-image/lazy-image';
import PostModal from '../post-modal/post-modal';
import { deletePost } from '../../actions/deletePostAction';

const Post = ({ post }) => {
  const authData = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(post.likes.includes(authData._id));
  const [likes, setLikes] = useState(post.likes.length);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpenPostModal, setIsOpenPostModal] = useState(false);
  const dispatch = useDispatch();
  const postDescRef = useRef()

  const likePost = async (id) => {
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
    await API.put(`post/like/${id}`, { userId: authData._id });
  }

  const editPost = () => {
    postDescRef.target.isEditable = true
  }

  const handleDeletePost = async () => {
    setIsDeleting(true)
    dispatch(deletePost(post._id));
  };

  return (
    <div className='post'>

      <div className='post-header-bar'>
        <div className='post-header-user-data'></div>

        <div className='post-action-menu' tabIndex={1}>
        
          <span tabIndex={1} className='menu-trigger'>
            <AiOutlineMenu />
          </span>

          <ul className='post-menu-options'>
            <li className='Editbtn'>Edit</li>
            <li className='deletebtn' onClick={handleDeletePost}>{isDeleting ? 'Deleting...' : 'Delete Post'}</li>
          </ul>
        </div>
      </div>

      <LazyImage image={post?.image} className='post-img' />

      <div className='post-content-box'>
        <span className='post-content' ref={postDescRef}>{post.content}</span>
        <div className='rxn-btns' >
          <span onClick={() => likePost(post._id)} >
            {liked ? <AiFillHeart className='btn' fill='red' /> : <AiOutlineHeart className='btn' />}
          </span>
          <FaRegComment className='btn' onClick={() => { setIsOpenPostModal(true) }} />
          <RiSendPlaneLine className='btn' />
        </div>
        <h2 className='likes-counter'>{likes} Likes </h2>

        <PostModal isOpenPostModal={isOpenPostModal} setIsOpenPostModal={setIsOpenPostModal} post={post} />
      </div>
    </div>
  )
}

export default Post