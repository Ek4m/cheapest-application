import React from 'react'
import { Link } from 'react-router-dom'
import './HeaderLink.css';

const HeaderLink = (props) => {



    return (
       <li>
            <div className="HeaderLink">
            <Link to={props.path}>
            {props.children}
               {props.title}
            </Link>
            </div>
       </li>
    )
}

export default HeaderLink
