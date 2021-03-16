import React from 'react'
import { Link } from 'react-router-dom'
import './SideDrawerLink.css'

const SideDrawerLink = (props) => {
    return (
        <li className="SideDrawerLink">
            <div>
                <Link to={props.url}
                        onClick={e => props.clicked()}
                >{props.title}</Link>
            </div>
        </li>
    )
}

export default SideDrawerLink
