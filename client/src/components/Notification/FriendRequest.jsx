/* Import react library */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

import { setProfileUser } from '../../redux/Reducers/postReducer';
import { setCountFriendRequests } from '../../redux/Reducers/notificationReducer';

const FriendRequest = (props) => {
    /* States */
    const [friendsRequestData, setFriendsRequestData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const userId = useParams().userId;
    const navigate = useNavigate();

    const token = useSelector((state) => {
        return state.user.token;
    });
    const countFriendRequests = useSelector((state) => {
        return state.notification.countFriendRequests;
    });

    const dispatch = useDispatch();

    const fetchFriendRequest = async() => {
        setIsLoading(true);
        const url = `https://melon-web-project-server.vercel.app/friends/request/${userId}`;
        await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            if (!res.ok) {
                setIsLoading(false);
                throw new Error('Fail to send friend request ');
            }
            return res.json();
        })
        .then((data) => {
            setIsLoading(false);
            setFriendsRequestData(data);
            /* Count the number of friend requests initially */
            dispatch(setCountFriendRequests(data?.length));
        })
        .catch((err) => {
            console.error('Error updating user data:', err);
        });
    }

    useEffect(()=>{
        fetchFriendRequest();
    },[])


    const routeToProfilePage = async(userId) => {
        const url = `https://melon-web-project-server.vercel.app/users/user/${userId}`;
        await fetch(url, {
            method: 'GET',
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
            dispatch(setProfileUser(data.user));
            navigate(`/profile/other/${data.user._id}`);
        })
        .catch((err) => {
            console.error('Error updating user data:', err);
        });
    }

    const acceptFriend = async(requestUserId) => {
        const url = `https://melon-web-project-server.vercel.app/friends/request/accept/${userId}/${requestUserId}`;
        await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Fail to accept friend request ');
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);

            /* Update the no.of friend requests */
            dispatch(setCountFriendRequests(countFriendRequests-1));

            /* Delete a specific friend request */
            const updatedFriendRequestData = friendsRequestData.filter(friendRequest => friendRequest._id !== requestUserId);
            setFriendsRequestData(updatedFriendRequestData);

           
        })
        .catch((err) => {
            console.error('Error updating user data:', err);
        });
    }


    const refuseFriend = async(requestUserId) => {
        const url = `https://melon-web-project-server.vercel.app/friends/request/refuse/${userId}/${requestUserId}`;
        await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Fail to refuse friend request ');
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);

            /* Update the no.of friend requests */
            dispatch(setCountFriendRequests(countFriendRequests-1));

            /* Delete a specific friend request */
            const updatedFriendRequestData = friendsRequestData.filter(friendRequest => friendRequest._id !== requestUserId);
            setFriendsRequestData(updatedFriendRequestData);


        })
        .catch((err) => {
            console.error('Error updating user data:', err);
        });
    }

    return (  

        <>
            {/* Loading spinner */}
            {isLoading && 
                (<div className="spinning-overlay">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>)
            }

            
            {friendsRequestData && (
                friendsRequestData.map((friendRequestData,index)=> (
                    <div className='friend-request-container' key={index}>
                        <span className='notification-title'>Friend Request</span>
                        <div className='user-notification-info' onClick={() => routeToProfilePage(friendRequestData._id)}>
                            <img src={`${friendRequestData.userAvatarURL}`} alt="" className='friend-request-user-avatar'/>
                            <div className='name-container'>
                                <span className='friend-request-username'>{friendRequestData.userName}</span>
                                <span className='friend-request-user-nickname'>{friendRequestData.userNickname}</span>
                            </div>
                        </div>


                        <div className='accept-refuse-buttons'>
                            <button className='accept-button' onClick={() => acceptFriend(friendRequestData._id)}><i className="fa-solid fa-check"></i></button>
                            <button className='refuse-button' onClick={() => refuseFriend(friendRequestData._id)}><i className="fa-solid fa-xmark"></i></button>
                        </div>
                    </div>
                ))
            )}
        
        </>
        

    );
}
 
export default FriendRequest;