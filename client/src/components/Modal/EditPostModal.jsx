/* Import react library */
import React, {useState} from "react";
import { useParams } from 'react-router-dom';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import {setToggleEditPostModal} from '../../redux/Reducers/modalReducer';

/* Import components */
import Switch from '../Switch/Switch';


const EditPostModal = (props) => {
    /* Access states from redux store */
    const toggleEditPostModalState = useSelector((state)=>{
        return state.modal.toggleEditPostModal;
    })
    const editedPostInfo = useSelector((state)=>{
        const usersPost = state.user.userPosts;
        const postIndex = state.post.postIndex;
        return usersPost[postIndex];
    })

    /* Access actions from redux store */
    const dispatch = useDispatch();

    /* Find out user id from url */
    const { userId } = useParams();

    /* States */
    const [title, setTitle] = useState(editedPostInfo?.title);
    const [description, setDescription] = useState(editedPostInfo?.description);
    const [isPrivate, setIsPrivate] = useState(editedPostInfo?.isPrivate);

    /* Send the edited post information (e.g postId, edited title, edited description, edited isPrivate) to profilePage.jsx */
    const editPost = () => {
        const data = {postId: editedPostInfo?._id ,title: title, description: description, isPrivate: isPrivate};
        console.log(data);
        props.sendDataToParent(data);
        dispatch(setToggleEditPostModal());
    }

    return ( 
        <>
            {/* Display the 'edit post' modal when the user click 'Edit' in their post */}
            {toggleEditPostModalState &&
                (<div className="modal-container">
                    <div className="modal-overlay">
                        <div className="modal-grid-container">
                            {/* Column 1 */}

                            {/* Preview post image */}
                            <div className="post-modal-second-slide">
                                <div className="post-image-preview-container">
                                        <img src={editedPostInfo?.postImgURL} alt="" className="post-image-preview"/>
                                </div>

                                <div className="post-image-preview-info-container">
                                    <form action={`http://localhost:3001/posts/update/${userId}`} method="POST">

                                        {/* 'Private' switch */}
                                        <div className="private-check-box-container">
                                            <span className="private-text">Private</span>
                                            <Switch className='set-private-post' value={isPrivate} onToggled={() => setIsPrivate(!isPrivate)} />
                                        </div>

                                        <div className="textfield-container">
                                            {/* 'Title' textfield */}
                                            <div className="form-floating mb-3 post-title-container">
                                                <input type="text" className="form-control post-title-textfield" id="floatingInput" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                <label htmlFor="floatingInput">Title</label>
                                            </div>

                                            {/* 'Description' textfield */}
                                            <div className="form-floating post-description-container">
                                                <textarea type="text" className="form-control post-description-textfield" style={{width: '450px' , height: '95px'}} id="floatingTextarea2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                                <label htmlFor="floatingTextarea2">Description</label>
                                            </div>
                                        </div>

                                        {/* 'Edit' button */}
                                        <button className="submit-button" onClick={editPost}><strong><i className="fa-solid fa-pen-to-square icon"></i>Edit</strong></button>
                                    </form>
                                </div>
                            </div>

                            <button className="close-button" onClick={()=>dispatch(setToggleEditPostModal())}><i className="fa-solid fa-xmark"></i></button>
                        </div>
                    </div>
                </div>)}
        </>
    );
}
export default EditPostModal;