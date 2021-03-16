export const wishlistReducer = (state = [], action) => {
    switch(action.type){
        case 'DELETE_WISHLIST':
            return action.wishlist
        case "GET_WISHLISTS":
            return action.wishlist
            default:
                return state;
    }
        
}