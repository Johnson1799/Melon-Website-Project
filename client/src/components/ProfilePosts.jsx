/* Import react stuff */
import React, {useEffect, useState} from "react";

/* Import redux stuff */
import { useSelector, useDispatch } from "react-redux";
import { updateUserPosts } from '../redux/userReducer';

/* Import components */
import Post from './Post.jsx';

const ProfilePosts = () => {
    /* States */
    const [isLoading, setIsLoading] = useState(false);

    /* redux state */
    const user = useSelector((state) => {
        return state.user.user;
    })
    const token = useSelector((state) => {
        return state.user.token;
    })
    const userPosts = useSelector((state) => {
        return state.user.userPosts;
    })

    /* Access action from redux store */
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
                dispatch(updateUserPosts({userPosts: data.posts}));
                setIsLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
    useEffect(() => {
        getUserPosts();
    }, []);

    return ( 
        <div className="profile-post-container">
            {(user && userPosts) ? 
                userPosts.map((post, index)=> (
                    <Post key={index} postIndex={index} image={post?.postImgURL} title={post?.title} description={post?.description} date={post?.createdAt?.toString()?.slice(0, 10)}/>
                ))
            : null}
        </div>
    );
}
 
export default ProfilePosts;