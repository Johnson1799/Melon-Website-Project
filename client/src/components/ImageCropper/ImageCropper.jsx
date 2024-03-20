/* Import react library */
import React, { useState, useRef } from "react";

/* Import react-image-crop library */
import ReactCrop, { makeAspectCrop, centerCrop, convertToPixelCrop, } from 'react-image-crop';

/* Import conponents */
import previewCanvas from "./previewCanvas";

/* Initialization */
const ASPECT_RATIO = 1;
const CROP_MIN_WIDTH = 150;
const CROP_MIN_HEIGHT = 150;

const ImageCropper = (props) => {
    /* Reference to HTML attributes */
    const imageRef = useRef(null);
    const previewCanvasRef = useRef(null);

    /* States */
    const [image, setImage] = useState('');
    const [imageFileName, setImageFileName] = useState("No file is chosen");
    const [crop, setCrop] = useState(null);
    const [error, setError] = useState('');

    /* Handlers */
    const onSelectFile = (e) => {
        const file = e.target.files[0];

        /* Find the filename */
        if (e.target.files && e.target.files.length > 0) {
            setImageFileName(e.target.files[0].name);
        }

        /* Do some stuffs during loading the image */
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageURL = e.target.result;

            /* Check the image size */
            const imageElement = new Image();

            /* Find out the image base64 url */
            imageElement.src = imageURL;
            imageElement.onload = (e) => {
                if (error){
                    /* Initialize the 'error' state*/
                    setError("");
                }
                const {naturalWidth, naturalHeight} = e.currentTarget;

                 /* Set the error if the image size is smaller than the minimum crop size */
                if (naturalWidth < CROP_MIN_WIDTH || naturalHeight < CROP_MIN_HEIGHT){
                    setError("Image must be at least 150 x 150 pixels.");
                    return setImage("");
                }
            }
            setImage(imageURL);
        }

        /* Read the content of the file and generate the base64 url of that file */
        reader.readAsDataURL(file);
    }

    const onImageLoad = (e) => {
        /* Setting up the user avatar crop */
        const {width, height} = e.currentTarget;
        const cropWidthInPercent = (CROP_MIN_WIDTH / width) *100;

        const crop = makeAspectCrop({
            unit: "%", 
            width: cropWidthInPercent,

        }, ASPECT_RATIO, width, height);

        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    const handleCloseImageModal = (e) => {
        previewCanvas(imageRef.current, previewCanvasRef.current, convertToPixelCrop(crop, imageRef.current.width, imageRef.current.height));
        
        /* Find out the cropped user avatar base64 url */
        const userAvatarURL = previewCanvasRef.current.toDataURL();

        /* Send cropped user avatar base64 url to ImageModal.jsx */
        const data = {userAvatarURL:userAvatarURL};
        props.sendDataToParent(data);

    };

    return (  
        <>
            <label htmlFor="photo-upload" className="photo-upload-button">Choose File</label>
            <input type="file" accept="image/*" className="photo-upload-input" id="photo-upload" onChange={onSelectFile}  />
            <p className="file-name-label">{imageFileName}</p>
            {error && (<p className="crop-error-message">{error}</p>)}
            {image && (
                <div className="crop-container">
                    <ReactCrop className="crop" crop={crop} onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)} circularCrop keepSelection aspect={ASPECT_RATIO} minWidth={CROP_MIN_WIDTH} minHeight={CROP_MIN_HEIGHT}>
                        <img src={image} alt="Upload" onLoad={onImageLoad} ref={imageRef}/>
                    </ReactCrop>

                    <button className="crop-button" onClick={handleCloseImageModal}>Crop</button>
                </div>

            )}
            {crop && <canvas className="crop-preview-canvas" ref={previewCanvasRef} />}

        </>
    );
}
 
export default ImageCropper;