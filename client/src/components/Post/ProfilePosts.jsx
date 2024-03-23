/* Import react libbrary */
import React, {useEffect, useState} from "react";

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import { updateUserPosts } from '../../redux/Reducers/userReducer';
import { updateProfilePosts } from '../../redux/Reducers/postReducer';

/* Import components */
import Post from './Post.jsx';

const ProfilePosts = (props) => {
    /* States */
    const [isLoading, setIsLoading] = useState(false);

    /* Access states from redux store */
    const user = useSelector((state) => {
        return state.user.user;
    })
    const profileUser = useSelector((state) => {
        return state.post.profileUser;
    })
    const token = useSelector((state) => {
        return state.user.token;
    })
    const userPosts = useSelector((state) => {
        return state.user.userPosts;
    })
    const profilePosts = useSelector((state) => {
        return state.post.profilePosts;
    })

    /* Access actions from redux store */
    const dispatch = useDispatch();

    /* Load all the posts from the user */
    const getUserPosts = async() => {
        const userId = user?._id;
        setIsLoading(true);

        const url = `http://localhost:3001/posts/${userId}`;
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
            if (data.posts){
                /* Put all the loaded posts of the user in redux state */
                dispatch(updateUserPosts({userPosts: data.posts}));
                setIsLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    /* Load all the posts from the user */
    const getOtherUserPosts = async() => {
        const otherUserId = profileUser?._id;
        setIsLoading(true);

        const url = `http://localhost:3001/posts/${otherUserId}`;
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
            if (data.posts){
                /* Put all the loaded posts of the user in redux state */
                dispatch(updateProfilePosts({profilePosts: data.posts}));
                setIsLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        /* Load all the posts from the user in each rendering of webpage */
        if (props.isUser){
            getUserPosts();
        }
        else{
            getOtherUserPosts();
        }
    }, []);

    return ( 
        <div className="profile-post-container">
            {/* Get all the posts (user) */}
            {(user && userPosts && props.isUser) ? 
                userPosts.map((post, index)=> (
                    <Post key={index} postIndex={index} image={post?.postImgURL} title={post?.title} description={post?.description} date={post?.createdAt?.toString()?.slice(0, 10)} isUser={props.isUser}/>
                ))
            : null}

            {/* Get all the posts (other users) */}
            {(profileUser && profilePosts && !props.isUser) ? 
                profilePosts.map((post, index)=> (
                    <Post key={index} postIndex={index} image={post?.postImgURL} title={post?.title} description={post?.description} date={post?.createdAt?.toString()?.slice(0, 10)} isUser={props.isUser}/>
                ))
            : null}
        </div>
    );
}
 
export default ProfilePosts;