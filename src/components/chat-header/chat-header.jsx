import './chat-header.css'
import React, { useRef } from 'react'
import { useEffect } from 'react'
import { getUser } from '../../actions/userAction'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../firebase-config'

const ChatHeader = ({ userId }) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const chatProfileImgRef = useRef()

  useEffect(() => {
    const setUser = async () => {
      const data = await getUser(userId)
      setUserData(data)
    }
    setUser()
  }, [userId])
  
  return (userData &&
    <div className='chat-header' onClick={() => navigate('/profile/' + userId)}>
      <img className='chat-header-img' src={userData.profileImg} alt=""/>
      <p className='chat-header-profile-name'>{ userData.fName + ' ' + userData.lName }</p>
    </div>
  )
}

export default ChatHeader