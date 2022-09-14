export const updateDataReducer = (state = { authData: null, loading : false, error: null }, action) => {
    switch (action.type) {
        case 'UPDATE_USER_REQ_SENT':
            return { ...state, loading: true }
        case 'USERDATA_UPDATED_SUCCESFUL':
            return { ...state, loading: false, authData: action?.data }
        case 'USERDATA_UPDATE_FAIL':
            return { ...state, error: action.error, loading: false }
        default:
            return state;
    }
}