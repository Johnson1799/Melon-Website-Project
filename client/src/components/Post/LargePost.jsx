/* Import react library */
import React, {useEffect, useState, useRef} from "react";
import { useParams } from 'react-router-dom';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import { removeLikePost, addLikePost, setPostIndex, setGuestLargePost, setToggleGuestLargePost, setGuestLargePostIsLiked, setToggleGuestComments } from '../../redux/Reducers/postReducer';
import { addLikeUserPost, removeLikeUserPost, setUserPostIndex, setToggleLargePost, setLargePostIsLiked, setLargePost, setToggleComments } from "../../redux/Reducers/userReducer";

const LargePost = (props) => {
    /* Access states from redux store */

    // User large post 
    const largePost = useSelector((state) => {
        return state.user.largePost;
    })
    // Other user large post 
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
    const otherUserId = useSelector((state) => {
        return state.post.profileUser?._id;
    })
    const token = useSelector((state) => {
        return state.user.token;
    })


    const dispatch = useDispatch();

    const isUser = props.isUser;

    /* States */
    const [isLiked, setIsLiked] = useState(largePost? largePost?.isLiked : guestLargePost?.isLiked);

    /* Handlers */

    /* Check if the user have like the post*/
    const checkUserLikes = () => {
        let userIsLike;
        if (largePost){
            userIsLike = userPost?.likes?.includes(userId);
        } else {
            userIsLike = profilePost?.likes?.includes(userId);
        }
        setIsLiked(userIsLike);
    }

    useEffect(() => {
        checkUserLikes();

    }, [isUser? largePost?.isLiked : guestLargePost?.isLiked]);


    const toggleLike = async(e) => {
        const url = `http://localhost:3001/posts/like/${isUser ? userId : otherUserId}`;
        const data = {
            postIndex: isUser ? largePost?.postIndex : guestLargePost?.postIndex,
            userId: userId,
        };

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
                throw new Error(`Get request in (${url}) failed`);
            }
            return res.json();
        })
        .then((data) =>{
            if (!data.isLiked){
                /* Like the post and update to the redux state */
                if (isUser){
                    /* User large post */
                    dispatch(setUserPostIndex(largePost?.postIndex));
                    dispatch(addLikeUserPost({userId: userId, postIndex: largePost?.postIndex}));
                    dispatch(setLargePostIsLiked(true));
                }
                else {
                    /* Other user large post */
                    dispatch(setPostIndex(guestLargePost?.postIndex));
                    dispatch(addLikePost({userId: userId, postIndex: guestLargePost?.postIndex}));
                    dispatch(setGuestLargePostIsLiked(true));
                }
            } else {
                /* Unlike the post and update to the redux state */
                if (isUser){
                    /* User large post */
                    dispatch(setUserPostIndex(largePost?.postIndex));
                    dispatch(removeLikeUserPost({userId: userId, postIndex: largePost?.postIndex}));
                    dispatch(setLargePostIsLiked(false));
                }
                else {
                    /* Other user large post */
                    dispatch(setPostIndex(guestLargePost?.postIndex));
                    dispatch(removeLikePost({userId: userId, postIndex: guestLargePost?.postIndex}));
                    dispatch(setGuestLargePostIsLiked(false));
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }



    const displayComments = (e) => {
        if (isUser){
            dispatch(setToggleComments());
        }
        else{
            dispatch(setToggleGuestComments());
        }
        
    }

    const closeLargePost = (e) => {
        if (isUser){
            /* Clost the user large post */
            dispatch(setLargePost(null));
            dispatch(setToggleLargePost(false));
        } else{
            /* Clost the other user large post */
            dispatch(setGuestLargePost(null));
            dispatch(setToggleGuestLargePost(false));
        }
        
    }

    return ( 
            <div className="post-container large" >
                {/* Close large post button */}
                {!largePost?.isHomePageLargePost && <button className="large-post-close-button" onClick={closeLargePost}><i className="fa-solid fa-xmark"></i></button>}    
                
                {/* Large post content */}
                <img src={isUser? largePost?.image : guestLargePost?.image} alt="This is post Img" className="post-image large"/>
                <div className="post-info">
                    <span className="post-title large">{isUser? largePost?.title : guestLargePost?.title}</span>
                    <span className="post-date">{isUser? largePost?.date : guestLargePost?.date}</span>
                </div>
                <p className="post-content large">{isUser? largePost?.description : guestLargePost?.description}</p>

                <div className="post-like-comment large">
                    <button className="post-like" onClick={toggleLike}><i className={`${isLiked? 'fa-solid':'fa-regular'} fa-heart like-icon ${isLiked? 'liked':'unliked'}`} ></i><p className="no-of-likes">{isUser ? userPost?.likes?.length : profilePost?.likes?.length }</p></button>
                    <button className="post-comment" onClick={displayComments}><i className="fa-regular fa-comment comment-icon"></i><p className="no-of-comment">{isUser? largePost?.comments?.length : guestLargePost?.comments?.length}</p></button>
                </div>
            </div>
    );
}
 
export default LargePost;