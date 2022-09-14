export const chatReducer = (state = { chats: null, loading: false, error: null }, action) => {
    switch (action.type) {
        case 'FETCHING_CHATS':
            return { ...state, loading: true }
        case 'CHATS_FETCHED_SUCCESS':
            return { ...state, loading: false, chats: action?.chats }
        case 'CHATS_FETCHING_FAILED':
            return { ...state, error: action.error, loading: false }
        default:
            return state;
    }
}