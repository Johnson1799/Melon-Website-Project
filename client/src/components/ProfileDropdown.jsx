import React, {useEffect, useState, useRef} from "react";

/* Import redux stuff */
import { useSelector, useDispatch } from "react-redux";
import {deleteUserPost} from '../redux/userReducer';
import {setToggleEditPostModal} from '../redux/modalReducer';
import {setPostIndex} from '../redux/postReducer';

const ProfileDropdown = (props) => {
    const userPosts = useSelector((state) => {
        return state.user.userPosts;
    })
    const user = useSelector((state) => {
        return state.user.user;
    })
    const token = useSelector((state) => {
        return state.user.token;
    })

    const dispatch = useDispatch();

    const toggleEditPostModal = () => {
        dispatch(setToggleEditPostModal());
        dispatch(setPostIndex(props.postIndex));
    }

    const handleDeletePost = async (e) => {
        /* Delete the post in database */
        const userId = user?._id;                           // MongoDB user id
        const postId = userPosts[props.postIndex]?._id;     // MongoDB post id
        const postImgURL = userPosts[props.postIndex].postImgURL;   // Cloudinary postImgURL
        const dataPassToServer = {postImgURL: postImgURL};
        const url = `http://localhost:3001/posts/delete/${userId}/${postId}`;
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
        })
        .catch((err) => {
            console.log(err);
        });

        /* Delete the post in redux store */
        dispatch(deleteUserPost(props.postIndex));

        /* Toggle the dropdown */
        props.setToggleDropDownList();
    }

    return ( 
        <ul className="dropdowns-container">
            <li>
                <button onClick={toggleEditPostModal}>Edit<i className="fa-solid fa-pencil icon"></i></button>
            </li>
            <li>
                <button onClick={handleDeletePost}>Delete<i className="fa-solid fa-trash icon icon"></i></button>
            </li>
        </ul>
    );
}
 
export default ProfileDropdown;