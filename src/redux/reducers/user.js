export const userReducer = (state = false, action) => {
    switch(action.code){
        case "LOGIN":
            return action.user
        default:
                return state 
    }

}  