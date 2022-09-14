export const authReducer = (state = { authData: null, loading: false, error: null}, action) => {
    switch (action.type) {
        case 'AUTH_START':
            return { ...state, loading : true}
        case 'AUTH_SUCCESS':
            return { ...state, loading: false, authData: action?.data }
        case 'AUTH_FAIL':
            return { ...state, error: action.error, loading: false }
        case 'LOG_OUT':
            return { ...state, authData: null }
        default:
            return state;
    }
}