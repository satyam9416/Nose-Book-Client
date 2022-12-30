import React, { useRef, useState } from 'react'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { MdAddLocationAlt } from 'react-icons/md'
import { AiFillSchedule } from 'react-icons/ai'
import { IoIosSend } from 'react-icons/io'
import { AiOutlineClose } from 'react-icons/ai'
import './new-post.css'
import { useDispatch, useSelector } from 'react-redux'
import { shareAction, uploadImageAction } from '../../actions/shareAction'
import { useNavigate } from 'react-router-dom'
import LazyImage from '../lazy-image/lazy-image'

const NewPost = () => {
    const authData = useSelector((state) => state.authReducer.authData)
    const sharing = useSelector((state) => state.shareReducer.loading)
    const imgrefs = useRef()
    const dispatch = useDispatch()
    const [image, setImage] = useState(false)
    const content = useRef()
    const navigate = useNavigate()

    const changeImageHandler = (event) => {
        if (event.target.files && event.target.files[0]) {
            const tempImage = event.target.files[0]
            setImage(tempImage)
            console.log(tempImage)
        }
        imgrefs.current.value = ''
    }
    const shareHandler = async() => {

        console.log('new-share !')
        const newpost = {
            userId: authData._id,
            content: content.current.value
        }

        if (image) {
            const date = Date.now()
            let imageData = new FormData()
            const fileName = date + image.name;
            imageData.append('filename', fileName)
            imageData.append('file', image)
            newpost.image = fileName
            dispatch(await uploadImageAction(imageData, image, fileName))
            setImage(null)
        }

        dispatch(shareAction(newpost))
    }

    return (
        <div className='new-post'>
            <LazyImage image={authData.profileImg} className='new-post-profile-img' altSrc='/images/defaultProfile.jpg' onClick={() => { navigate('/profile/' + authData._id) }} aspectRatio={[1,1]}/>
            <div className='new-share'>
                <input type="text" name="new-post" placeholder="What's happening ?" ref={content} />
                <div className='share-options'>
                    <button onClick={() => imgrefs.current.click()} className='btn photo-btn'><MdAddPhotoAlternate />Photo</button>
                    <button className='btn video-btn'><BsFillCameraVideoFill />Video</button>
                    <button className='btn location-btn'><MdAddLocationAlt /> Location</button>
                    <button className='btn schedule-btn'><AiFillSchedule /> Schedule</button>
                    <button className='btn post-btn' onClick={shareHandler} disabled={!image}><IoIosSend />{sharing ? 'Sharing...' : 'Share'}</button>
                </div>
                <input style={{ display: 'none' }} onChange={changeImageHandler} type="file" name="myImage" ref={imgrefs} />
                {image && (
                    <div className='image-preview'>
                        <AiOutlineClose className='btn' onClick={() => { setImage(null) }} />
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default NewPost