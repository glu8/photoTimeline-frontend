import React, { useRef, useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

function MapContainer(props) {

    const initialCenter = {
        lat: props.timelineData[0].latitude,
        lng: props.timelineData[0].longitude
    }

    useEffect(() => {
        props.setCoordinates(initialCenter)
    }, [])

    const mapStyles = {
        width: '100%',
        height: '100%',
    };

    function _onChange({ center, zoom }) {
        props.setCoordinates(center)
        props.setZoom(zoom)
    }

    /*
    function displayMarkers() {
        return props.timelineData.map((object, index) => {
            return <Marker key={object._id + "_marker"} id={object._id + "_marker"} position={{
                lat: object.latitude,
                lng: object.longitude
            }} onClick={() => {
                props.setCoordinates({
                    lat: object.latitude,
                    lng: object.longitude
                })
                props.setZoom(props.standardZoom)
                props.scrollTimelineItemIntoView(index)
            }}

                style={{
                    backgroundColor: 'blue'
                }}

            />
        })
    }
    */

    function displayMarkers() {
        return props.timelineData.map((group, index1) => {
            return group.imageMetadata.map((object, index2) => {
                console.log(object)
                return <Marker key={object._id + "_marker"} id={object._id + "_marker"} position={{
                    lat: object.latitude,
                    lng: object.longitude
                }} onClick={() => {
                    props.setCoordinates({
                        lat: object.latitude,
                        lng: object.longitude
                    })
                    props.setZoom(props.standardZoom)
                    props.scrollTimelineItemIntoView(index1)
                }}

                    style={{
                        backgroundColor: 'blue'
                    }}

                />
            })
        })
    }

    return (
        <Map
            google={props.google}
            onChange={_onChange}
            zoom={props.zoom}
            style={mapStyles}
            initialCenter={props.coordinates}
            center={props.coordinates}
            streetViewControl={false}
            fullscreenControl={false}
            options={{ styles: [{ stylers: [{ 'saturation': 50 }, { 'gamma': 0.5 }] }] }}
        >
            {displayMarkers()}
        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCQQQZKC99E52XiY4bd1eZI_VOG2RFqsJ8'
})(MapContainer);

/*
export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(139.753);
    const [lat] = useState(35.6844);
    const [zoom] = useState(14);
    const [API_KEY] = useState('VmBZxlaZKIBQIYAMxmWj');


    useEffect(() => {
        if (map.current) return; //stops map from intializing more than once
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom
        });
    });

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );


} */