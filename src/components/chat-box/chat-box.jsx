import './chat-box.css'
import React, { useContext, useEffect, useState } from 'react'
import ChatHeader from '../chat-header/chat-header'
import MessageContainer from '../message-container/message-container'
import NewMessageInput from '../new-message-input/new-message-input'
import { useSelector } from 'react-redux'
import socketContext from '../../context/socket'


const ChatBox = ({ activeChat }) => {
  const data = useSelector((state) => state.chatReducer.chats)
  const { _id } = useSelector((state) => state.authReducer.authData)
  const [messages, setMessages] = useState(null)
  const { socket } = useContext(socketContext)

  useEffect(() => {
    setMessages(() => {
      const chat = data.filter((c) => c._id === activeChat)
      return chat[0].messages
    })
  }, [activeChat])

  useEffect(() => {
    socket.current.on('recieveMsg', newMsg => {
      console.log(newMsg)
      setMessages(prev => [...prev, newMsg])
    })
  }, [])

  return (
    <div className='chat-box'>
      <ChatHeader userId={data[0].members.find(elem => elem !== _id)} />
      <MessageContainer messages={messages} />
      <NewMessageInput userId={data[0].members.find(elem => elem !== _id)} setMessages={setMessages} />
    </div>
  )
}

export default ChatBox