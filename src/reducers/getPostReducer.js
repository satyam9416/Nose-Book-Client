export const getTimelinePostReducer = (state = {loading : false, posts : null, error : null}, action) => {
    switch (action.type) {
        case 'GETTING_TIMELINE_POSTS':
            return {...state, loading : true }
        case 'TIMELINE_POSTS_SUCCESSFUL':
            return {...state, loading : false, posts : action?.data }
        case 'TIMELINE_POSTS_FAIL':
            return {...state, loading : false, error : action.error }
        default:
            return state
    }
}