import React, { useEffect, useState } from 'react';
import WishListComponent from '../../components/WishListComponent/WishListComponent';
import * as wishlistActions from '../../redux/actions/wishlist';
import withAuth from '../../hoc/withAuth';
import './WishList.css';
import { connect } from 'react-redux';
import { findToken, instance } from '../../axios';
const WishList = (props) => {
    useEffect(() => {
        document.title = 'Your wishlist'
    },[])

    const orderHandler = () => {
        if(props.wishlist.length > 0){
            let totalPrice = 0;
            props.wishlist.forEach(prod => {
                totalPrice += prod.count * +prod.product.price
                    })
                    let myOrder  = {total_amount:totalPrice}
                    myOrder._food = props.wishlist.map(prod => (
                        {
                            foodType:prod.product._id,
                            count:prod.count
                        }
                    ))
                   let tkn = findToken();
                    instance.post('/order', myOrder, {
                        headers:{
                            'X-Auth-Token': tkn
                        }
                    })
                    .then(response => {
                        alert('Order delivered successfully');
                      props.clearWishlist();
                      props.history.push('/');
                    })
                    .catch(err => {
                        console.log(err);
                        alert('Error occured. Try again:(')
                    })
        }else{
            alert('Add something to wishlist')
        }
    }

    let content;
    if(props.wishlist.length > 0){
        content = props.wishlist.map(product => (
            <WishListComponent key={product.product._id} 
            id={product.product._id}
            clicked={props.deleteWishlist}
            name={product.product.name}
            imageUrl={product.product.img}
            price={product.product.price}
            portion={product.portion}
            />
        ))
    }else{
        content = <h1>Empty :D</h1>
    }
    let wishListFooter = false;
    let totalPrice = 0;
    if(props.wishlist.length > 0){
        props.wishlist.forEach(prod => {
            totalPrice += prod.count * +prod.product.price
                })
        wishListFooter = true;
    }
    console.log(totalPrice);
    return (
        <div className="WishList">
            <div className="WishList--Header">
                <h1>Your Wishlist</h1>
            </div>
            <div className="WishList--Container">
                {content}
            </div>
{wishListFooter && <footer className="Wishlist--Footer">
                        <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button
            onClick={orderHandler}
            >Order now!</button>
        </footer>}
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
          deleteWishlist:(id) => dispatch(wishlistActions.deleteWishlist(id)),
          clearWishlist:() => dispatch({type:'CLEAR_WISHLIST'})
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withAuth(WishList))