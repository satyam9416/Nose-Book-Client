import React, { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { authenticate } from "../../actions/authAction"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { SocketState } from "../../context/socket"

const PrivateRoute = () => {
    const dispatch = useDispatch()
    const authData = useSelector((state) => state.authReducer.authData)
    const loading = useSelector((state) => state.authReducer.loading)
    const [loaded, setloaded] = useState(false)
    useEffect(() => {
        !authData && dispatch(authenticate())
        setloaded(prev => true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        loading || !loaded ? <h1>Loading...</h1> : authData ? <SocketState><Outlet /></SocketState> : <Navigate to='login' />)
}

export default PrivateRoute