import axios from "axios";



export const instance = axios.create({
    baseURL:'https://cheapestapp.herokuapp.com/api'
})

export const findToken = () => {
    let cookieVal;

if(document.cookie){
    cookieVal = document.cookie
  .split('; ')
  .find(row => row.startsWith('authToken='))
  .split('=')[1];
}else{
    cookieVal = '';
}
return cookieVal;
}