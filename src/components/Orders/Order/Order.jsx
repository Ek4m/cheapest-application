import React from 'react';
import { Link } from 'react-router-dom'
import './Order.css';
const Order = ( props ) => {
    let date = new Date(props.created);
    return (
       <Link 
       className="Order"
       to={`/my/orders/${props.id}`}>
        <div>
            <h5>Status: {props.status}</h5>
            <h6>Total Price: ${props.amount.toFixed(2)}</h6>
            <h6>Ordered: {date.getFullYear()}.{date.getMonth()}.{date.getDate()}</h6>
            <div className="Order--Container">
            </div>
        </div>
        </Link>
    )
}

export default Order
