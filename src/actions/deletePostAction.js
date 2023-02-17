import API from "../API/API";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase-config";

export const deletePost = (id) => async (dispatch) => {
    dispatch({ type: 'DELETING' })
    try {
        const { data } = await API.get(`post/${id}`)
        if (data.image) {
            // Create a reference to the file to delete
            const imageRef = ref(storage, data.image);

            // Delete the file
            await deleteObject(imageRef);
        }
        await API.delete('post/' + id)
        dispatch({ type: 'DELETE_SUCCESS' })
    } catch (error) {
        dispatch({ type: 'DELETE_FAIL', error: error })
    }
}