import React from 'react'
import { Link } from 'react-router-dom'
import './Restaurant.css'

const Restaurant = (props) => {
    return (
        <div className="Restaurant">
            <div className="Restaurant--Bck"
            style={{background:`url("${props.imageUrl}")`, backgroundSize:'cover',backgroundPosition:'center', backgroundRepeat:'no-repeat'}}
            >
            </div>
            <div className="Restaurant--Nav">
            <h1>{props.name}</h1>
                <Link to={"/restaurants/" + props.url}>Details</Link>
            </div>
        </div>
    )
}

export default Restaurant
