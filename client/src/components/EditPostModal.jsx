import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';

/* Import redux stuff */
import { useSelector, useDispatch } from "react-redux";
import {setToggleEditPostModal} from '../redux/modalReducer';
import {updateUserPosts} from '../redux/userReducer';

/* Import components */
import Switch from './Switch';


const EditPostModal = (props) => {

    const toggleEditPostModalState = useSelector((state)=>{
        return state.modal.toggleEditPostModal;
    })
    const editedPostInfo = useSelector((state)=>{
        const usersPost = state.user.userPosts;
        const postIndex = state.post.postIndex;
        return usersPost[postIndex];
    })

    const dispatch = useDispatch();

    const { userId } = useParams();

    const [title, setTitle] = useState(editedPostInfo?.title);
    const [description, setDescription] = useState(editedPostInfo?.description);
    const [isPrivate, setIsPrivate] = useState(editedPostInfo?.isPrivate);

    const editPost = async() => {
        /* Update new data to database */
        const data = {postId: editedPostInfo?._id ,title: title, description: description, isPrivate: isPrivate};
        console.log(data);
        props.sendDataToParent(data);
        dispatch(setToggleEditPostModal());

    }

    return ( 
        <>
            {toggleEditPostModalState &&
                (<div className="modal-container">
                    <div className="modal-overlay">
                        <div className="modal-grid-container">
                         
                            <div className="post-modal-second-slide">
                                <div className="post-image-preview-container">
                                        <img src={editedPostInfo?.postImgURL} alt="" className="post-image-preview"/>
                                </div>

                                
                                <div className="post-image-preview-info-container">
                                    <form action={`http://localhost:3001/posts/update/${userId}`} method="POST">
                                        <div className="private-check-box-container">
                                            <span className="private-text">Private</span>
                                            <Switch className='set-private-post' value={isPrivate} onToggled={() => setIsPrivate(!isPrivate)} />
                                        </div>

                                        <div className="textfield-container">
                                            <div className="form-floating mb-3 post-title-container">
                                                <input type="text" className="form-control post-title-textfield" id="floatingInput" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                <label htmlFor="floatingInput">Title</label>
                                            </div>

                                            <div className="form-floating post-description-container">
                                                <textarea type="text" className="form-control post-description-textfield" style={{width: '450px' , height: '95px'}} id="floatingTextarea2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                                <label htmlFor="floatingTextarea2">Description</label>
                                            </div>
                                        </div>
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