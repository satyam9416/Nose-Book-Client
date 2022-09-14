import React, { useEffect, useRef, useState } from 'react'
import { createContext } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
const socketContext = createContext()

export const SocketState = ({ children }) => {

  const { _id } = useSelector((state) => state.authReducer.authData)
  const socket = useRef()

  useEffect(() => {
    // socket.current = io("http://localhost:5000/", { transports: ['websocket'] })
    socket.current = io("https://nose-book-server.herokuapp.com/", { transports: ['websocket'] })
    socket.current.emit('addUser', _id)
  }, [])

  return (
    <socketContext.Provider value={{ socket }}>{children}</socketContext.Provider>
  )
}

export default socketContext