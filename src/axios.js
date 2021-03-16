import axios from "axios";


const findToken = () => {
    let cookieVal = '';

if(document.cookie.length > 0){
   let cookiem = document.cookie
  .split('; ')
  .find(row => row.startsWith('authToken='));
  if(cookiem){
      cookieVal = cookiem.split('=')[1];
  }
}
return cookieVal;
}

const instance = axios.create({
    baseURL:'https://cheapestapp.herokuapp.com/api'
})

export { instance, findToken };