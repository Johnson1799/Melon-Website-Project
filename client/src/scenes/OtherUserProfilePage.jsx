/* Import react library */
import React, {useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import { setProfilePosts, setProfileUser,  } from "../redux/Reducers/postReducer";
import { updateUser } from "../redux/Reducers/userReducer";

/* Import components */
import MainNavbar from "../components/Navbar/MainNavbar";
import ProfilePosts from "../components/Post/ProfilePosts";
import LargePost from "../components/Post/LargePost";
import Comments from "../components/Post/Comments/Comments";




const OtherUserProfilePage = () => {
    /* Access states from redux store */ 
    const profileUser = useSelector((state) => {
        return state.post.profileUser;
    });
    const toggleGuestLargePost = useSelector((state) => {
        return state.post.toggleGuestLargePost
    });
    const guestLargePost = useSelector((state) => {
        return state.post.guestLargePost
    });
    const user = useSelector((state) => {
        return state.user.user;
    });
    const token = useSelector((state) => {
        return state.user.token;
    });

    /* Access actions from redux store */
    const dispatch = useDispatch();

    /* States */
    const [isPostButtonClicked, setIsPostButtonClicked] = useState(true);
    const [isVideoButtonClicked, setIsVideoButtonClicked] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const [disableFollowButton, setDisableFollowButton] = useState(false);
    const [followText, setFollowText] = useState('');

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
        const url = `http://csci-3100-project.vercel.app/posts/${profileUser?._id}`;
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

    const checkIsFriend = async() => {
        await user?.friends.forEach(friend => {
            if (friend._id === profileUser?._id){
                setIsFriend(true);
            }
        })
    }

    const checkIsRequestSent = () => {
        const isRequestSent = profileUser?.friendRequests?.includes(user?._id);
        if (isRequestSent){
            setFollowText("Request Sent");
            setDisableFollowButton(true);
        }
        else{
            setFollowText("Follow");
            setDisableFollowButton(false);
        }
    }

    useEffect(() => {
        getProfilePosts();
        checkIsFriend();
        checkIsRequestSent();
    },[])


    const sendingFriendRequest = async() => {
        const url = `http://csci-3100-project.vercel.app/friends/send/request/${user?._id}/${profileUser?._id}`;
        await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Fail to send friend request ');
            }
            return res.json();
        })
        .then((data) => {
            dispatch(setProfileUser(data.profileUser));
            setFollowText('Request Sent');
            setDisableFollowButton(true);
        })
        .catch((err) => {
            console.error('Error updating user data:', err);
        });

    }


    const unfollowUser = async() => {
        const url = `http://csci-3100-project.vercel.app/friends/remove/${user?._id}/${profileUser?._id}`;
        await fetch(url, {
            method: "POST",
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
            dispatch(updateUser({user:data.user}));
            dispatch(setProfileUser(data.profileUser));
            setIsFriend(false);
            console.log("You unfollow this user");
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (  
        <div>
            {/* Display the Navbar */}
            <MainNavbar />
            {toggleGuestLargePost && 
                (<div className="large-post-overlay">
                    <div className="large-post-grid" style={{left: guestLargePost?.displayComments ? '15%': '35%' }}>
                        <LargePost isUser={false}/>
                    </div>

                    {/* Display the comment area */}
                    {guestLargePost?.displayComments && 
                        (<div className="comment-grid">
                            <Comments isUser={false}/>
                        </div>)
                    }
                </div>
            )}
            <div className="other-profile-container">
            <div className="profile-grid-container">
                    <div className="profile-col-1">
                        <div className="info-container larger">
                        
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
                                <p className="posts">{profileUser?.posts?.length}</p>
                                <p className="title">Followers</p>
                                <p className="followers">{profileUser?.followers}</p>
                                <p className="title">Following</p>
                                <p className="following">{profileUser?.friends?.length}</p>
                            </div>

                            {!isFriend && <button className={`follow-button ${followText}`} onClick={sendingFriendRequest} disabled={disableFollowButton}>{followText}</button>}
                            {isFriend && <button className="unfollow-button" onClick={unfollowUser}>Unfollow<i className="fa-solid fa-user-xmark"></i></button>}
                        </div>

                        {/* Display User Information (email, contact, address and description) */}
                        <div className="personal-details-container smaller">
                            <div className="profile-personal-details smaller">
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
 
export default OtherUserProfilePage;