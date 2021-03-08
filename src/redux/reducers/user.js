export const userReducer = (state = false, action) => {
    switch(action.type){
        case "LOGIN":
            return action.user
        default:
                return state 
    }

}  