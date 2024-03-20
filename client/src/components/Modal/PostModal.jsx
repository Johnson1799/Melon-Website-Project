/* Import react library */
import React, {useEffect, useState} from "react";

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import { setTogglePostModal } from "../../redux/Reducers/modalReducer";

/* Import components */
import Switch from '../Switch/Switch';

/* Import self-make image selector function */
import { ImageSelector } from "../../assets/ImageSelector.js";


const PostModal = (props) => {
    /* States */
    const [fileList, setFileList] = useState([]);
    const [isNextButtonClicked, setisNextButtonClicked] = useState(false);
    const [isPreviousButtonClicked, setisPreviousButtonClicked] = useState(false);
    const [postImagePreview, setPostImagePreview] = useState([]);
    const [userInputTitle, setUserInputTitle] = useState('');
    const [userInputDescription, setUserInputDescription] = useState('');
    const [togglePrivate, setTogglePrivate] = useState(false);
    const [error, setError] = useState('');

    /* Access states from redux store */
    const togglePostModalState = useSelector((state) => {
        return state.modal.togglePostModal;
    });
    const userId = useSelector((state) => {
        return state.user.user.id;
    });
    
    /* Access actions from redux store */
    const dispatch = useDispatch();
    
    /* Handler */
    const togglePostModal = (e) => {
        dispatch(setTogglePostModal());
    };

    const updateFileList = (e) => {
        const file = e.target.files[0];
        if (file){
            /* Allow to upload multiple files */
            const updatedList = [...fileList, file];
            setFileList(updatedList);
        }
    }

    const fileDelete = (file) => {
        /* Allow to delete multiple files */
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
    }

    const handleTogglePrivate = () => {
        setTogglePrivate(!togglePrivate);
    }

    const toggleNextSlide = (e) => {
        setisNextButtonClicked(true);
        setisPreviousButtonClicked(false);

        /* To get the base64 url in each of the uploaded files */
        fileList.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                const imageURL = reader.result;
                setPostImagePreview((previouspostImagePreviewURL) => [...previouspostImagePreviewURL, imageURL]);
            };

            /* Read the content of the file and generate the base64 url of that file */
            reader.readAsDataURL(file);
        })
    }

    const togglePreviousSlide = (e) => {
        setisPreviousButtonClicked(true);
        setisNextButtonClicked(false);
        setPostImagePreview([]);
    }

    const handleTitleInputChange = (e) => {
        setUserInputTitle(e.target.value);
    }
    const handleDescriptionInputChange = (e) => {
        setUserInputDescription(e.target.value);
    }

    /* Display the file size with unit */
    const convertFileSize = (fileSize) => {
        
        if (fileSize === 0) {
            return '0 Bytes';
        }
    
        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const base = 1024;
        const decimalPlaces = 1;
    
        const sizeIndex = Math.floor(Math.log(fileSize) / Math.log(base));
        const size = (fileSize / Math.pow(base, sizeIndex)).toFixed(decimalPlaces);
    
        return `${size} ${units[sizeIndex]}`;
    }

    /* Send post information (e.g post image base64 url, title, description, isPrivate) to profilePage.jsx */
    const uploadPost = (e) => {
        const data = {postImgURL:postImagePreview, title:userInputTitle, description:userInputDescription , isPrivate:togglePrivate};
        props.sendDataToParent(data);

        /* Close the modal */
        dispatch(setTogglePostModal());
    }

    /* Setting the error */
    useEffect(()=>{
        if(fileList.length>1){
            setError("Only 1 file is allowed");
        }
        else{
            setError('');
            fileList.map((file,index) => {
                const fileFormat = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
                if(fileFormat === 'pdf' || fileFormat === 'doc' || fileFormat === 'docx' || fileFormat === 'gif' || fileFormat==='mp3'){
                    setError(`.${fileFormat} format is not allowed`);
                }
                if (file.size > 10485760 && (fileFormat === 'jpg' || fileFormat ==='jpeg' || fileFormat==='png' || fileFormat==='svg')){   //10 MB
                    setError(`.${fileFormat} format exceed 10MB`);
                }
                else if (file.size > 104857600 && (fileFormat === 'mp4' || fileFormat ==='mov' || fileFormat==='avi' || fileFormat==='wmv')){
                    setError(`.${fileFormat} format exceed 100MB`);
                }
            
            })
        }   
    },[fileList])

    return (  
        <>
            {/* Display the 'post' modal when the user click create post button */}
            {togglePostModalState && 
                (<div className="modal-container">
                    <div className="modal-overlay">
                        <div className="modal-grid-container">
                            {/* Column 1 */}
                            <div className="post-col-1">

                                {/* First slide of the post modal */}
                                {(!isNextButtonClicked || isPreviousButtonClicked) ? (<div className="post-modal-first-slide">

                                    {/* Create the file uploading area */}
                                    <div className="drop-box-container" >
                                        <i className="fa-solid fa-cloud-arrow-up icon"></i>
                                        <input type="file" value="" className="upload-file-button " onChange={updateFileList}/>
                                        <span>Drag & Drop your files here or Click to browse files</span>
                                    </div>

                                    {fileList.length > 0 ? 
                                        (<div className="file-list-container">
                                            <span className="title">Ready to upload</span>

                                            {/* Display the error message if user upload more than 1 file, user upload other non-image/non-video format or user uploaded file exceed a specific file size */}
                                            {(fileList.length > 1 || error) ? (<span className="error">{error}</span>) : null}

                                            {/* Display the list of the uploaded files */}
                                            { fileList.map((file,index) => 
                                                (<div key={index} className="file-list-item">
                                                    <img src={ImageSelector[file.type.split('/')[1]] || ImageSelector['default']} alt="" className="file-icon"/>
                                                    <div className="file-info">
                                                        <span className="file-name">{file.name}</span>
                                                        <span className="file-size">{convertFileSize(file.size)}</span>
                                                    </div>
                                                    <span className="file-delete" onClick={() => fileDelete(file)}><i className="fa-solid fa-xmark"></i></span>
                                                </div>))
                                            }
                                        </div>) 
                                    : null}
                                </div>) : null}


                                {/* Second slide of the post modal */}
                                {(fileList.length > 0 && isNextButtonClicked) ? (
                                    <div className="post-model-second-slide">
                                        <div className="post-image-preview-container">

                                            {/* Preview the post image */}
                                            {postImagePreview.map((imageURL,index) => 
                                                (<img src={imageURL} alt="" className="post-image-preview" key={index}/>)
                                            )}
                                        </div>

                                        <div className="post-image-preview-info-container">
                                            <form action={`http://localhost:3001/posts/create/${userId}`} method="POST">

                                                {/* Set private switch */}
                                                <div className="private-check-box-container">
                                                    <span className="private-text">Private</span>
                                                    <Switch className='set-private-post' value={togglePrivate} onToggled={handleTogglePrivate} />
                                                </div>

                        
                                                <div className="textfield-container">
                                                    {/* 'Title' textfield */}
                                                    <div className="form-floating mb-3 post-title-container">
                                                        <input type="text" className="form-control post-title-textfield" id="floatingInput" placeholder="Title" value={userInputTitle} onChange={handleTitleInputChange} />
                                                        <label htmlFor="floatingInput">Title</label>
                                                    </div>

                                                    {/* 'Description' textfield */}
                                                    <div className="form-floating post-description-container">
                                                        <textarea type="text" className="form-control post-description-textfield" style={{width: '450px' , height: '95px'}} id="floatingTextarea2" placeholder="Description" value={userInputDescription} onChange={handleDescriptionInputChange} />
                                                        <label htmlFor="floatingTextarea2">Description</label>
                                                    </div>
                                                </div>

                                                {/* 'Upload' textfield */}
                                                <button className="submit-button" onClick={uploadPost}><strong><i className="fa-solid fa-arrow-up-from-bracket icon"></i>Upload</strong></button>
                                            </form>
                                        </div>
                                    </div>
                                ) : null}

                                {/* Close modal button */}
                                <button className="close-button" onClick={togglePostModal}><i className="fa-solid fa-xmark"></i></button>
                                
                                {/* Display the button for going to second slide of the modal */}
                                {(fileList.length === 1 && !isNextButtonClicked && !error) ? <button className="first-slide-button" onClick={toggleNextSlide}><i className="fa-solid fa-chevron-right"></i></button> : null}
                                
                                {/* Display the button for going to first slide of the modal */}
                                {(fileList.length === 1 && !isPreviousButtonClicked && isNextButtonClicked) ? <button className="second-slide-button" onClick={togglePreviousSlide}><i className="fa-solid fa-chevron-left"></i></button> : null}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
 
export default PostModal;