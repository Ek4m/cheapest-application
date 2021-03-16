import React, { useState } from 'react'
import { findToken, instance } from '../../axios'
import RegSpinner from '../RegisterSpinner/RegSpinner';
import * as wishlistActions from '../../redux/actions/wishlist';
import './Product.css'
import { connect } from 'react-redux';

const Product = (props) => {
    const [loading, setLoading] = useState(false);
    const onAddToWishlist = (e,id) => {
        e.stopPropagation()
       if(!loading){
        setLoading(true)
        instance.get(`/products/${id}`,{
            headers:{
                'X-Auth-Token':findToken()
            }
        })
        .then(response => {
          if(response.data.food){
            console.log(response.data.food);
            props.addToWishlist(response.data.food)
          }else{
              alert('Product not found')
          }
          setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            alert('Error occured.try again')
            console.log(err.message)
        })
       }
    }

    return (
        <div className="Card">
                    <div className="Card--Image">
                        <img src="https://i.insider.com/5d0bc2a0e3ecba03841d82d2?width=960&format=jpeg" alt="Image Here!" />
                    </div>
                        <div className="Card--Container">
                            <h4 className="meal-heading">{props.title}</h4>
                                <h5 className="meal-price">${props.price}</h5>
                            <p className="card-text">{props.description}</p>
                            <p className="card-restaurant">By: {props.restaurantName}</p>
                        <div className="Card--Container__Nav">
                        <a href={props.url} target="_blank">View more</a>
                        <div 
                        style={{opacity: loading ? 0.5 : 1}}
                        href="#" className="Card-wishlist"
                        onClick={(e) => onAddToWishlist(e, props.id)}
                        > {loading ? "Loading..." : "+ Wishlist"}</div>
                        </div>
                        </div>
                        
                </div>
                
    )
}


const mapStateToProps = (state) => {
    return {
        wishlist:state.wishlist
    }
    }
    
    const mapDispatchToProps = (dispatch) => {
        return {
            addToWishlist:(product) => dispatch(wishlistActions.addToWishList(product))
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(Product)