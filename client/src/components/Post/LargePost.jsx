/* Import react library */
import React, {useEffect, useState, useRef} from "react";
import { useParams } from 'react-router-dom';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import { removeLikePost, addLikePost, setPostIndex, setToggleLargePost, setLargePostIsLiked, setLargePost } from '../../redux/Reducers/postReducer';
import { addLikeUserPost, removeLikeUserPost, setUserPostIndex } from "../../redux/Reducers/userReducer";


const LargePost = () => {
    /* Reference to a HTML tag */
    const largePostRef = useRef(null);

    /* Access states from redux store */
    const largePost = useSelector((state) => {
        return state.post.largePost;
    })
    const userPost = useSelector((state) => {
        return state.user.userPosts[largePost?.postIndex];
    })
    const profilePost = useSelector((state) => {
        return state.post.profilePosts[largePost?.postIndex];
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

    /* States */
    const [isLiked, setIsLiked] = useState(largePost?.isLiked);

    /* Handlers */

    /* Check if the user have like the post*/
    const checkUserLikes = () => {
        let userIsLike;
        if (largePost?.isUser){
            userIsLike = userPost?.likes?.includes(userId);
        } else {
            userIsLike = profilePost?.likes?.includes(userId);
        }
        setIsLiked(userIsLike);
    }

    useEffect(() => {
        checkUserLikes();

    }, [largePost?.isLiked]);


    const toggleLike = async(e) => {
        const url = `http://localhost:3001/posts/like/${largePost?.isUser ? userId : otherUserId}`;
        const data = {
            postIndex: largePost?.postIndex,
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
                if (largePost?.isUser){
                    dispatch(setUserPostIndex(largePost?.postIndex));
                    dispatch(addLikeUserPost({userId: userId, postIndex: largePost?.postIndex}))
                }
                else {
                    dispatch(setPostIndex(largePost?.postIndex));
                    dispatch(addLikePost({userId: userId, postIndex: largePost?.postIndex}));
                }
                dispatch(setLargePostIsLiked(true));
            } else {
                /* Unlike the post and update to the redux state */
                if (largePost?.isUser){
                    dispatch(setUserPostIndex(largePost?.postIndex));
                    dispatch(removeLikeUserPost({userId: userId, postIndex: largePost?.postIndex}))
                }
                else {
                    dispatch(setPostIndex(largePost?.postIndex));
                    dispatch(removeLikePost({userId: userId, postIndex: largePost?.postIndex}));
                }
                dispatch(setLargePostIsLiked(false));
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }



    const toggleComment = (e) => {
        
    }

    const closeLargePost = (e) => {
        dispatch(setLargePost(null));
        dispatch(setToggleLargePost(false));
    }

    return ( 

        <div className="post-container large" ref={largePostRef}>
            {!largePost?.isHomePageLargePost && <button className="large-post-close-button" onClick={closeLargePost}><i className="fa-solid fa-xmark"></i></button>}    
            <img src={largePost?.image} alt="This is post Img" className="post-image large"/>


            <div className="post-info">
                <span className="post-title large">{largePost?.title}</span>
                <span className="post-date">{largePost?.date}</span>
            </div>
            <p className="post-content large">{largePost?.description}</p>

            <div className="post-like-comment large">
                <button className="post-like" onClick={toggleLike}><i className={`${isLiked? 'fa-solid':'fa-regular'} fa-heart like-icon ${isLiked? 'liked':'unliked'}`} ></i><p className="no-of-likes">{largePost?.isUser ? userPost?.likes?.length : profilePost?.likes?.length }</p></button>
                <button className="post-comment" onClick={toggleComment}><i className="fa-regular fa-comment comment-icon"></i><p className="no-of-comment">2</p></button>
            </div>

        </div>

    );
}
 
export default LargePost;