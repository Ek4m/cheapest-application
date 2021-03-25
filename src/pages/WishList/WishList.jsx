import React, { useEffect, useState } from 'react';
import WishListComponent from '../../components/WishListComponent/WishListComponent';
import * as wishlistActions from '../../redux/actions/wishlist';
import withAuth from '../../hoc/withAuth';
import './WishList.css';
import { connect } from 'react-redux';
import { findToken, instance } from '../../axios';
import {toast} from 'react-toastify'

let success = () => toast.success('Order delivered succesfully',{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })

let error = (err) => toast.error(err.message || 'Error occured', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

const WishList = (props) => {

    const [ isPressed, setPressed ] = useState('Order now!');

    useEffect(() => {
        document.title = 'Your wishlist'
    },[])

    const orderHandler = () => {
       if(isPressed == 'Order now!'){
           setPressed('Loading...')
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
                        success();
                      props.clearWishlist();
                      props.history.push('/');
                    })
                    .catch(err => {
                        setPressed('Order now!')
                       error(err);
                    })
        }else{
            error();
        }
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
            portion={product.count}
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
            >{isPressed}</button>
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