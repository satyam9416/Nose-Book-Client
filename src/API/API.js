import axios from 'axios'

let accessToken = null;
let baseURL = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true

const API = axios.create({ baseURL })

API.interceptors.request.use(async req => {

    if (!accessToken) return req;

    req.headers.authorization = 'Bearer ' + accessToken;

    return req;
})

API.interceptors.response.use(async res => {


    if (res.config.url.startsWith('auth/')){
        accessToken = res.data.accessToken
    }
    return res;
}, async err => {

    const { config, response} = err;
    if (response.data?.message !== 'Token expired') return Promise.reject(err);

    const { data } = await axios.get(baseURL + '/auth/refresh')
    accessToken = data.accessToken;
    config.headers.authorization = 'Bearer ' + accessToken;
    return axios(config);

})



export default API;