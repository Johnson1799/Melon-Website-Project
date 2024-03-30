/* Import react library */
import React, {useEffect, useState, useRef} from "react";
import { useParams } from 'react-router-dom';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
// import {  } from '../../redux/Reducers/postReducer';
// import {  } from "../../redux/Reducers/userReducer";

/* Import components */
import Replies from "./Replies";


const Comment = (props) => {

    /* Access states from redux store */
    // const largePost = useSelector((state) => {
    //     return state.user.largePost;
    // })
    // const userPost = useSelector((state) => {
    //     return state.user.userPosts[largePost?.postIndex];
    // })
    // const profilePost = useSelector((state) => {
    //     return state.post.profilePosts[largePost?.postIndex];
    // })
    // const userId = useSelector((state) => {
    //     return state.user.user?._id;
    // })
    // const otherUserId = useSelector((state) => {
    //     return state.post.profileUser?._id;
    // })
    // const user = useSelector((state) => {
    //     return state.user.user;
    // })
    // const token = useSelector((state) => {
    //     return state.user.token;
    // })

    const dispatch = useDispatch();

    /* States */
    const [toggleReplyTextArea, setToggleReplyTextArea] = useState(false);

    /* Handlers */
    const handleReply = () => {
        setToggleReplyTextArea(!toggleReplyTextArea);
    }

    return ( 
        <div className="comment-container-with-reply" >
            <div className="comment-container">
                <img className='user-avatar' src={`${props.userAvatarURL}`} alt="" />
                <div className="comment-contents">
                    <span className="username">{props.userName}</span>
                    <p className="comment-text">{props.comment}</p>
                </div>
                <button className="reply-button" onClick={handleReply}><i className="fa-solid fa-caret-down"></i></button>
                
            </div>

            {toggleReplyTextArea && <Replies commentIndex={props.commentIndex} isUser={props.isUser} toggleReplyTextArea={toggleReplyTextArea}/> }

        </div>

    

    );
}
 
export default Comment;