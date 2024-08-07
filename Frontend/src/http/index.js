import axios from 'axios'


const API = axios.create({
    baseURL : "http://192.168.18.8:3003/api-v2",
    headers : {
        'Content-Type' : 'application/json',
        Accept : 'application/json',
        
    }
})

const APIAuthenticated = axios.create({
    baseURL : "http://192.168.18.8:3003/api-v2",
    headers : {
        'Content-Type' : 'application/json',
        Accept : 'application/json',
        'Authorization' : `${localStorage.getItem('token')}`
        
    }
})



export  {API,APIAuthenticated}