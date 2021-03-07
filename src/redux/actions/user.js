import {instance} from "../../axios";

export const loginUser = (body) => {
    return dispatch => {
        instance.post('/auth/login',{
           headers:{
            'Content-Type': 'application/json'
           }
        },body)
        .then(token => {
            console.log('AAAA')
            document.cookie = token.token;
        dispatch({
            user:true,
            code:'LOGIN'
        })
        }).catch(err => {
            console.log(err);
        })
    }
}