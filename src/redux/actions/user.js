import {instance} from "../../axios";

export const loginUser = (body) => {
    return dispatch => {
      dispatch({user:body, type:'LOGIN'})
    }
}