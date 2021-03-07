import axios from "axios";

export const instance = axios.create({
    baseURL:'https://cheapestapp.herokuapp.com/api',
    headers:{
        'Access-Control-Allow-Origin':"*",
        'Access-Control-Allow-Headers':'*',
        'Content-Type': 'application/json'
    }
})