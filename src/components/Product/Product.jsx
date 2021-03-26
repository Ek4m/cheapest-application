import React, { useState } from 'react'
import { findToken, instance } from '../../axios'
import * as wishlistActions from '../../redux/actions/wishlist';
import './Product.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'

let success = () => toast.success('Added to wishlist',{
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })

let error = (err) => toast.error(err.message || 'Something went wrong!!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

    let warning = () => toast.warn('Product not found', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

const Product = (props) => {
    const [loading, setLoading] = useState(false);
    const onAddToWishlist = (e,id) => {
        e.preventDefault();
       if(!loading){
        setLoading(true)
        instance.get(`/products/product/${id}`,{
            headers:{
                'X-Auth-Token': findToken()
            }
        })
        .then(response => {
          if(response.data.food){
            success();
            props.addToWishlist(response.data.food);
          }else{
            warning();
        }
          setLoading(false);
        })
        .catch(err => {
            error(err);
            setLoading(false);
        })
       }
    }

    return (
        <div className="ProductCard">
                    <div className="ProductCard--Image">
                       <img src={props.image} alt={props.name}/>
                    </div>
                        <div className="ProductCard--Container">
                          <h1>{props.title}</h1>
                          <p>{props.description}</p>
                          <span>&#8380; {props.price}</span>
                          <div className="ProductCard--Nav">
                            <div className="ProductCard--Link">
                            <Link to={`/products/${props.id}`}>View more</Link>
                            </div>
                            <div className="ProductCard--Link">
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