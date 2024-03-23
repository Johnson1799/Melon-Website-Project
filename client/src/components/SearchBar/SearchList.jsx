/* Import react library */
import React, { useEffect, useState } from 'react';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

import { setToggleAddFriendsModal } from '../../redux/Reducers/modalReducer';


const SearchList = (props) => {
    const [fetchResult, setFetchResult] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [toggleSearchList, setToggleSearchList] = useState(false);
    // const [toggleUserDetail, setToggleUserDetail] = useState(false);

    const token = useSelector((state) => {
        return state.user.token;
    });

    const dispatch = useDispatch();
    
    const showProfile = (user) => {
        setSelectedUser(user);
        setToggleSearchList(false);
        props.sendDataToParent(user);
        // setToggleUserDetail(true);
    }

    const fetchData = async() => {
        const url = `http://localhost:3001/users/${props.input}`;
        await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Fail to Update Users Information to Database');
            }
            return res.json();
        })
        .then((data) => {
            if (data.users){
                setFetchResult(data.users);
                setToggleSearchList(true);
            }
        })
        .catch((err) => {
            console.error('Error updating user data:', err);
        });
    }
        

    useEffect(()=>{
        fetchData();
    },[props.input])


    return ( 
        <>
            <div className='search-list-container'>
                {(toggleSearchList && selectedUser === null) && (
                    fetchResult.map((resultUser,index)=>(
                            <div className={`search-result ${toggleSearchList}`} key={index} id={`result${index}`}>
                                <button className="friend-button" onClick={() => showProfile(resultUser)}>
                                    <img className="friend-avatar" src={`${resultUser.userAvatarURL}`} alt="" />
                                    <span className='user-name'>{resultUser.userName}</span>
                                </button>
                            </div>
                    ))
                )}
            </div> 

        </>
    );
}
 
export default SearchList;