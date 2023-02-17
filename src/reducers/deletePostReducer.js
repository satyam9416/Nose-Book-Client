export const deletePostReducer = (state = { id: null, success: null, loading: false, error: null }, action) => {
    switch (action.type) {
        case 'DELETING':
            return { ...state, loading: true, success: null }
        case 'DELETE_SUCCESS':
            return { ...state, loading: false, success: true}
        case 'DELETE_FAIL':
            return { ...state, error: action.error, loading: false }
        default:
            return state;
    }
}