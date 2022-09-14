import API from "../API/API"

export const getTimelinePostsAction = (id) => async(dispatch)  => {
    dispatch({type : 'GETTING_TIMELINE_POSTS'})
    try {
        const { data } = await API.get(`post/timeline/${id}`)
        dispatch({type : 'TIMELINE_POSTS_SUCCESSFUL', data})
    } catch (error) {
        dispatch({type : 'TIMELINE_POSTS_FAIL'})
    }
}