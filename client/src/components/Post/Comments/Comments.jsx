/* Import react library */
import React, {useEffect, useState, useRef} from "react";
import { useParams } from 'react-router-dom';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import { updateGuestLargePostComments, } from '../../../redux/Reducers/postReducer';
import { updateLargePostComments, } from "../../../redux/Reducers/userReducer";

/* Import component */
import Comment from './Comment';


const Comments = (props) => {
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
    const isUser = props.isUser;

    /* States */
    const [comment, setComment] = useState('');

    /* Handlers */

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    const submitComment = async(e) => {
        e.preventDefault();

        const url = `https://melon-web-project.vercel.app/posts/comment/${userId}/${isUser? userPost?._id : profilePost?._id}`;
        const data = {
            comment: comment,
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
            }
            else{
                dispatch(updateGuestLargePostComments(data));
            }
        })
        .catch((err) => {
            console.log(err);
        });

        /* Clear the text in textfield */
        setComment("");

    }

    return ( 
        <div className="comments-container">
            {/* User comment textarea */}
            <form>
                <div className="comment-textarea">
                    <img src={`${user?.userAvatarURL}`} alt="" />

                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: '120px', width: '370px'}} value={comment} onChange={handleCommentChange}></textarea>
                        <label htmlFor="floatingTextarea2">Comments</label>
                        <button className="submit-button" onClick={submitComment}>Submit</button>
                    </div>
                </div>
            </form>
            
            <div className="comments">
                {(isUser && largePost) && largePost?.comments ? 
                    (largePost?.comments.map((comment,index) => (
                        <Comment key={index} commentIndex={index} userId={comment._id} userAvatarURL={comment.userAvatarURL} userName={comment.userName} comment={comment.comment} isUser={true}/>
                    )))
                : null}

                {(!isUser && guestLargePost) && guestLargePost?.comments ? 
                    (guestLargePost?.comments.map((comment,index) => (
                        <Comment key={index} commentIndex={index} userId={comment._id} userAvatarURL={comment.userAvatarURL} userName={comment.userName} comment={comment.comment} isUser={false}/>
                    )))
                : null}
            </div>

        </div>

    );
}
 
export default Comments;