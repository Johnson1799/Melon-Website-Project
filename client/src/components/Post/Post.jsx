/* Import react library */
import React, {useEffect, useState, useRef} from "react";
import { useParams } from 'react-router-dom';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import { removeLikePost, addLikePost, setPostIndex } from '../../redux/Reducers/postReducer';
import { addLikeUserPost, removeLikeUserPost, setUserPostIndex } from "../../redux/Reducers/userReducer";

/* Import components */
import ProfileDropdown from "./ProfileDropdown";

const Post = (props) => {
    /* Reference to a HTML tag */
    const dropdownRef = useRef(null);

    /* Access states from redux store */
    const userPost = useSelector((state) => {
        return state.user.userPosts[props.postIndex];
    })
    const profilePost = useSelector((state) => {
        return state.post.profilePosts[props.postIndex];
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
    const [toggleDropDownList, setToggleDropDownList] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    /* Handlers */
    const openDropdownList = (e) => {
        setToggleDropDownList(!toggleDropDownList);
        dispatch(setUserPostIndex(props.postIndex));
    }

    /* Check if the user have like the post*/
    const checkUserLikes = () => {
        let userIsLike;
        if (props.isUser){
            userIsLike = userPost.likes.includes(userId);
        } else {
            userIsLike = profilePost.likes.includes(userId);
        }
        setIsLiked(userIsLike);
    }

    useEffect(() => {
        checkUserLikes();
        
        /* Trigger toggle the dropdown when the mouse click outside the browser */
        function handleClickOutside(e) {
          if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setToggleDropDownList(false);
          }
        }
    
        /* Check the 'click' event is occured */
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, []);


    const toggleLike = async(e) => {
        const url = `http://localhost:3001/posts/like/${props.isUser ? userId : otherUserId}`;
        const data = {
            postIndex: props.postIndex,
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
                if (props.isUser){
                    dispatch(setUserPostIndex(props.postIndex));
                    dispatch(addLikeUserPost({userId: userId, postIndex: props.postIndex}))
                }
                else {
                    dispatch(setPostIndex(props.postIndex));
                    dispatch(addLikePost({userId: userId, postIndex: props.postIndex}));
                }
                setIsLiked(true);
                // likeButtonRef.current.className = 'fa-solid fa-heart like-icon liked';
            } else {
                /* Unlike the post and update to the redux state */
                if (props.isUser){
                    dispatch(setUserPostIndex(props.postIndex));
                    dispatch(removeLikeUserPost({userId: userId, postIndex: props.postIndex}))
                }
                else {
                    dispatch(setPostIndex(props.postIndex));
                    dispatch(removeLikePost({userId: userId, postIndex: props.postIndex}));
                }
                setIsLiked(false);
                // likeButtonRef.current.className = 'fa-regular fa-heart like-icon unliked';
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }



    const toggleComment = (e) => {

    }

    return ( 
        <div className="post-container" ref={dropdownRef}>
            {/* Display post image */}
            <img src={props.image} alt="This is post Img" className="post-image"/>

            {/* The list button in the post */}
            {props.isUser && <button className="list-button" onClick={openDropdownList}><i className="fa-solid fa-list-ul"></i></button>}

            {/* Display dropdown list if the list button in the post is clicked */}
            {toggleDropDownList && <ProfileDropdown postIndex={props.postIndex} setToggleDropDownList={openDropdownList}/>}

            {/* Display post information (e.g post title, post release date, post description) */}
            <div className="post-info">
                <span className="post-title">{props.title}</span>
                <span className="post-date">{props.date}</span>
            </div>
            <p className="post-content">{props.description}</p>

            {/* Display post information (e.g like button, comment button ) */}
            <div className="post-like-comment">
                <button className="post-like" onClick={toggleLike}><i className={`${isLiked? 'fa-solid':'fa-regular'} fa-heart like-icon ${isLiked ? 'liked':'unliked'}`} ></i><p className="no-of-likes">{props.isUser ? userPost?.likes?.length : profilePost?.likes?.length }</p></button>
                <button className="post-comment" onClick={toggleComment}><i className="fa-regular fa-comment comment-icon"></i><p className="no-of-comment">2</p></button>
            </div>
        </div>
    );
}
 
export default Post;