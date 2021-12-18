import axios from 'axios'
const isLocal = window.location.host.match(/localhost/g)
export const apiInstance = axios.create({
    baseURL: isLocal ? '/' : 'https://webbanhangserver.herokuapp.com/api',
    headers: isLocal ?
        { "Content-Type": "application/json", "Access-Control-Allow-Origin": "https://webbanhangserver.herokuapp.com/api" }
        :
        { "Content-Type": "application/json" }
})

