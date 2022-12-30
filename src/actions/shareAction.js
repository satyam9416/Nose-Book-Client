import { ref, uploadBytes } from "firebase/storage"
import API from "../API/API"
import { storage } from "../firebase-config"

export const shareAction = (postData) => async (dispatch) => {
    // dispatch({ type : 'POST_SHARING' })
    try {
        const {data} = await API.post('post/new', postData)
        dispatch({ type: 'POST_SHARED' , data})
    } catch (error) {
        dispatch({ type : 'POST_SHARE_FAILED' })
    }

}

export const uploadImageAction = async (imageData, image, fileName) => async (dispatch) => {
    dispatch({ type : 'POST_SHARING' })
    try {
        const storageRef = ref(storage, 'images/' + fileName);
        await uploadBytes(storageRef, image)
        const { data } = await API.post('upload/image', imageData)
        dispatch({ type: 'POST_SHARED' , data})
    } catch (error) {
        dispatch({ type : 'POST_SHARE_FAILED' })
    }

}