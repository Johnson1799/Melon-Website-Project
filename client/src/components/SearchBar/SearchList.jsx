/* Import react library */
import React, { useEffect, useState, } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

const SearchList = (props) => {
    const [fetchResult, setFetchResult] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [toggleSearchList, setToggleSearchList] = useState(false);

    const userId = useParams().userId;

    const token = useSelector((state) => {
        return state.user.token;
    });

    const dispatch = useDispatch();
    
    const showProfile = (user) => {
        setSelectedUser(user);
        setToggleSearchList(false);

        /* Send data to SearchBar.jsx */
        props.sendDataToParent(user);
    }

    const sendAddFriendRequest = async(selectedUser) => {
        const url = `https://csci-3100-project.vercel.app/friends/send/request/${userId}/${selectedUser._id}`;
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
            if (data.message){
                /* Display the toast */
                toast.success(`${data.message}`, {
                    style: {
                        background: 'white',
                        color: 'black',
                    },
                });
            } 
            else {
                toast.error(`${data.error}`, {
                    style: {
                        background: 'white',
                        color: 'black',
                    },
                });
            }
        })
        .catch((err) => {
            console.error(err);
        });

        setToggleSearchList(false);
    }


    const fetchData = async() => {
        const url = `https://csci-3100-project.vercel.app/users/${props.input}`;
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
                /* Excluede the user himself */
                const resultList = data.users.filter(result => result._id !== userId);

                /* Update states */
                setFetchResult(resultList);
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
                                <button className='add-friend-button' onClick={() => sendAddFriendRequest(resultUser)}><i className="fa-solid fa-user-plus"></i></button>
                            </div>
                    ))
                )}
            </div> 
            

        </>
    );
}
 
export default SearchList;