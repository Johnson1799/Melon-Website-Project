/* Import react library */
import React, {useEffect, useState, useRef} from "react";
import { useParams } from 'react-router-dom';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import { updateGuestLargePostComments } from '../../../redux/Reducers/postReducer';
import { updateLargePostComments } from "../../../redux/Reducers/userReducer";

/* Import components */
import Reply from "./Reply";


const Replies = (props) => {

    /* Access states from redux store */
    const largePost = useSelector((state) => {
        return state.user.largePost;
    })
    const guestLargePost = useSelector((state) => {
        return state.post.guestLargePost;
    })
    const userPost = useSelector((state) => {
        return state.user.userPosts[largePost?.postIndex];
    })
    const profilePost = useSelector((state) => {
        return state.post.profilePosts[guestLargePost?.postIndex];
    })
    const userId = useSelector((state) => {
        return state.user.user?._id;
    })
    // const otherUserId = useSelector((state) => {
    //     return state.post.profileUser?._id;
    // })
    const user = useSelector((state) => {
        return state.user.user;
    })
    const token = useSelector((state) => {
        return state.user.token;
    })

    const dispatch = useDispatch();
    const isUser = props.isUser

    /* States */
    const [reply, setReply] = useState('');
    const [toggleReplyTextArea, setToggleReplyTextArea] = useState(props.toggleReplyTextArea);

    /* Handlers */
    const handleReplyChange = (e) => {
        setReply(e.target.value);
    }

    const submitReply = async(e) => {
        e.preventDefault();

        const url = `http://localhost:3001/posts/reply/${userId}/${isUser? userPost?._id : profilePost?._id}`;
        const data = {
            commentIndex: props.commentIndex,
            reply: reply,
        }
        await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
        .then((res)=>{
            if (!res.ok){
                throw new Error(`Post request in (${url}) failed`);
            }
            return res.json();
        })
        .then((data) => {
            if (isUser){
                dispatch(updateLargePostComments(data));
            } else{
                dispatch(updateGuestLargePostComments(data));
            }

        })
        .catch((err) => {
            console.log(err);
        });

        /* Close the reply textarea */
        setToggleReplyTextArea(true);

        /* Clear the text in textfield */
        setReply("");
    }

    return ( 
        <>
            <div className="replies-container" >
                <form>
                    <div className="comment-textarea smaller" >
                        <img src={`${user?.userAvatarURL}`} alt="" className="smaller"/>

                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a reply here" id="floatingTextarea2" style={{height: '60px', width: '345px'}} value={reply} onChange={handleReplyChange}></textarea>
                            <label htmlFor="floatingTextarea2 smaller">Reply</label>
                            <button className="submit-button smaller" onClick={submitReply}>Submit</button>
                        </div>
                    </div>
                </form>
            

                <div className="replies" >
                    {(isUser && largePost) && largePost?.comments[props.commentIndex].replies ? 
                        (largePost?.comments[props.commentIndex].replies.map((reply,index) => (
                            <Reply key={index} userId={reply.userId} userAvatarURL={reply.userAvatarURL} userName={reply.userName} reply={reply.reply} isUser={true} />
                        )))
                    : null}

                    {(!isUser && guestLargePost) && guestLargePost?.comments[props.commentIndex].replies ? 
                        (guestLargePost?.comments[props.commentIndex].replies.map((reply,index) => (
                            <Reply key={index} userId={reply.userId} userAvatarURL={reply.userAvatarURL} userName={reply.userName} reply={reply.reply} isUser={false} />
                        )))
                    : null}
                </div>
            </div>
        </>
    );
}
 
export default Replies;