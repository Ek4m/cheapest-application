import { store } from '../store';


export const deleteWishlist = (id) => {
  return dispatch => {
    let wishlist = store.getState().wishlist;
    console.log(wishlist)
    let postWishlist = wishlist.filter(wish => wish.product._id !== id);
    dispatch({type:"DELETE_WISHLIST", wishlist:postWishlist})
  }
}

export const addToWishList = (product) => {
  return dispatch => {
    let wishlist = [...store.getState().wishlist];
    let exists = wishlist.find(prod => prod.product._id === product._id);
    if(!exists){
      wishlist = [...wishlist, {
        product:product,
        count:1
      }]
    }else{
      let index = wishlist.findIndex(prod => prod.product._id === product._id);
      wishlist[index].count++;
    }
    dispatch({type:"ADD_TO_WISHLIST", wishlist:wishlist})
  } 
}