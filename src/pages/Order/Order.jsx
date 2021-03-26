import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { findToken, instance } from '../../axios';
import withAuth from '../../hoc/withAuth';
import './Order.css';
import OrderProduct from './OrderProduct/OrderProduct';
const Order = (props) => {
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(false);
    const [prodError, setProdError] = useState(false);
    const [products, setProducts] = useState([]);

   useEffect(() => {
       if(props.match.params.id){
        instance.get(`/order/${props.match.params.id.trim()}`,{
            headers:{
                'X-Auth-Token':findToken()
            }
        })
        .then(response => {
           if(response.data && response.data.order){
               setOrder(response.data.order);
            console.log(response.data)
            document.title = 'Your orders';
            setProducts(response.data.order._food)

           }else{
            props.history.push('/profile');
           }
        })
        .catch(err => {
            document.title = 'Not found';
            console.log(err)
            setError(true)
        })
       }
   },[props.match])


   let content = <h1>Loading...</h1>
   if(error){
       content = <h1>Error occured</h1>
   }else if(order){
let prods = <h1>Loading...</h1>;
if(prodError){
    prods = <h1>Couldn't get products</h1>
}else {
    console.log(products)
    prods = products.map(prod => (
        <OrderProduct
        key={prod._id}
        name={prod.foodName}
        quantity={prod.count}
        amount={prod.price}
        image={prod.img}
        restName={prod.restaurantName}
        />
    ))
}

       let date = new Date(order.created);
content =   <div className="card card-1">
<div className="card-header bg-white">
    <div className="media flex-sm-row flex-column-reverse justify-content-between ">
        <div className="col my-auto py-4">
            <h4 className="mb-0">Thanks for your Order, <span className="change-color">{props.user.username}</span> !</h4>
        </div>
    </div>
</div>
<div className="card-body">
    <div className="row justify-content-between mb-3">
        <div className="col-auto">
            <h6 className="color-1 mb-0 change-color">Receipt</h6>
        </div>
    </div>
{prods}
</div>
<div className="row">
    <div className="media-body my-auto text-right text-center">
        <div className="row my-auto flex-column flex-md-row">
            <div className="col my-auto">
                <h2 className="mb-4 text">Status: <i className="change-color">{order.status}</i></h2>
            </div>
        </div>
    </div>
</div>
<div className="row">
    <div className="media-body my-auto text-right text-center">
        <div className="row my-auto flex-column flex-md-row">
            <div className="col my-auto">
                <h2 className="mb-4 text">Ordered: <i className="change-color"> {date.getFullYear()}.{date.getMonth()}.{date.getDate()}</i></h2>
            </div>
        </div>
    </div>
</div>
<div className="card-footer">
    <div className="jumbotron-fluid">
        <div className="row justify-content-between ">
            <div className="col-auto my-auto ">
                <h2 className="mb-0 font-weight-bold">TOTAL PAID: </h2>
            </div>
            <div className="col-auto my-auto ml-auto">
                <h1 className="display-3 ">&#8380; {order.total_amount.toFixed(2)}</h1>
            </div>
        </div>
    </div>
</div>
</div>
   }
    return (
    <div className="container-fluid my-5 d-flex justify-content-center">
  {content}
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
        return {}
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Order))