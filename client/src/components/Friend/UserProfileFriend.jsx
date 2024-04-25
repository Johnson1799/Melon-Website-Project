/* Import react library */
import React from 'react';
import {useNavigate} from 'react-router-dom';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";
import { setToggleAddFriendsModal } from '../../redux/Reducers/modalReducer';
import { setProfileUser } from '../../redux/Reducers/postReducer';

const UserProfileFriend = (props) => {

    const token = useSelector((state) => {
        return state.user.token;
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const routeFriendProfile = async(userId) => {
        const url = `https://melon-web-project.vercel.app/users/user/${userId}`;
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

    const toggleAddFriendModal = (e) => {
        dispatch(setToggleAddFriendsModal());
    }

    return ( 
        <>
            {/* Display User Information (friends) */}
            <div className="friends-container" >
                <span className='title'>Following</span>
                <button className='add-friend-button' onClick={toggleAddFriendModal}><i className="fa-solid fa-user-plus"></i></button>
                <div className='friend-list'>
                    {props.user.friends.length > 0 ? props.user.friends.map((friend, index)=>(
                        <div key={index} className="friend" >
                            <button className="friend-avatar" onClick={() => routeFriendProfile(friend._id)}><img src={`${friend.userAvatarURL}`} alt="" /></button>
                            <span className="friend-name">{friend.userName}</span>
                        </div>
                    )) 
                    : null}
                </div>
            </div>
        
        
        </>
     );
}
 
export default UserProfileFriend;