/* Import react library */
import React from 'react';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";
import { setToggleAddFriendsModal } from '../../redux/Reducers/modalReducer';

const UserProfileFriend = (props) => {

    const dispatch = useDispatch();

    const routeFriendProfile = () => {
        
    }

    const toggleAddFriendModal = (e) => {
        dispatch(setToggleAddFriendsModal());
    }

    return ( 
        <>
        {/* Display User Information (friends) */}
        <div className="friends-container" >
            <span className='title'>Friends</span>
            <button className='add-friend-button' onClick={toggleAddFriendModal}><i className="fa-solid fa-user-plus"></i></button>
            {props.user.friends.length > 0 ? props.user.friends.map((friend, index)=>(
                <div key={index} className="friend">
                    <button className="friend-avatar" onClick={routeFriendProfile}><img src="https://res.cloudinary.com/dppg4mvct/image/upload/v1711076052/avatar/65fcf2c2310469dbac43c6c5_avatar.png" alt="" /></button>
                    <span className="friend-name">Abc</span>
                </div>
            )) 
            : null}
            
        </div>
        
        
        </>
     );
}
 
export default UserProfileFriend;