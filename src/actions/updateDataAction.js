import API from "../API/API"

export const updateDataAction = (id, userData) => async (dispatch) => {
    dispatch({ type: 'UPDATE_USER_REQ_SENT' })
    try {
        const { data } = await API.put(`user/${id}`, userData)
        // window.location.reload()
        dispatch({ type: 'USERDATA_UPDATED_SUCCESFUL', data })
    } catch (error) {
        dispatch({ type: 'USERDATA_UPDATE_FAIL' })
    }
}