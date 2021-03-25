import React, { Fragment, useEffect, useState } from 'react'
import * as wishlistActions from '../../redux/actions/wishlist'
import { instance } from '../../axios';
import RegSpinner from '../../components/RegisterSpinner/RegSpinner'
import withAuth from '../../hoc/withAuth';
import './ProductPage.css'
import { connect } from 'react-redux';
import {toast} from 'react-toastify'
import { withRouter } from 'react-router';

let success = () => toast.success('Added to wishlist',{
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })

const ProductPage = (props) => {

    const onClickHandler = () => {
        if(product){
            props.addToWishlist(product);
            success();
        }
    }

    const [product, setProduct] = useState(null);
    useEffect(() => {
        console.log('aee')
        const id = props.match.params.id;
        console.log(props)
        instance.get('/products/product/' + id)
        .then(response => {
            if(response.data.food){
                console.log(response.data.food)
                document.title = response.data.food.name
                setProduct(response.data.food);
            }else{
                props.history.push('/');
            }
                })
        .catch(err => {
         props.history.push('/');
        })
    },[])
let content = <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
    <h1>Loading...</h1>
    <RegSpinner />
</div>
if(product){
    content = <Fragment>
	<img src={product.img} alt={product.name} />
	<h3>{product.name}</h3>
	<p className="ProductPage--price">The price of 1 portion: <br/>{product.price} ₼</p>
	<p>{product.description}</p>
    <button 
    onClick={onClickHandler}
    className="ProductPage--wishlist">+Wishlist</button>
</Fragment>
}
    return (
        <div className="ProductPage">
            {content}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        wishlist:state.wishlist,
        user:state.wishlist
    }
    }
    
    const mapDispatchToProps = (dispatch) => {
        return {
            addToWishlist:(product) => dispatch(wishlistActions.addToWishList(product))
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(withAuth(ProductPage))
