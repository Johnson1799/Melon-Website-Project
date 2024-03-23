/* Import react library */
import React, {useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import components */
import MainNavbar from "../components/Navbar/MainNavbar";
import ProfilePosts from "../components/Post/ProfilePosts";
import { setProfileUser, setProfilePosts } from "../redux/Reducers/postReducer";


const FriendProfile = () => {
    /* Access states from redux store */ 
    const profileUser = useSelector((state) => {
        return state.post.profileUser;
    });
    const token = useSelector((state) => {
        return state.user.token;
    });

    /* Access actions from redux store */
    const dispatch = useDispatch();

    /* States */
    const [isPostButtonClicked, setIsPostButtonClicked] = useState(true);
    const [isVideoButtonClicked, setIsVideoButtonClicked] = useState(false);

    /* Navigation hook */
    const navigate = useNavigate();

    /* Handlers */
    const handlePostButtonClicked = (e) => {
        setIsPostButtonClicked(true);
        setIsVideoButtonClicked(false);
    }
    const handleVideoButtonClicked = (e) => {
        setIsPostButtonClicked(false);
        setIsVideoButtonClicked(true);
    }


    const getProfilePosts = async () => {
        const url = `http://localhost:3001/posts/${profileUser?._id}`;

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
                dispatch(setProfilePosts(data.posts));
            }
        })
        .catch((err) => {
            console.log(err);
            navigate("/");
        });
    }

    useEffect(() => {
        getProfilePosts();
    },[])
    
    return (  
        <div>
            {/* Display the Navbar */}
            <MainNavbar />
            <div className="other-profile-container">
            <div className="profile-grid-container">
                    <div className="profile-col-1">
                        <div className="info-container">
                        
                            <div className="avatar-info">
                                {/* Display user avatar */}
                                <img src={profileUser?.userAvatarURL} alt="" />
                            </div>

                            {/* Display User Information (userame and userNickname) */}
                            <div className="profile-user-info">
                                <p className="full-name">{profileUser?.userName}</p>
                                <p className="nickname">{profileUser?.userNickname}</p>
                            </div>

                            {/* Display User Information (no.of posts, no.of followers and no.of following) */}
                            <div className="profile-account-details">
                                <p className="title">Posts</p>
                                <p className="posts">{profileUser?.posts.length}</p>
                                <p className="title">Followers</p>
                                <p className="followers">{profileUser?.followers}</p>
                                <p className="title">Following</p>
                                <p className="following">{profileUser?.friends.length}</p>
                            </div>
                        </div>

                        {/* Display User Information (email, contact, address and description) */}
                        <div className="personal-details-container" >
                            <div className="profile-personal-details">
                                <p><i className="fa-solid fa-phone-volume icon"></i>{profileUser?.contact}</p>
                                <p><i className="fa-solid fa-location-crosshairs icon"></i>{profileUser?.address}</p>
                                <p><i className="fa-solid fa-comment-dots icon"></i>{profileUser?.description}</p>
                            </div>
                        </div>

                        {/* Display the other user posts when user click the picture icon on the top right category */}
                        <button className={isPostButtonClicked ? "post-button clicked" : "post-button not-clicked"} onClick={handlePostButtonClicked}><i className="fa-regular fa-images"></i></button>
                        {(isPostButtonClicked) && <ProfilePosts isUser={false}/>}

                        {/* Display the other user videos when user click the video icon on the top right category */}
                        <button className={isVideoButtonClicked ? "video-button clicked" : "video-button not-clicked"} onClick={handleVideoButtonClicked}><i className="fa-solid fa-film"></i></button>
                        
                    </div>        
                </div>
            </div >
        </div>
    );
}
 
export default FriendProfile;