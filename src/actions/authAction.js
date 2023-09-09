import API from "../API/API";

export const logIn = (formdata) => async(dispatch) => {
    dispatch({type : 'AUTH_START'})
    try {
        const { data } = await API.post('auth/login', formdata )
        
        dispatch({type : 'AUTH_SUCCESS', data: data})
    } catch (error) {
        // console.log(error)
        dispatch({type : 'AUTH_FAIL', error: error})
    }
}

export const signUp = (formdata) => async(dispatch) => {
    dispatch({type : 'AUTH_START'})
    try {
        const { data } = await API.post('auth/register', formdata)
        dispatch({type : 'AUTH_SUCCESS', data: data})
    } catch (error) {
        // console.log(error)
        dispatch({type : 'AUTH_FAIL', error: error})
    }
}
 
export const logOut = () => async (dispatch) => {
    try {
        await API.post('auth/logout', {},
            {
                withCredentials: true,
            })
        dispatch ({ type: 'LOG_OUT' })
    } catch (error) {
        dispatch({ type: 'AUTH_FAIL', error: error })
    }
}

export const authenticate = () => async (dispatch) => {
    dispatch({ type: 'AUTH_START' })
    try {
        let { data } = await API.get('auth/authenticate')
        dispatch({ type: 'AUTH_SUCCESS', data: data })
    } catch (error) {
        // console.log(error)
        dispatch({ type: 'AUTH_FAIL', error: error })
    }
}

