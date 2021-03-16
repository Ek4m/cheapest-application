import React, { useEffect, useState } from 'react'
import { instance } from '../../axios'
import Restaurant from './Restaurant/Restaurant';
import './RestaurantList.css'

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        instance.get('/restaurants')
        .then(response => {
            setRestaurants(response.data);
        })
        .catch(err =>{
            console.log(err);
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
