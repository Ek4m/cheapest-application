import axios from 'axios';
import React, { useEffect, useState } from 'react';
import WishListComponent from '../../components/WishListComponent/WishListComponent';
import * as wishlistActions from '../../redux/actions/wishlist';
import withAuth from '../../hoc/withAuth';
import './WishList.css';
import { connect } from 'react-redux';
const WishList = (props) => {
    const [products, setProducts] = useState([]);
    const [fetchError, setFetchError] = useState("");
useEffect(() => {
    document.title = 'Your wishlist'
},[])
    let content;
    if(props.wishlist.length > 0){
        content = props.wishlist.map(product => (
            <WishListComponent key={product.id} 
            id={product.id}
            clicked={props.deleteWishlist}
            name={product.title}
            imageUrl={product.url}
            />
        ))
    }
    console.log(products)
    return (
        <div className="WishList">
            <div className="WishList--Header">
                <h1>Your Wishlist</h1>
            </div>
            <div className="WishList--Container">
                {content}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
      user:state.user,
      wishlist:state.wishlist
  }
  }
  
  const mapDispatchToProps = (dispatch) => {
      return {
          deleteWishlist:(id) => dispatch(wishlistActions.deleteWishlist(id))
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withAuth(WishList))