import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import API from "../API/API"
import { storage } from "../firebase-config"

export const shareAction = (postData, image) => async (dispatch) => {
    dispatch({ type : 'POST_SHARING' });
    try {
        if(image) {
            const fileName = Date.now() + image.name;
            const storageRef = ref(storage, 'images/' + fileName);
            const snapshot = await uploadBytesResumable(storageRef, image);
            const imageLink = await getDownloadURL(snapshot.ref);
            postData.image = imageLink;
        }
        const { data } = await API.post('post/new', postData)
        dispatch({ type: 'POST_SHARED' , data})
    } catch (error) {
        dispatch({ type : 'POST_SHARE_FAILED' })
    }
}