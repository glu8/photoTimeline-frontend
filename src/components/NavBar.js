import React from 'react';
import './NavBar.css';


export default function Navbar() {

    return (
        <div className="NavBar" >
            <ul id="NavList">
                <li><a href="http://localhost:3000/timelineList">View Timelines</a></li>
                <li><a href="http://localhost:3000/timelineEditList">Edit Timeline</a></li>
            </ul>
        </div>
    )

}