import axios from 'axios'
axios.defaults.withCredentials = true

const API = axios.create({
    // baseURL: 'http://localhost:5000/'
    baseURL: 'https://nose-book-server.herokuapp.com/'
})

export default API;