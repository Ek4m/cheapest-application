import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './About.css'

const About = () => {

    useEffect(() => {
        document.title = 'Get more information about our brand';
    },[])
    return (
        <div className="About">
            <div className="About--Header">
<div className="About--Header__Container">
    <div className="About--Header__Info">
        <h1>See the difference.</h1>
        <h5>Discover hundreds of products with the cheapest price</h5>
        <h3>Shopping rediscovered.</h3>
<div className="About--Header__Nav">
    <div className="About--Nav_Link">
        <Link to="/register">Join now</Link>
    </div>
</div>
    </div>
    <img src={require("../../images/about-header.png")} alt="about"/>
</div>
            </div>
        </div>
    )
}

export default About
