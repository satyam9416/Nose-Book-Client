import React, { useState } from 'react'
import { useEffect } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { logOut } from '../../actions/authAction'
import API from '../../API/API'
import EditModal from '../edit-details-modal/edit-details-modal'
import './info-card.css'

const Infocard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const [editable, setEditable] = useState(false)
    const [userData, setUserData] = useState({})
    const { _id} = useSelector((state) => state.authReducer.authData) 

    useEffect(() => {
        const fetchUserData = async () => {
            const { data } = await API.get(`user/${id}`)
            setUserData(data)
        }
        fetchUserData()
    }, [id])

    const logOutHandler = () => {
        dispatch(logOut()).then(() => { navigate('/login') })
    }

    const btnStyle = {
        display : id === _id ? 'initial' : 'none'
    }
    return (
            <div className='info-card'>
            <h1>{id === _id ? 'Your' : userData?.fName} Info</h1>
                <ul className='info-list'>
                    {userData?.phone && <li>Phone : {userData.phone}</li>}
                    {userData?.userName && <li>Email : {userData.userName}</li>}
                    {userData?.DOB && <li>Date : {userData.DOB}</li>}
                    {userData?.relationshipStatus && <li>Relationship Status : {userData.relationshipStatus}</li>}
                    {userData?.worksAt && <li>Works At : {userData.worksAt}</li>}
                </ul>
            <button style={btnStyle} onClick={logOutHandler} className='btn logout-btn'>Log Out</button>
            <button style={btnStyle} onClick={() => { setEditable(true) }} className='btn edit-btn'><FaRegEdit /></button>
            <EditModal editable={editable} setEditable={setEditable}></EditModal>
            </div>
    )
}

export default Infocard