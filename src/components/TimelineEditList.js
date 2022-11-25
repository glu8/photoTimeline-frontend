import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TimelineList() {

    function useInput() {
        const [value, setValue] = useState("")
        const input = <input value={value} onChange={e => setValue(e.target.value)} type="text" />
        return [value, input]
    }

    const [timelineName, nameInput] = useInput();
    const [timelineList, setTimelineList] = useState([])

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

    function submitTimeline() {
        console.log(timelineName)
        axios.post("http://localhost:1000/newTimelinePost",
            {
                name: timelineName
            }
        )
        getTimelineList()
        window.location.reload(false)

    }

    useEffect(() => {
        getTimelineList()
    }, [])

    return (
        <div style={{
            'text-align': 'center', height: '100%', width: '100%', position: 'relative', overflow: 'hidden'
        }}>

            <div style={{ padding: '20px' }}>
                <h2>Enter Timeline Name to add</h2>
                {nameInput}
                <button onClick={submitTimeline} > Submit</button >
            </div>

            <h1>Existing Timelines</h1>
            {
                timelineList.map((timeline) => {
                    return (
                        <div className="timelineListItem" key={timeline["_id"]}>
                            <h3 style={{ padding: '20px' }}><Link to={'/upload/' + timeline["_id"]} style={{ color: 'black' }}>{timeline.name} > </Link></h3>
                        </div>
                    )
                })
            }
        </div >
    )
}