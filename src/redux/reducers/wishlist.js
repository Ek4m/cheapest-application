export const wishlistReducer = (state = [], action) => {
    switch(action.type){
            case "ADD_TO_WISHLIST":
                return action.wishlist
            case "DELETE_WISHLIST":
                return action.wishlist
            case "CLEAR_WISHLIST":
                return []
            default:
                return state;
    } 
}