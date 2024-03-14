import React, {useEffect, useState, useRef} from "react";

/* Import redux stuff */
import { useSelector, useDispatch } from "react-redux";
import { setToggleImageModal } from "../redux/modalReducer";
import ImageCropper from "./ImageCropper";

const ImageModal = (props) => {
    /* Access states from redux store */
    const toggleImageModalState = useSelector((state) => {
        return state.modal.toggleImageModal;
    });

    /* Access action from redux store */
    const dispatch = useDispatch();

    const toggleImageModal = (e) => {
        dispatch(setToggleImageModal());
    };

    const handleDataReceivedFromChild = (userAvatarURL) =>{
        /* Send imageAvatarURL to profilePage.jsx */
        props.sendDataToParent(userAvatarURL);
        dispatch(setToggleImageModal());
    };

    return ( 
        <>
            {toggleImageModalState && (<div className="modal-container">
                                    <div className="modal-overlay">
                                        <div className="modal-grid-container">
                                            {/* Column 1 */}
                                            <div className="image-modal-col-1">
                                                <ImageCropper sendDataToParent={handleDataReceivedFromChild}/>
                                                <button className="close-button" onClick={toggleImageModal}><i className="fa-solid fa-xmark"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            )}

            
        </>
    );
}
 
export default ImageModal;