import React, { useState, useEffect } from 'react';
import Carousel, { CarouselItem } from './Carousel';
import axios from 'axios';

import "./UploadImages.css"

export default function UploadImages() {
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = []
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
        setImageURLs(newImageUrls);
    }, [images])

    function onImageChange(e) {
        setImages([...e.target.files])
    }

    function onSubmit(e) {
        e.preventDefault()
        var formData = new FormData()
        images.map((image) =>
            formData.append('files', image)
        )

        axios.post("http://localhost:1000/upload", formData, {}).then(res => {
            console.log(res.data)
        })
    }

    return (
        <>
            <Carousel>
                {imageURLs.map(imageSrc => <CarouselItem><img className="image" src={imageSrc} alt={""} /></CarouselItem>)}
            </Carousel>
            <input type="file" multiple accept="image/*" onChange={onImageChange} />
            <button type="submit" className="uploadButton" onClock={onSubmit}>Upload</button>
        </>
    )
}