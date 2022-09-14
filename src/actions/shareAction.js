import API from "../API/API"

export const shareAction = (postData) => async (dispatch) => {
    dispatch({ type : 'POST_SHARING' })
    try {
        const {data} = await API.post('post/new', postData)
        dispatch({ type: 'POST_SHARED' , data})
    } catch (error) {
        dispatch({ type : 'POST_SHARE_FAILED' })
    }

}

export const uploadImageAction = (imageData) => async (dispatch) => {
    dispatch({ type : 'POST_SHARING' })
    try {
        const { data } = await API.post('upload/image', imageData)
        dispatch({ type: 'POST_SHARED' , data})
    } catch (error) {
        dispatch({ type : 'POST_SHARE_FAILED' })
    }

}