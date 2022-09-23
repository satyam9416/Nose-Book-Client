import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatBox from '../components/chat-box/chat-box'
import ChatList from '../components/chat-list/chat-list'
import Navbar from '../components/navbar/navbar'
import './chat.css'
import { fetchChats } from '../actions/chatAction'

const Chat = () => {
    const [activeChat, setActiveChat] = useState('')
    const dispatch = useDispatch()
    const { _id } = useSelector((state) => state.authReducer.authData)

    useEffect(() => {
        dispatch(fetchChats(_id))
        // eslint-disable-next-line
    }, [_id])

    return (
        <div className='chat'>
            <Navbar />
            <div className='chats-container'>
                <ChatList setActiveChat={setActiveChat} />
                {activeChat ?
                    <ChatBox className='chat-box' activeChat={activeChat} /> :
                    <div className='no-chat-container' style={{ backgroundColor: 'rgb(253, 236, 188)' }}>
                        <span className='no-chat-text'>Click on a Chat to start a conversation</span>
                    </div>}
            </div>
        </div>
    )
}

export default Chat