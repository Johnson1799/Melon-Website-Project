/* Import react libbrary */
import React, {useEffect, useState} from "react";

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import { updateUserPosts } from '../../redux/Reducers/userReducer';

/* Import components */
import Post from './Post.jsx';

const ProfilePosts = () => {
    /* States */
    const [isLoading, setIsLoading] = useState(false);

    /* Access states from redux store */
    const user = useSelector((state) => {
        return state.user.user;
    })
    const token = useSelector((state) => {
        return state.user.token;
    })
    const userPosts = useSelector((state) => {
        return state.user.userPosts;
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
    useEffect(() => {
        /* Load all the posts from the user in each rendering of webpage */
        getUserPosts();
    }, []);

    return ( 
        <div className="profile-post-container">
            {/* Create all the posts from the user */}
            {(user && userPosts) ? 
                userPosts.map((post, index)=> (
                    <Post key={index} postIndex={index} image={post?.postImgURL} title={post?.title} description={post?.description} date={post?.createdAt?.toString()?.slice(0, 10)}/>
                ))
            : null}
        </div>
    );
}
 
export default ProfilePosts;