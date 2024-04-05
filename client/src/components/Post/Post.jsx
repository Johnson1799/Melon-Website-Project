/* Import react library */
import React, {useEffect, useState, useRef} from "react";
import { useParams } from 'react-router-dom';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import { removeLikePost, addLikePost, setPostIndex, setGuestLargePost, setToggleGuestLargePost, setGuestLargePostIsLiked } from '../../redux/Reducers/postReducer';
import { addLikeUserPost, removeLikeUserPost, setUserPostIndex, setToggleLargePost, setLargePost, setLargePostIsLiked } from "../../redux/Reducers/userReducer";

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
    const largePost = useSelector((state) => {
        return state.user.largePost;
    })
    const guestLargePost = useSelector((state) => {
        return state.post.guestLargePost;
    })
    // const toggleLargePost = useSelector((state) =>{
    //     return state.post.toggleLargePost;
    // })

    const dispatch = useDispatch();

    /* States */
    const [toggleDropDownList, setToggleDropDownList] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    /* Handlers */
    const openDropdownList = (e) => {
        setToggleDropDownList(!toggleDropDownList);
        dispatch(setToggleLargePost(false));
        dispatch(setUserPostIndex(props.postIndex));
    }

    /* Check if the user have like the post*/
    const checkUserLikes = () => {
        let userIsLike;
        if (props.isUser){
            userIsLike = userPost?.likes?.includes(userId);
        } else {
            userIsLike = profilePost?.likes?.includes(userId);
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

        function handleClickPost(e) {
            if (dropdownRef.current && dropdownRef.current.contains(e.target)) {
                /* Display the Large Post */
                if (props.isUser){
                    /* Display user large post */
                    dispatch(setToggleLargePost(true));
                    dispatch(setToggleGuestLargePost(false));
                }
                else{
                    /* Display other user large post */
                    dispatch(setToggleLargePost(false));
                    dispatch(setToggleGuestLargePost(true));
                }
                
            }
        }

    
        /* Check the 'click' event is occured */
        document.addEventListener('click', handleClickOutside);
        dropdownRef.current.addEventListener('click', handleClickPost);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, [props.isUser? largePost?.isLiked : guestLargePost?.isLiked]);
    


    const toggleLike = async(e) => {
        /* Do not display the large post when clicking the like button */
        dispatch(setToggleLargePost(false));
        dispatch(setToggleGuestLargePost(false));

        const url = `https://csci-3100-project.vercel.app/posts/like/${props.isUser ? userId : otherUserId}`;
        const data = {
            postIndex: props.postIndex,
            userId: userId,
            isHomePage: false,
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
                    /* User post */
                    dispatch(setUserPostIndex(props.postIndex));
                    dispatch(addLikeUserPost({userId: userId, postIndex: props.postIndex}));
                    dispatch(setLargePostIsLiked(true));
                }
                else {
                    /* Other user post */
                    dispatch(setPostIndex(props.postIndex));
                    dispatch(addLikePost({userId: userId, postIndex: props.postIndex}));
                    dispatch(setGuestLargePostIsLiked(true));
                }
                setIsLiked(true);
            } else {
                /* Unlike the post and update to the redux state */
                if (props.isUser){
                    /* User post */
                    dispatch(setUserPostIndex(props.postIndex));
                    dispatch(removeLikeUserPost({userId: userId, postIndex: props.postIndex}));
                    dispatch(setLargePostIsLiked(false));
                }
                else {
                    /* Other user post */
                    dispatch(setPostIndex(props.postIndex));
                    dispatch(removeLikePost({userId: userId, postIndex: props.postIndex}));
                    dispatch(setGuestLargePostIsLiked(false));
                }
                setIsLiked(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const displayLargePost = async() => {
        let comments = null;

        /* Fetch the comments adn replies in the post */
        const url = `https://csci-3100-project.vercel.app/posts/comment/${props.isUser? userPost?._id : profilePost?._id}`;
        await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res)=>{
            if (!res.ok){
                throw new Error(`Get request in (${url}) failed`);
            }
            return res.json();
        })
        .then((data) =>{
            comments = data;
        })
        .catch((err) => {
            console.log(err);
        });


        /* Set the Large Post Information */
        const largePostData = {
            postIndex: props.postIndex,
            image: props.image,
            title: props.title,
            date: props.date,
            description: props.description, 
            likes: props.isUser ? userPost?.likes?.length : profilePost?.likes?.length,
            isLiked: isLiked,
            comments: comments,
            displayComments: false,
            isUser: props.isUser,
            isHomePageLargePost: false,

        }

        /* Update redux state */
        if(props.isUser){
            /* User */
            dispatch(setUserPostIndex(props.postIndex));
            dispatch(setLargePost(largePostData));
            dispatch(setGuestLargePost(null));
        }
        else {
            /* Guest */
            dispatch(setPostIndex(props.postIndex));
            dispatch(setLargePost(null));
            dispatch(setGuestLargePost(largePostData));
        }
        
    }

    return ( 
        <div className="post-container" ref={dropdownRef} onClick={displayLargePost}>
            
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
                <button className="post-like" onClick={toggleLike}><i className={`${(isLiked)? 'fa-solid':'fa-regular'} fa-heart like-icon ${(isLiked) ? 'liked':'unliked'}`} ></i><p className="no-of-likes">{props.isUser ? userPost?.likes?.length : profilePost?.likes?.length }</p></button>
                <button className="post-comment"><i className="fa-regular fa-comment comment-icon"></i><p className="no-of-comment">{props.isUser? userPost?.comments?.length: profilePost?.comments?.length }</p></button>
            </div>
        </div>
    );
}
 
export default Post;