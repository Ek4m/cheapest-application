import React, { Component } from 'react'
import './Index.css';

export class Index extends Component {
    state = {}

    componentDidMount(){
        document.title = 'Welcome to Cheapest App!!!';
    }

    render() {
        return (
            <div className="Index">
                <div className="Index--header">
                <div className="Index--Header--abs__triangle--top"></div>
                <div className="Index--header__content">
            <h1>The Cheapest App</h1>
            <p>Whether you're going to do some of your shopping or all of it online, you want the best bargain you can find.This app fits the best for your needs</p>
                           <div className="Index--form">
         <form action="#">
                    <div className="form--control">
                        <input type="text" name="srsr" placeholder="Name of the product"/>
                    </div>
                             <button type="submit">Search now</button> 
                </form>
         </div>

        </div>
        <img src={require("../../images/mans.png")} alt="header"/>
        <div className="Index--Header--abs__triangle--bottom"></div>
            </div>
            </div>
        )
    }
}

export default Index
