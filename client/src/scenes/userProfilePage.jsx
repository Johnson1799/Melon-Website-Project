/* Import react library */
import React, {useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import { setToggleImageModal, setToggleEditModal, setTogglePostModal } from "../redux/Reducers/modalReducer";
import { updateUser, updateUserPost, setToggleLargePost } from "../redux/Reducers/userReducer";
import { setProfilePosts, } from "../redux/Reducers/postReducer";

/* Import components */
import MainNavbar from "../components/Navbar/MainNavbar";
import ImageModal from "../components/Modal/ImageModal";
import EditModal from "../components/Modal/EditModal";
import PostModal from "../components/Modal/PostModal";
import AddFriendsModal from "../components/Modal/AddFriendsModal";
import ProfilePosts from "../components/Post/ProfilePosts";
import EditPostModal from "../components/Modal/EditPostModal";
import UserProfileFriend from "../components/Friend/UserProfileFriend";
import LargePost from "../components/Post/LargePost";
import Comments from "../components/Post/Comments/Comments";


const UserProfilePage = () => {
    /* Access states from redux store */
    const toggleImageModalState = useSelector((state) => {
        return state.modal.toggleImageModal;
    });
    const toggleEditModalState = useSelector((state) => {
        return state.modal.toggleEditModal;
    });
    const togglePostModalState = useSelector((state) => {
        return state.modal.togglePostModal;
    });
    const toggleEditPostModalState = useSelector((state)=>{
        return state.modal.toggleEditPostModal;
    })
    const toggleAddFriendsState = useSelector((state) => {
        return state.modal.toggleAddFriendsModal;
    });
    const toggleLargePost = useSelector((state) => {
        return state.user.toggleLargePost;
    })
    const largePost = useSelector((state)=>{
        return state.user.largePost;
    })
    const user = useSelector((state) => {
        return state.user.user;
    });
    const token = useSelector((state) => {
        return state.user.token;
    });

    /* Access actions from redux store */
    const dispatch = useDispatch();
    
    /* States */
    const [isLoading, setIsLoading] = useState(false);
    const [isPostButtonClicked, setIsPostButtonClicked] = useState(true);
    const [isVideoButtonClicked, setIsVideoButtonClicked] = useState(false);

    /* Navigation hook */
    const navigate = useNavigate();

    /* Handlers */
    const handleImageEditButtonClick  = (e) => {
        dispatch(setToggleImageModal());
    }
    const handlePersonalProfileButtonClick = (e) => {
        dispatch(setToggleEditModal());
    }
    const handleAddPostButtonClick  = (e) => {
        dispatch(setTogglePostModal());
    }

    const handlePostButtonClicked = (e) => {
        setIsPostButtonClicked(true);
        setIsVideoButtonClicked(false);
    }
    const handleVideoButtonClicked = (e) => {
        setIsPostButtonClicked(false);
        setIsVideoButtonClicked(true);
    }

    /* Fetch user data from server when routing to Profile page */
    const getUser = async() => {
        const url = `https://csci-3100-project.vercel.app/users/user/${userId}`;

        setIsLoading(true);
        await fetch(url, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${token}`
            },
        })
        .then((res)=>{
            if (!res.ok){
                throw new Error(`Get request in (${url}) failed`);
            }
            return res.json();
        })
        .then((data) =>{
            if (data.user){
                dispatch(updateUser({user: data.user}));
                setIsLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
            navigate("/");
        });
    };

    useEffect(() => {
        getUser();
        dispatch(setToggleLargePost(false));
    }, []);

    /* Initialize */
    const userId = user?._id; 


    /* Update the edited data to database */
    const handleDataReceivedFromChild = async (editedData) => {
        setIsLoading(true);

        /* Upload user avatar to Cloudinary database */
        if (editedData.userAvatarURL){
            const url = `https://csci-3100-project.vercel.app/users/user/update/avatar/${userId}`;
            const data = {
                image: editedData.userAvatarURL,
            }
            await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            })
            .then((res)=>{
                if(!res.ok){
                    throw new Error("Can't Access the Server");
                }
                return res.json();
            })
            .then((data)=>{
                /* Update userAvatarURL attribute in MongoDB */
                editedData =  {userAvatarURL: data.url};
            })
            .catch((err)=>{
                console.error('Error updating user avatar:', err);
            });

        } 

        /* Upload user post to Cloudinary database and create 'post' document in MongoDB */
        else if (editedData.postImgURL){
            const url = `https://csci-3100-project.vercel.app/posts/create/${userId}`;
            const data = {
                postImgURL: editedData.postImgURL, 
                title: editedData.title, 
                description: editedData.description,
                isPrivate: editedData.isPrivate,
            }
            await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            })
            .then((res)=>{
                if(!res.ok){
                    throw new Error("Can't Access the Server");
                }
                return res.json();
            })
            .then((data)=>{
                /* Update the redux state */
                dispatch(updateUserPost(data.post));
                
                /* Update 'posts' attribute to MongoDB */
                editedData = {posts: data.postURL};
            })
            .catch((err)=>{
                console.error('Error creating a post:', err);
            });
        }

        if (editedData.postId){
            /* Update 'post' schema in MongoDB */
            const url = `https://csci-3100-project.vercel.app/posts/update/${userId}`;
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editedData),
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Fail to Update post to Database');
                }
                return res.json();
            })
            .then((data) => {
                /* Update the redux state */
                console.log(data);
                dispatch(updateUserPost(data));

                /* Display toast */
                // toast.success(`Post has been successfully uploaded`, {
                //     style: {
                //         background: 'white',
                //         color: 'black',
                //     },
                // });
            })
            .catch((err) => {
                console.error('Error updating user data:', err);
            });
        } else {
            /* Update 'email', 'contact', 'address', 'description', 'userAvatarURL' and 'posts' attributes to 'user' schema in MongoDB */
            const url = `https://csci-3100-project.vercel.app/users/user/${userId}/update`;
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editedData),
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Fail to Update User Information to Database');
                }
                return res.json();
            })
            .then((updatedUserData) => {
                /* Update the redux state */
                dispatch(updateUser({user: updatedUserData}));

                /* Display toast */
                // toast.success(`Personal information has been successfully edited`, {
                //     style: {
                //         background: 'white',
                //         color: 'black',
                //     },

                //     duration: 4000,
                // });
            })
            .catch((err) => {
                console.error('Error updating user data:', err);
            });

        }
        setIsLoading(true);
        window.location.reload()
    }

    // const receivePostInfo = (post) => {
    //     console.log(post);
    // }

    return (
        <div>
            {/* Display the Navbar */}
            <MainNavbar />

            {/* Display the Spinner */}
            {isLoading && 
                (<div className="spinning-overlay">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>)
            }

            <div className="profile-container">

                {/* Display Larger post Info */}
                {toggleLargePost && 
                    (<div className="large-post-overlay">
                        <div className="large-post-grid" style={{left: largePost?.displayComments ? '15%': '35%' }}>
                            <LargePost isUser={true}/>
                        </div>

                        {/* Display the comment area */}
                        {largePost?.displayComments && 
                            (<div className="comment-grid">
                                <Comments isUser={true}/>
                            </div>)
                        }
                    </div>
                )}

                <div className="profile-grid-container">
                    <div className="profile-col-1">
                        <div className="info-container">
                        
                            <div className="avatar-info">
                                {/* Edit user avatar button */}
                                <button className="image-edit-button profile-page" onClick={handleImageEditButtonClick}><i className="fa-solid fa-pen"></i></button>
                                
                                {/* Display user avatar */}
                                <img src={user?.userAvatarURL} alt="" />
                            </div>

                            {/* Display User Information (userame and userNickname) */}
                            <div className="profile-user-info profile-page">
                                <p className="full-name">{user?.userName}</p>
                                <p className="nickname">{user?.userNickname}</p>
                            </div>

                            {/* Display User Information (no.of posts, no.of followers and no.of following) */}
                            <div className="profile-account-details">
                                <p className="title">Posts</p>
                                <p className="posts">{user?.posts.length}</p>
                                <p className="title">Followers</p>
                                <p className="followers">{user?.followers}</p>
                                <p className="title">Following</p>
                                <p className="following">{user?.friends.length}</p>
                            </div>
                        </div>

                        {/* Display User Information (email, contact, address and description) */}
                        <div className="personal-details-container" >
                            <button onClick={handlePersonalProfileButtonClick}><i className="fa-solid fa-user-pen"></i></button>
                            <div className="profile-personal-details">
                                <p><i className="fa-solid fa-envelope icon"></i>{user?.email}</p>
                                <p><i className="fa-solid fa-phone-volume icon"></i>{user?.contact}</p>
                                <p><i className="fa-solid fa-location-crosshairs icon"></i>{user?.address}</p>
                                <p><i className="fa-solid fa-comment-dots icon"></i>{user?.description}</p>
                            </div>
                        </div>

                        <UserProfileFriend user={user}/>

                        {/* Display 'image' modals when user click the edit avatar button */}
                        {(toggleImageModalState && user) && <ImageModal sendDataToParent={handleDataReceivedFromChild}/>}

                        {/* Display 'edit' modals when user click the edit user information button */}
                        {(toggleEditModalState && user) &&<EditModal user={user} sendDataToParent={handleDataReceivedFromChild}/>}

                        {/* Display 'addFriends' modals when user click the edit user information button */}
                        {(toggleAddFriendsState && user) && <AddFriendsModal user={user} sendDataToParent={handleDataReceivedFromChild} />}

                        {/* Display the user posts when user click the picture icon on the top right category */}
                        <button className={isPostButtonClicked ? "post-button clicked" : "post-button not-clicked"} onClick={handlePostButtonClicked}><i className="fa-regular fa-images"></i></button>
                        {(isPostButtonClicked) && <ProfilePosts isUser={true}/>}

                        {/* Display the user videos when user click the video icon on the top right category */}
                        <button className={isVideoButtonClicked ? "video-button clicked" : "video-button not-clicked"} onClick={handleVideoButtonClicked}><i className="fa-solid fa-film"></i></button>
                        
                        {/* Display 'Post' modals when user click the 'add post' icon on the top right corner */}
                        <button className="add-post-button" onClick={handleAddPostButtonClick}><i className="fa-solid fa-plus"></i></button>
                        {(togglePostModalState && user) && <PostModal sendDataToParent={handleDataReceivedFromChild}/>}

                        {/* Display 'EditPost' modals when user click the edit button in a specific post */}
                        {(toggleEditPostModalState && user) && <EditPostModal sendDataToParent={handleDataReceivedFromChild}/>}

                    </div>        
                </div>
            </div >
        </div>
    )
}

export default UserProfilePage;