import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { IoMdSettings } from 'react-icons/io'
import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import { RiMessage3Fill } from 'react-icons/ri'
import {NavLink, useNavigate} from 'react-router-dom'
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../actions/authAction'

const Navbar = () => {
  const {_id} = useSelector((state) => state.authReducer.authData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logOutHandler = () => {
    dispatch(logOut()).then(() => { navigate('/login') })
  }
  return (
    <div className='navbar'>
      <NavLink to='/home'><AiFillHome className='nav-btn btn' /></NavLink>
      <NavLink to={`/profile/${_id}`}><FaUser className='nav-btn btn' /></NavLink>
      <NavLink to={`/Chat/${_id}`}><RiMessage3Fill className='nav-btn btn' /></NavLink>
      <NavLink to='/' onClick={logOutHandler}><FaSignOutAlt className='nav-btn btn' /></NavLink>
    </div>
  )
}

export default Navbar