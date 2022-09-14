import './chat-list.css'
import React from 'react'
import { useSelector } from 'react-redux'
import ChatListItem from '../chat-list-item/chat-list-item'

const ChatList = ({ setActiveChat }) => {
    const { _id } = useSelector((state) => state.authReducer.authData)
    const data = useSelector((state) => state.chatReducer.chats)
    return (
        <div>
            {data?.map((chat, i) =>
                <ChatListItem
                    key={chat._id}
                    friendId={chat.members.find(elem => elem !== _id)}
                    onClick={() => setActiveChat(chat._id)} />
            )}
        </div>
    )
}

export default ChatList