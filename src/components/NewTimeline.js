import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewTimeline() {

    function useInput() {
        const [value, setValue] = useState("")
        const input = <input value={value} onChange={e => setValue(e.target.value)} type="text" />
        return [value, input]
    }

    const [timelineName, nameInput] = useInput();
    const navigate = useNavigate();

    function submitTimeline() {
        console.log(timelineName)
        axios.post(process.env.REACT_APP_BASE_BACKEND_URL + "/newTimeline",
            {
                name: timelineName
            }
        )
    }


    return (
        <div className="newTimeline" style={{ padding: '20px' }}>
            <h3>New Timeline</h3>
            {nameInput}
            <button onClick={submitTimeline}>Submit</button>
        </div>
    )
}