/* Import react library */
import React from "react";

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import { setToggleImageModal } from "../../redux/Reducers/modalReducer";
import ImageCropper from "../ImageCropper/ImageCropper";

const ImageModal = (props) => {
    /* Access states from redux store */
    const toggleImageModalState = useSelector((state) => {
        return state.modal.toggleImageModal;
    });

    /* Access actions from redux store */
    const dispatch = useDispatch();

    const toggleImageModal = (e) => {
        dispatch(setToggleImageModal());
    };

    /* Send user avatar base64 url to profilePage.jsx */
    const handleDataReceivedFromChild = (userAvatarURL) =>{
        props.sendDataToParent(userAvatarURL);
        dispatch(setToggleImageModal());
    };

    return ( 
        <>
            {/* Display the 'user avatar image' modal when the user click edit button under the user avatar */}
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