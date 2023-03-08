import React, { useState } from 'react'
import './posts-box.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Post from '../post/post'
import { useParams } from 'react-router-dom'
import API from '../../API/API'
import Loading from '../../pages/loading'

const PostsBox = ({ location }) => {
  const { id } = useParams()
  const [posts, setPosts] = useState({})
  const [loading, setLoading] = useState(true)
  const { _id } = useSelector((state) => state.authReducer.authData)
  const newShare = useSelector((state) => state.shareReducer.data?._id)
  const postDeleted = useSelector((state) => state.deletePostReducer.success)

  useEffect(() => {
    const fetchTimelinePosts = async () => {
      const { data } = await API.get(`post/timeline/${_id}`)
      setPosts(data)
      setLoading(false)
    }

    const fetchUserPosts = async () => {
      const { data } = await API.get(`user/posts/${id}`)
      setPosts(data)
      setLoading(false)
    }

    location === 'profile' ? fetchUserPosts() : fetchTimelinePosts()

  }, [newShare, _id, id, location, postDeleted])

  return (
    loading ? <Loading /> : !posts?.length ? <h1 color='black'>No posts</h1> :
      <div className='posts-box'>
        {posts.map((post) => <Post post={post} key={post._id} />)}
      </div>
  )
}
export default PostsBox