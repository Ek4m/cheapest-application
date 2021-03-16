import React from 'react'
import Product from '../Product'
import './ProductList.css';

const ProductList = (props) => {

    let content;
    if(props.products.length > 0){
        content = props.products.map(product => <Product
            title={product.name}
            url={product.url}
            restaurantName={product.restaurant}
            description={product.description}
            key={product._id}
            price={product.price}
            id={product._id}
            />
        )
    }
   
  
    return (
        <div className="ProductList">
            {content}
        </div>
    )
}

export default ProductList
