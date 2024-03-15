import React, {useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

/* Import redux stuff */
import { useSelector, useDispatch } from "react-redux";
import { setToggleImageModal, setToggleEditModal, setUserAvatar } from "../redux/modalReducer";

/* Import components */
import MainNavbar from "components/MainNavbar";
import ImageModal from "components/ImageModal";
import EditModal from "components/EditModal";
import MainBackgroundDesign from "components/MainBackgroundDesign";


const ProfilePage = () => {
    /* Access states from redux store */
    const toggleImageModalState = useSelector((state) => {
        return state.modal.toggleImageModal;
    });
    const toggleEditModalState = useSelector((state) => {
        return state.modal.toggleEditModal;
    });

    const token = useSelector((state) => {
        return state.user.token;
    });

    /* Access action from redux store */
    const dispatch = useDispatch();

    /* States */
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {userId} = useParams();

    /* Handler */
    const handleImageEditButtonClick  = (e) => {
        dispatch(setToggleImageModal());
    }

    const handlePersonalProfileButtonClick = (e) => {
        dispatch(setToggleEditModal());
    }

    /* Fetch user data from server */
    const getUser = () => {
        const fetchUserIdUrl = `http://localhost:3001/users/user/${userId}`;

        setIsLoading(true);
        fetch(fetchUserIdUrl, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res)=>{
            if (!res.ok){
                throw new Error(`Get request in (${fetchUserIdUrl}) failed`);
            }
            return res.json();
        })
        .then((data) =>{
            if (data.user){
                setUser(data.user);
                setIsLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };
    useEffect(() => {
        getUser();
    }, []);

    /* Update the edited data to database */
    const handleDataReceivedFromChild = async (editedData) => {
        if (editedData.userAvatarURL){
            setIsLoading(true);

            /* Upload user avatar to Cloudinary database */
            const url = `http://localhost:3001/users/user/update/avatar/${userId}`;
            await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ image: editedData.userAvatarURL }),
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
                setIsLoading(false);
            })
            .catch((err)=>{
                console.error('Error updating user avatar:', err);
            });
        }
        /* Update 'email', 'contact', 'address' and 'description' attributes or 'userAvatarURL' attribute in MongoDB */
        setIsLoading(true);
        const url = `http://localhost:3001/users/user/${userId}/update`;
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
            setUser(updatedUserData);
        })
        .catch((err) => {
            console.error('Error updating user data:', err);
        });
        
    }
    

    return (
        <div>
            <MainNavbar />
            <div className="profile-container">
                <div className="profile-grid-container">
                    {/* Edit user avatar button */}
                    <div className="profile-col-1">
                        
                        <div className="info-container">
                            {/* Edit User Avatar  */}
                            <div className="avatar-info">
                                <button className="image-edit-button" onClick={handleImageEditButtonClick}><i className="fa-solid fa-pen"></i></button>
                                <img src={user?.userAvatarURL} alt="" />
                            </div>

                            {/* Edit User Information  */}
                            <div className="profile-user-info">
                                <p className="full-name">{user?.userName}</p>
                                <p className="nickname">{user?.userNickname}</p>
                            </div>

                            {/* Posts and Followers Information  */}
                            <div className="profile-account-details">
                                <p className="title">Posts</p>
                                <p className="posts">{user?.posts.length}</p>
                                <p className="title">Followers</p>
                                <p className="followers">{user?.followers}</p>
                                <p className="title">Following</p>
                                <p className="following">{user?.friends.length}</p>
                            </div>
                        </div>

                        <div className="personal-details-container">
                            <button onClick={handlePersonalProfileButtonClick}><i className="fa-solid fa-user-pen"></i></button>
                            <div className="profile-personal-details">
                                <p><i className="fa-solid fa-envelope icon"></i>{user?.email}</p>
                                <p><i className="fa-solid fa-phone-volume icon"></i>{user?.contact}</p>
                                <p><i className="fa-solid fa-location-crosshairs icon"></i>{user?.address}</p>
                                <p><i className="fa-solid fa-comment-dots icon"></i>{user?.description}</p>
                            </div>
                        </div>

                        {/* Display modals */}
                        {(toggleImageModalState && user) && <ImageModal sendDataToParent={handleDataReceivedFromChild}/>}
                        {(toggleEditModalState && user) &&<EditModal user={user} sendDataToParent={handleDataReceivedFromChild}/>}

                        {/* Background Design */}
                        {/* <MainBackgroundDesign /> */}

                    </div>
                </div>
            </div >
        </div>
    )
}

export default ProfilePage;