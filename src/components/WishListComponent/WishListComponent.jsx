import React from 'react'
import './WishListComponent.css'
const WishListComponent = (props) => {
    return (
        <div className="WishListComponent">
        <img src={props.imageUrl} alt={props.name}/>
        <div className="WishListComponent--Container">
        <h3>{props.name}</h3>
        <h3>$45.99</h3>
        <div className="WishListComponent--Nav">
        <button onClick={(e) => props.clicked(props.id)}>Remove</button>
        <button>Details</button>
        </div>
        </div>
        </div>
    )
}

export default WishListComponent
