import React, { useEffect, useRef } from 'react'
import { createContext } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
const socketContext = createContext()

export const SocketState = ({ children }) => {

  const { _id } = useSelector((state) => state.authReducer.authData)
  const socket = useRef()

  useEffect(() => {
    const url = import.meta.env.VITE_SERVER_URL
    socket.current = io(url, { transports: ['websocket'] })
    socket.current.emit('addUser', _id)
  }, [_id])

  return (
    <socketContext.Provider value={{ socket }}>{children}</socketContext.Provider>
  )
}

export default socketContext