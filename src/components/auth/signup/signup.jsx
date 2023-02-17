import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { authenticate, signUp } from '../../../actions/authAction'
import '../auth.css'

const SignUp = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.authReducer.loading)
    const authData = useSelector((state) => state.authReducer.authData)
    const [validation, setValidation] = useState('')
    const [userData, setuserData] = useState({ fName: '', lName: '', userName: '', passwd: '', confirmpass: '' })

    useEffect(() => {
        dispatch(authenticate())
    }, [dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        if (userData.passwd !== userData.confirmpass) {
            setValidation("*Password doesn't match")
            return;
        }
        dispatch(signUp(userData))
        setValidation("")
        setuserData({ fName: '', lName: '', userName: '', passwd: '', confirmpass: '' })
    }

    const changeHandler = (e) => {
        setuserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        loading ? <h1>Loading...</h1> : authData ? <Navigate to='/' /> :
            <div className='auth'>
                <h1>NoseBook</h1>
                <form className='signup-form' onSubmit={submitHandler}>
                    <h1>Sign Up</h1>
                    <div>
                        <input type="text" name='fName' placeholder='First Name' onChange={changeHandler} required value={userData.fName} />
                        <input type="text" name='lName' placeholder='Last Name' onChange={changeHandler} value={userData.lName} required />
                    </div>
                    <input type="text" placeholder='User Name' name='userName' onChange={changeHandler} value={userData.userName} required />
                    <div>
                        <input type="password" placeholder='password' name='passwd' onChange={changeHandler} value={userData.passwd} required />
                        <input type="password" name='confirmpass' placeholder='Confirm Password' onChange={changeHandler} value={userData.confirmpass} required />
                    </div>
                    <span style={{ 'fontSize': '2rem', 'display': 'block', alignSelf: 'flex-end', marginRight: '1rem', color: 'red' }}>{validation}</span>
                    <div>
                        <Link className='login-text' to="/login">Already have an account. login here</Link>
                        <button type='submit' className='btn signup-btn'>{loading ? 'loading...' : 'Login'}</button>
                    </div>
                </form>
            </div>
    )
}


export default SignUp