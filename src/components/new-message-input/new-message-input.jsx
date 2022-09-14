import './new-message-input.css'
import React from 'react'
import { IoMdSend } from 'react-icons/io'
import { MdEmojiEmotions } from 'react-icons/md'
import { AiTwotoneLike } from 'react-icons/ai'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useContext } from 'react'
import socketContext from '../../context/socket'
import { sendMessage } from '../../actions/chatAction'

const NewMessageInput = ({ userId, setMessages }) => {
    const [newMsgInput, setNewMsgInput] = useState('')
    const { _id } = useSelector((state) => state.authReducer.authData)
    const { socket } = useContext(socketContext)

    const handleSendMessage = async () => {
        const newMsg = { senderId: _id, recieverId: userId, msg: newMsgInput }
        sendMessage(newMsg)
        socket.current.emit('msgSent', newMsg)
        setMessages(prev => [...prev, newMsg])
        setNewMsgInput('')
    }

    const handleSendLike = async () => {
        const newMsg = { senderId: _id, recieverId: userId, msg: '👍' }
        sendMessage(newMsg)
        setNewMsgInput('')
        setMessages(prev => [...prev, newMsg])
        socket.current.emit('msgSent', newMsg)
    }

    return (
        <div className='new-message-box'>
            <div className='send-emoji-msg-icon'><MdEmojiEmotions /></div>
            <input className='new-message-input' type="text" placeholder='Enter New Message' onChange={(e) => setNewMsgInput(e.target.value)} value={newMsgInput} autoFocus />
            <div className='send-new-msg-icon'>{newMsgInput ? <IoMdSend onClick={handleSendMessage} /> : <AiTwotoneLike onClick={handleSendLike} />}</div>
        </div>
    )
}

export default NewMessageInput