import React, { useState, useEffect, useRef } from 'react';
import TimelineItem from './TimelineItem';

export default function PhotoTrail(props) {

    const timelineData = props.timelineData

    return (
        <div className="TimelineContainer" style={{ position: 'absolute', right: 0, top: 0, width: '100%', height: '100%', overflowY: 'scroll' }} ref={props.timelineRef}>
            {timelineData.map((imageGroup, index) => {

                if ((index > 0) && (index < timelineData.length - 1)) {
                    return (<TimelineItem imageGroup={imageGroup} setMapView={props.setMapView} itemsRef={props.itemsRef} index={index} key={index} timelineRef={props.timelineRef} prevGroup={timelineData[index - 1]} nextGroup={timelineData[index + 1]} />)
                } else if ((index === 0)) {
                    return (<TimelineItem imageGroup={imageGroup} setMapView={props.setMapView} itemsRef={props.itemsRef} index={index} key={index} timelineRef={props.timelineRef} nextGroup={timelineData[index + 1]} prevGroup={timelineData[index - 1]} />)
                } else {
                    return (<TimelineItem imageGroup={imageGroup} setMapView={props.setMapView} itemsRef={props.itemsRef} index={index} key={index} timelineRef={props.timelineRef} prevGroup={timelineData[index - 1]} />)
                }
            })}
        </div>
    )
}