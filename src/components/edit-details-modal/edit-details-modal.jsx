import { async } from '@firebase/util';
import { Modal, useMantineTheme } from '@mantine/core';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImageAction } from '../../actions/shareAction';
import { updateDataAction } from '../../actions/updateDataAction';
import { storage } from '../../firebase-config';
import './edit-details-modal.css'

function EditModal(props) {
    const dispatch = useDispatch()
    const theme = useMantineTheme();
    const { _id } = useSelector((state) => state.authReducer.authData)
    const saving = useSelector((state) => state.updateDataReducer.loading)
    const [data, setData] = useState({ currentUserId: _id })
    const [images, setImages] = useState([])

    const submitHandler = async (e) => {
        e.preventDefault()
        images.map(async (img) => {
            const storageRef = ref(storage, 'images/' + img.name)
            await uploadBytesResumable(storageRef, img)
        })
        dispatch(updateDataAction(_id, data))
        window.location.reload()
    }

    const changeHandler = (e) => {
        if (e.target.name === 'profileImg' || 'coverImg') {
            if (e.target.files && e.target.files[0]) {
                const tempImage = new File([e.target.files[0]], Date.now() + e.target.files[0].name)
                setImages(prev => [...prev, tempImage])
                setData((prev) => ({ ...prev, [e.target.name]: tempImage.name }))
            }
        } else {
            setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
    }

    return (
        <Modal className='edit-modal' size={750}
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={props.editable}
            onClose={() => { props.setEditable(false); setImages(null); setData({ currentUserId: _id }) }}
        >
            <form className='edit-info' onSubmit={submitHandler}>
                <h1>Edit your info</h1>
                <div>
                    <input onChange={changeHandler} name='fName' type="text" placeholder='Enter your First Name' />
                    <input onChange={changeHandler} name='lName' type="text" placeholder='Enter your Last Name' />
                </div>
                <input onChange={changeHandler} name='userName' type="email" placeholder='Enter your Email' />
                <div>
                    <input onChange={changeHandler} name='phone' type="number" placeholder='Phone' />
                    <input onChange={changeHandler} name='DOB' type="date" placeholder='Date of Birth' />
                </div>
                <input onChange={changeHandler} name='location' type="text" placeholder='Enter your Address' />
                <div>
                    <input onChange={changeHandler} name='relationshipStatus' type="text" placeholder='Realtionship status' />
                    <input onChange={changeHandler} name='worksAt' type="text" placeholder='Works at ?' />
                </div>
                <div>
                    <input onChange={changeHandler} name='profileImg' type="file" placeholder='Profile Image' />
                    <input onChange={changeHandler} name='coverImg' type="file" placeholder='Cover Image' />
                </div>
                <button type='submit' className='btn save-info-btn'>{saving ? 'Saving...' : 'Save'}</button>
            </form>
        </Modal>
    );
}
export default EditModal;