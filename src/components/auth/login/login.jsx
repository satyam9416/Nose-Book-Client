import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate, logIn } from '../../../actions/authAction'
import '../auth.css'

const Login = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.authReducer.loading)
    const authError = useSelector((state) => state.authReducer.error)
    const authData = useSelector((state) => state.authReducer.authData)
    
    const [userData, setUserData] = useState({ "userName": "", "passwd": "" })
    
    useEffect(() => {
        dispatch(authenticate())
    }, [dispatch])

    const changehandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === "username") {
            setUserData((prev) => ({ ...prev, "userName": value }))
        } else if (name === "passwd") {
            setUserData((prev) => ({ ...prev, "passwd": value }))
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setUserData({ "userName": "", "passwd": "" })
        dispatch(logIn(userData))
    }
    
    return (
        loading ? <h1>Loading...</h1> : authData ? <Navigate to='/home' /> : 
         <div className='auth'>
            <h1>NoseBook</h1>
            <form onSubmit={submitHandler} className='login-form'>
                <h1>Login</h1>
                <p style={{color:'red'}}>{authError?.response?.data?.message}</p>
                <input type="text" placeholder='User Name' name='username' onChange={changehandler} value={userData.userName} required autoFocus />
                <input type="password" placeholder='Password' name='passwd' onChange={changehandler} value={userData.passwd} required />
                <div>
                    <Link className='signup-text' to="/signup">Don't have an account. Sign up here</Link>
                    <button type='submit' className='btn login-btn'>{loading ? 'loading...' : 'Login'}</button>
                </div>
            </form>
        </div>
    )
}

export default Login