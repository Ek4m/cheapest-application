import React from 'react'
import { withRouter } from 'react-router'
import './WishListComponent.css'
const WishListComponent = (props) => {
   const onRedirect = () => {
    if(props.id){
        props.history.push(`/products/${props.id}`);
    }else{
        console.log('yoxdu')
    }
}
    return (
        <div className="WishListComponent">
        <img src={props.imageUrl} alt={props.name}/>
        <div className="WishListComponent--Container">
        <h3>{props.name}</h3>
        <h3>${props.price}</h3>
        <h3>{props.portion} portions</h3>
        <div className="WishListComponent--Nav">
        <button onClick={(e) => props.clicked(props.id)}>Remove</button>
        <button onClick={onRedirect}>Details</button>
        </div>
        </div>
        </div>
    )
}

export default withRouter(WishListComponent);
