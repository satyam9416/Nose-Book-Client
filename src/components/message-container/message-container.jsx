import './message-container.css'
import React from 'react'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'
import { useRef } from 'react'
import { useEffect } from 'react'

const MessageContainer = ({ messages }) => {
    const { _id } = useSelector((state) => state.authReducer.authData)
    const scrollRef = useRef()

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className='message-container'>
            {
                messages?.map((el, i) =>
                    <div className={`msg-box ${el.senderId === _id ? 'right' : 'left'}`} key={i} ref={scrollRef}>
                        <p className='msg-text'>{el.msg}</p>
                        <p className='msg-time'>{format(el.sentAt)}</p>
                    </div>)
            }
        </div>
    )
}

export default MessageContainer