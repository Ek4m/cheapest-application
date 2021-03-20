import React, { useState } from 'react'
import { findToken, instance } from '../../axios'
import RegSpinner from '../RegisterSpinner/RegSpinner';
import * as wishlistActions from '../../redux/actions/wishlist';
import './Product.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Product = (props) => {

    const [loading, setLoading] = useState(false);

    const onAddToWishlist = (e,id) => {
        e.preventDefault()
       if(!loading){
        setLoading(true)
        instance.get(`/products/product/${id}`,{
            headers:{
                'X-Auth-Token':findToken()
            }
        })
        .then(response => {
          if(response.data.food){
            props.addToWishlist(response.data.food);
                          alert('Product added')

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
                       <img src={props.image} alt="iclereu"/>
                    </div>
                        <div className="Card--Container">
                          <h1>{props.title}</h1>
                          <p>{props.description}</p>
                          <span>$ {props.price}</span>
                          <div className="Card--Nav">
                            <div className="Card--Link">
                            <Link to="/">View more</Link>
                            </div>
                            <div className="Card--Link">
                            <a 
                            onClick={(e) => onAddToWishlist(e, props.id)}
                            href="#">{!loading ? "+Wishlist" : "Loading..."}</a>
                            </div>
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