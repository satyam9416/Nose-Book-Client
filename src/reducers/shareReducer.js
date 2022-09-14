export const shareReducer = (state = {data : null, loading : false, error : null}, action) => {
    switch (action.type) {
        case 'POST_SHARING':
            return {...state, loading : true}
        case 'POST_SHARED':
            return {...state, loading : false, data : action?.data}
        case 'POST_SHARE_FAILED':
            return {...state, loading : false, error : action.error}
        default:
            return state
    }
}