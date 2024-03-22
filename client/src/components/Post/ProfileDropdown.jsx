/* Import react library */
import React from "react";

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import {deleteUserPost} from '../../redux/Reducers/userReducer';
import {setToggleEditPostModal} from '../../redux/Reducers/modalReducer';
import { setPostIndex, deleteProfilePost } from '../../redux/Reducers/postReducer';


const ProfileDropdown = (props) => {
    /* Access states from redux store */
    const userPosts = useSelector((state) => {
        return state.user.userPosts;
    })
    const profilePosts = useSelector((state) => {
        return state.post.profilePosts;
    })
    const user = useSelector((state) => {
        return state.user.user;
    })
    const token = useSelector((state) => {
        return state.user.token;
    })

    /* Access action from redux store */
    const dispatch = useDispatch();

    /* Handlers */
    const toggleEditPostModal = () => {
        dispatch(setToggleEditPostModal());
        dispatch(setPostIndex(props.postIndex));
    }

    const handleDeletePost = async (e) => {
        const userId = user?._id;                                   // MongoDB user id
        const postId = userPosts[props.postIndex]?._id;             // MongoDB post id
        const postImgURL = userPosts[props.postIndex].postImgURL;   // Cloudinary postImgURL
        const dataPassToServer = {postImgURL: postImgURL};
        const url = `http://localhost:3001/posts/delete/${userId}/${postId}`;

        /* Delete the post in database (sending delete request to server) */
        await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dataPassToServer),
        })
        .then((res)=>{
            if (!res.ok){
                throw new Error(`Get request in (${url}) failed`);
            }
            return res.json();
        })
        .then((data) =>{
            if (data.message){
                console.log(data.message);
            }
            /* Delete the specific post in redux store */
            dispatch(deleteUserPost(props.postIndex));
        })
        .catch((err) => {
            console.log(err);
        });

        /* Implement this in friendProfile.jsx*/
        dispatch(deleteProfilePost(props.postIndex));

        /* Toggle the dropdown */
        props.setToggleDropDownList();
    }

    return ( 
        <ul className="dropdowns-container">
            <li>
                {/* 'Edit' button in dropdown */}
                <button onClick={toggleEditPostModal}>Edit<i className="fa-solid fa-pencil icon"></i></button>
            </li>
            <li>
                {/* 'Delete' button in dropdown */}
                <button onClick={handleDeletePost}>Delete<i className="fa-solid fa-trash icon icon"></i></button>
            </li>
        </ul>
    );
}
 
export default ProfileDropdown;