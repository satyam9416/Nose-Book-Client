import axios from 'axios'
import jwtDecode from 'jwt-decode'

let accessToken = null;
let baseURL = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true


const API = axios.create({ baseURL })

API.interceptors.request.use(async req => {

    if (accessToken) {
        const tokenData = await jwtDecode(accessToken)

        if (tokenData.exp < Date.now()) {
            const { data } = await axios.get(baseURL + '/auth/refresh')
            accessToken = data.accessToken;
        }

        req.headers.authorization = 'Bearer ' + accessToken;
        return req;
    }

    return req;
})

API.interceptors.response.use(async res => {

    if (res.config.url.startsWith('auth/')){
        accessToken = res.data.accessToken
    }

    return res;
})



export default API;