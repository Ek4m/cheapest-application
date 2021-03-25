import React from 'react'
import Product from '../Product'
import './ProductList.css';

const ProductList = (props) => {
    let content;
    if(props.products.length > 0){
        content = props.products.map(product => <Product
            title={product.name}
            image={product.img}
            description={product.description}
            key={product._id + Math.random()*100}
            price={product.price}
            id={product._id}
            />
        )
    }else{
        content = <h1>No Product:(</h1>
    }
   
  
    return (
        <div className="ProductList">
            {content}
        </div>
    )
}

export default ProductList
