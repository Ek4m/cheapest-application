export const wishlistReducer = (state = [], action) => {
    switch(action.type){
        case 'DELETE_WISHLIST':
            return action.wishlist
        case "GET_WISHLISTS":
            return action.wishlist
        case "ADD_TO_WISHLIST":
            return action.wishlist
            default:
                return state;
    }
        
}