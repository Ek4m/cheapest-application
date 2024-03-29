import React, { useEffect, useState } from 'react'
import { instance } from '../../axios';
import PageFallback from '../../components/PageFallback/PageFallback';
import './Restaurant.css';

const Restaurant = (props) => {
    const [restaurant, setRestaurant] = useState(null);
    useEffect(() => {
        const id = props.match.params.id;
        instance.get('/restaurants/' + id)
        .then(response => {
            if(response.data.restaurant){
                document.title = response.data.restaurant.name
                setRestaurant(response.data.restaurant);
            }else{
                props.history.push('/');
            }
        })
        .catch(err => {
         props.history.push('/');
        })
    },[])

    let content = <PageFallback />;
    if(restaurant){
        content = <div className="RestaurantPage">
            <div className="RestaurantPage--Container">
        <h1>{restaurant.name}</h1>
        <h3><b>Cuisine: </b>{restaurant.food_type}</h3>
        <h3><b>Address: </b>{restaurant.address}</h3>
        <p>{restaurant.description}</p>
            </div>
            <img src={restaurant.logo} alt={restaurant.name}/>
        </div>
    }
    return content;
}

export default Restaurant
