import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ModalImage from "react-modal-image";
import './TimelineItem.css';

export default function TimelineItem(props) {

    function parseDate(s) {
        var b = s.split(/\D/);
        return new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]);
    }

    let startDateTime = parseDate(props.imageGroup.startDateTime)
    let endDateTime = parseDate(props.imageGroup.endDateTime)
    let startDate = startDateTime.toDateString()
    let endDate = endDateTime.toDateString()
    let startTime = startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    let endTime = endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const [imageGroup, setImageGroup] = useState(props.imageGroup)
    const itemWrapperRef = useRef(null)

    const thresholdArray = steps => Array(steps + 1)
        .fill(0)
        .map((_, index) => index / steps || 0)


    let previousY = null
    let previousRatio = null

    const callbackFunction = (entries) => {

        entries.forEach(entry => {
            const currentY = entry.boundingClientRect.y
            const currentRatio = entry.intersectionRatio
            const isIntersecting = entry.isIntersecting

            if (currentY < previousY && isIntersecting) {
                console.log(imageGroup, previousY, currentY, previousRatio, currentRatio)
                if ((currentRatio <= previousRatio) && (currentRatio < 0.5) && (props.nextGroup)) {
                    props.setMapView(props.nextGroup.latitude, props.nextGroup.longitude)
                }
            } else if (previousY != null && currentY > previousY && isIntersecting) {
                if ((currentRatio >= previousRatio) && (currentRatio > 0.5)) {
                    props.setMapView(props.imageGroup.latitude, props.imageGroup.longitude)
                }

            }

            previousY = currentY
            previousRatio = currentRatio

        })
    }

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: thresholdArray(100)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options)
        if (itemWrapperRef.current) observer.observe(itemWrapperRef.current)

        return () => {
            if (itemWrapperRef.current) observer.unobserve(itemWrapperRef.current)
        }
    }, [itemWrapperRef, options])


    return (
        <div className="TimelineItemWrapper" ref={itemWrapperRef}>
            <div className="TimelineItem" style={{ padding: '20px' }} key={imageGroup.sequence} ref={(element) => { props.itemsRef.current[props.index] = element }}>
                <h3><a style={{ color: "black", cursor: "pointer" }} onClick={() => { props.setMapView(imageGroup.latitude, imageGroup.longitude) }}>{imageGroup.sequence + 1} / {imageGroup.location}</a></h3>
                <p>{startTime}, {startDate}{(props.imageGroup.startDateTime === props.imageGroup.endDateTime) ? "" : "-" + endTime + ", " + endDate}</p>
                <div className="PhotoGrid">
                    {imageGroup.images.map((imageId) => {
                        return (
                            <div className="PhotoItem">
                                <ModalImage
                                    small={"http://localhost:1000/image/" + imageId}
                                    large={"http://localhost:1000/image/" + imageId}
                                />
                                {/* <img key={imageId} src={"http://localhost:1000/image/" + imageId} alt="" resizeMode='contain' width={200} />)*/}
                            </div>)

                    })}
                </div>

            </div>
        </div>
    )

}

