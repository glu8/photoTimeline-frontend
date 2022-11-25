import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TimelineList() {

    const [timelineList, setTimelineList] = useState([])

    function parseDate(s) {
        var b = s.split(/\D/);
        return new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]);
    }


    function getTimelineList() {
        axios({
            method: "GET",
            url: "http://localhost:1000/timelines"
        }).then((response) => {
            const res = response.data
            console.log(response.data)
            setTimelineList(
                res.timelineList
            )

        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getTimelineList()
    }, [])

    return (
        <div style={{ 'text-align': 'center', height: '100%', width: '100%', position: 'relative', overflow: 'hidden' }}>
            <h2>Photo Timeline List</h2>
            {timelineList.map((timeline) => {
                let timelineStartDate = parseDate(timeline.startDateTime)
                let timelineEndDate = parseDate(timeline.endDateTime)
                return (
                    <div className="timelineListItem" key={timeline["_id"]}>
                        <h3 style={{ padding: '20px' }}><Link to={'/photoTimeline/' + timeline["_id"]} style={{ color: 'black' }}>{timeline.name} ></Link></h3>
                        <p>Start: {timelineStartDate.toDateString()}, {timelineStartDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p>End: {timelineEndDate.toDateString()}, {timelineEndDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                )
            })}
        </div>
    )
}