import axios from 'axios'
axios.defaults.withCredentials = true

const API = axios.create({
    baseURL: process.env.REACT_APP_PRODUCTION ? process.env.REACT_APP_SERVER_URL : 'http://localhost:5000/'
})

export default API;