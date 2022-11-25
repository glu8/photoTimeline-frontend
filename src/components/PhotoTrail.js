import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Timeline from './Timeline.js';
import './PhotoTrail.css';
import Map from './Map.js';

export const useIntersect = () => {
    const [entry, updateEntry] = useState({});
    const options = {
        rootMargin: "0px",
        threshold: 1.0
    }

    const callbackFunction = (entries) => {
        console.log(entries)
    }

    const observer = useRef(
        new IntersectionObserver(callbackFunction, options)
    );

    return entry;
};

const withRouter = WrappedPhotoTrail => props => {
    const params = useParams()
    return (
        <PhotoTrail
            {...props}
            params={params}
        />
    )
}

function PhotoTrail(props) {

    const standardZoom = 12
    const [timelineData, setTimelineData] = useState([])
    const [coordinates, setCoordinates] = useState({ lat: 37.7, lng: 122.41 })
    const [zoom, setZoom] = useState(standardZoom)
    const itemsRef = useRef([])
    const timelineRef = useRef({})
    const [timelineID, setTimelineID] = useState(0)

    function getTimelineData(timelineID) {
        console.log("timelineID", timelineID)
        axios({
            method: "GET",
            url: "http://localhost:1000/timelineData/" + timelineID
        }).then((response) => {
            const res = response.data

            setTimelineData(
                res.imageGroupList
            )

        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getTimelineData(props.params.timelineID)
    }, [])

    function setMapView(latitude, longitude) {
        setCoordinates({
            lat: latitude,
            lng: longitude
        })
        setZoom(standardZoom)
    }

    function scrollTimelineItemIntoView(index) {
        itemsRef.current[index].scrollIntoView()
    }



    return (
        <div style={{ height: '100%', width: '100%', position: 'relative', overflow: 'hidden' }}>

            {(timelineData.length === 0) ? <div style={{ textAlign: 'center' }}>
                <h1>Generating timeline... (this can take a minute. Make sure that images have been uploaded for this timeline.)</h1>
            </div> :
                <div>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '45%' }}>
                        {<Map timelineData={timelineData} zoom={zoom} coordinates={coordinates} setCoordinates={setCoordinates} setZoom={setZoom} scrollTimelineItemIntoView={scrollTimelineItemIntoView} />}

                    </div>

                    <div style={{
                        position: 'absolute', right: 0, top: 0, width: '55%', height: '100%'
                    }} >
                        {<Timeline timelineData={timelineData} setMapView={setMapView} timelineRef={timelineRef} itemsRef={itemsRef} class='Timeline' />}

                    </div>
                </div>
            }
        </div>

    )
}

export default withRouter(PhotoTrail)
/*
<div style={{ position: 'absolute', left: 0, top: 0, width: '62%', height: '100%' }}>

 <div style={{ position: 'absolute', right: 0, top: 0, width: '38%', height: '100%' }}>
                <Timeline timelineData={timelineData} class='Timeline' />
            </div>

<div style={{ height: '100%', width: '40%', overflowY: 'scroll' }}>
                <Timeline timelineData={timelineData} class='Timeline' />

            </div>
*/