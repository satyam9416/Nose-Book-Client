import { getDownloadURL, ref } from 'firebase/storage'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { getUser } from '../../actions/userAction'
import { storage } from '../../firebase-config'

const ChatListItem = ({ friendId, onClick}) => {
    const [userData, setUserData] = useState(null)
    const chatListProfileImgRef = useRef()

    useEffect(()=> {
        const setUser = async() => {
            const user = await getUser(friendId)
            setUserData(user)
        }
        setUser()
    }, [friendId])

    return (userData &&
      <div className='chat-list-item' onClick={onClick}>
            <img src={userData.profileImg} alt="" ref={chatListProfileImgRef} />
          <p>{userData.fName + ' ' + userData.lName}</p>
      </div>
  )
}

export default ChatListItem