import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import './UploadImages.css';
import axios from 'axios';

function DropZoneUploader(props) {
    // specify upload params and url for your files
    const getUploadParams = ({ file, meta }) => {
        const body = new FormData()
        body.append('file', file)
        console.log(file)
        body.append('timelineID', props.timelineID)
        return { url: process.env.REACT_APP_BASE_BACKEND_URL + '/upload', body }
    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            accept="image/jpeg,image/jpg"
        />
    )
}

export default function UploadImages() {

    const params = useParams()
    const [timeline, setTimeline] = useState({})

    function generateTimeline() {
        axios.get(process.env.REACT_APP_BASE_BACKEND_URL + "/generateTimelineGroups/" + params.timelineID).then(res => {
            console.log(res.status)
        })
    }

    function getTimeline() {
        axios.get(process.env.REACT_APP_BASE_BACKEND_URL + "/getOneTimeline/" + params.timelineID).then(res => {
            setTimeline(res.data.timeline)
            console.log(res.data.timeline)
        })
    }

    useEffect(() => {
        getTimeline()
    }, [])

    return (

        <div className="UploadImageContainer">

            <h2>{timeline.name}</h2>

            <h3>Upload Files</h3>
            <p>Please only upload JPEGs (.jpeg or .jpg) of maximum 500 KB file size.</p>
            <DropZoneUploader timelineID={params.timelineID} />

            <button style={{ margin: 10 }} onClick={generateTimeline}>Generate Timeline</button>
        </div>

    )
}