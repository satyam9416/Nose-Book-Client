import API from './../API/API'

export const fetchChats = (userId) => async(dispatch) => {
    dispatch({ type: 'FETCHING_CHATS' })
    try {
        const { data } = await API.get('chats/' + userId)
        dispatch({ type: 'CHATS_FETCHED_SUCCESS', chats: data })
    } catch (error) {
        dispatch({ type: 'CHATS_FETCHING_FAILED', error: error })
    }
}

export const sendMessage = async (msgData) => {
    try {
        await API.post('chats/send', msgData)
    } catch (error) {
        return error
    }
} 