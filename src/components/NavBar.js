import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {

    return (
        <div className="NavBar" >

            <ul id="NavList">
                <li> <p><Link className="Link" to={'/timelineList/'}>View Timelines</Link></p></li>
                <li><p><Link className="Link" to={'/timelineEditList/'}>Edit Timelines</Link></p></li>
            </ul>
        </div>
    )

}