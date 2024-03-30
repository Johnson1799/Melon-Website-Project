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


const Reply = (props) => {

    const dispatch = useDispatch();

    /* States */
    const [toggleReplyTextArea, setToggleReplyTextArea] = useState(false);

    /* Handlers */
    // const handleReply = () => {
    //     setToggleReplyTextArea(true);
    // }

    return ( 
        <div className="reply-container-with-reply smaller">
            <div className="comment-container smaller">
                <img className='user-avatar smaller' src={`${props.userAvatarURL}`} alt="" />
                <div className="comment-contents smaller">
                    <span className="username smaller">{props.userName}</span>
                    <p className="comment-text smaller">{props.reply}</p>
                </div>
                {/* <button className="reply-button smaller" onClick={handleReply}><i className="fa-solid fa-reply"></i></button> */}
                
            </div>

            {toggleReplyTextArea && <Replies commentIndex={props.commentIndex} isUser={props.isUser}/> }

        </div>

    

    );
}
 
export default Reply;