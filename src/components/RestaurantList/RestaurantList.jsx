import React, { useEffect, useState } from 'react'
import { instance } from '../../axios'
import Restaurant from './Restaurant/Restaurant';
import './RestaurantList.css'

import { toast } from 'react-toastify';

let success = (msg) => toast.success(msg,{
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })
    let error = (err) => toast.error(err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        instance.get('/restaurants')
        .then(response => {
            setRestaurants(response.data);
        })
        .catch(err =>{
            error(err.message || 'Couldn\'t fetch restaurants')
        })
    },[])

    let content;
    if(restaurants.length > 0){
        content = restaurants.map(restaurant => (
            <Restaurant
            key={restaurant._id}
            url={restaurant._id}
            imageUrl={restaurant.logo}
            name={restaurant.name}
            description={restaurant.description}
            />
        ))
    }
    return (
        <div className="RestaurantList">
            <h1>List of the restaurants</h1>
            <div className="RestaurantList--Container">
            {content}
            </div>
        </div>
    )
}

export default RestaurantList
