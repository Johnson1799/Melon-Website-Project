/* Import react library */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* Import redux library */
import { useSelector } from "react-redux";

/* Import toast */
import toast from 'react-hot-toast';

/* Import mui */
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import '../styles.css';

const AdminPage = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [allPosts, setAllPosts] = useState([]);

    const [toggleUsersTableState, setToggleUsersTable] = useState(false);
    const [togglePostsTableState, setTogglePostsTable] = useState(false);
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const adminId = useSelector((state)=>{
        return state.admin.adminId;
    })
    const token = useSelector((state)=>{
        return state.admin.token;
    })

    const navigate = useNavigate();

    const getUsers = async() =>{
        setIsLoading(true);
        if (adminId){
            const url = `https://csci-3100-project.vercel.app/admin/get/users/${adminId}`;

            await fetch(url, {
                method: "POST",
                headers: { 
                    Authorization: `Bearer ${token}`
                },
            })
            .then((res)=>{
                if (!res.ok){
                    setIsLoading(false);
                    throw new Error(`Fali to get all the users' information`);
                }
                return res.json();
            })
            .then((data) =>{
                setAllUsers(data.users);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                navigate("/");
            });
        }

    }

    const getPosts = async() => {
        setIsLoading(true);
        if (adminId){
            const url = `https://csci-3100-project.vercel.app/admin/get/posts/${adminId}`;

            await fetch(url, {
                method: "POST",
                headers: { 
                    Authorization: `Bearer ${token}`
                },
            })
            .then((res)=>{
                if (!res.ok){
                    setIsLoading(false);
                    throw new Error(`Fali to get all the posts' information`);
                }
                return res.json();
            })
            .then((data) =>{
                setAllPosts(data.posts);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                navigate("/");
            });
        }
        
    }

    useEffect(()=>{
        getUsers();
        getPosts();
    },[adminId]);
    

    const toggleUsersTable = () => {
        setToggleUsersTable(true);
        setTogglePostsTable(false);
        setTitle('Users Table');
    }

    const togglePostsTable = () => {
        setTogglePostsTable(true);
        setToggleUsersTable(false);
        setTitle('Posts Table');
    }

    const refreshData = () => {
        getUsers();
        getPosts();
        
        /* Display toast */
        toast.success(`Refresh successful`, {
            style: {
                background: 'white',
                color: 'black',
            },
            duration: 800,
        });
    }

    /* Delete users */
    const deleteUser = async(userId) => {
        setIsLoading(true);
        console.log(userId,'    ',adminId);
        // if (adminId){
        //     const url = `https://csci-3100-project.vercel.app/admin/delete/user/${adminId}/${userId}`;

        //     await fetch(url, {
        //         method: "DELETE",
        //         headers: { 
        //             Authorization: `Bearer ${token}`
        //         },
        //     })
        //     .then((res)=>{
        //         if (!res.ok){
        //             setIsLoading(false);
        //             throw new Error(`Fali to get all the posts' information`);
        //         }
        //         return res.json();
        //     })
        //     .then((data) =>{
        //         setAllUsers(data.users);
        //         setAllUsers(data.posts);
        //         toast.success(`Delete User Successful`, {
        //             style: {
        //                 background: 'white',
        //                 color: 'black',
        //             },
        //             duration: 3000,
        //         });
        //         setIsLoading(false);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         navigate("/");
        //     });
        // }
    }


    /* Users table column */
    const usersColumns = [
        { id: '_id', label: 'User ID', minWidth: 170 },
        { id: 'userName', label: 'Username', minWidth: 170 },
        { id: 'userNickname', label: 'User Nickname', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 170 },
        { id: 'password', label: 'Password', minWidth: 170 },
        { id: 'friends', label: 'User Friends ID', minWidth: 170 },
        { id: 'friendRequests', label: 'User Friend Requests', minWidth: 170 },
        { id: 'posts', label: 'User Posts', minWidth: 170 },
        { id: 'userAvatarURL', label: 'User Avatar', minWidth: 170 },
        { id: 'followers', label: 'No.of Followers', minWidth: 170 },
        { id: 'contact', label: 'User Contact', minWidth: 170 },
        { id: 'address', label: 'User Address', minWidth: 170 },
        { id: 'description', label: 'User Description', minWidth: 170 },
        { id: 'createdAt', label: 'Account Created Time', minWidth: 170 },
        { id: 'updatedAt', label: 'Account Updated Time', minWidth: 170 }
        
    ];

    /* Posts table column */
    const postsColumns = [
        { id: '_id', label: 'Post Id', minWidth: 170 },
        { id: 'userId', label: 'Post Owner Id', minWidth: 170 },
        { id: 'userName', label: 'Post Owner', minWidth: 170 },
        { id: 'title', label: 'Post Title', minWidth: 170 },
        { id: 'description', label: 'Post Description', minWidth: 170 },
        { id: 'likes', label: 'No.of Likes', minWidth: 170 },
        { id: 'comments', label: 'No.of Comments', minWidth: 170 },
        { id: 'isPrivate', label: 'Post State', minWidth: 170 },
        { id: 'postImgURL', label: 'Post Image', minWidth: 170 },
        { id: 'createdAt', label: 'Post Created Time', minWidth: 170 },
        { id: 'updatedAt', label: 'Post Updated Time', minWidth: 170 }
    ];



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


            <div className="admin-page-container">
                {(allUsers && allPosts) &&
                    (<div>
                        <div className="button-container">
                            <button onClick={toggleUsersTable}>Users Table</button>
                            <button onClick={togglePostsTable}>Posts Table</button>
                            <button onClick={refreshData} className="refresh-button"><i className="fa-solid fa-arrows-rotate"></i></button>
                        </div>
                        <span>{title}</span>
                    </div>)}

                {/* Users table */}
                {(toggleUsersTableState && allUsers) &&
                    (<div className="user-table-container">
            
                        <TableContainer component={Paper} sx={{ overflowX: 'visible' }} >
                            <Table >
                            <TableHead>
                                <TableRow>
                                {usersColumns.map((usersColumn) => (
                                    <TableCell key={usersColumn.id} align="center" sx={{ fontSize: 16, fontWeight: 600, whiteSpace: 'nowrap' }}>{usersColumn.label}</TableCell>
                                ))}
                                </TableRow>
                            </TableHead>

                                    {/* <button onClick={()=>deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button> */}
                            <TableBody>
                                {allUsers.map((user) => (
                                    <>
                                        <button onClick={()=>deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                                        <TableRow key={user._id}>
                                            {usersColumns.map((usersColumn) => (
                                        
                                                <TableCell key={usersColumn.id} align="center">
                                                    {usersColumn.id === 'friends' ? user[usersColumn.id].map((friend) => friend._id.toString()).join(`\n`) : 
                                                    (usersColumn.id === 'posts' ?  user[usersColumn.id].map((post) => post).join(`\n`) : 
                                                    (usersColumn.id === 'friendRequests' ? user[usersColumn.id].map((friendRequest) => friendRequest).join(`\n`) : user[usersColumn.id])                 ) }
                                                </TableCell>
                                                
                                            ))}
                                        </TableRow>
                                    </>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </div>)
                }


                {/* Post table */}
                {(togglePostsTableState && allPosts) &&
                    (<div className="post-table-container">

                        <TableContainer component={Paper} sx={{ overflowX: 'visible' }}>
                            <Table >
                                <TableHead>
                                    <TableRow >
                                    {postsColumns.map((postsColumn) => (
                                        <TableCell key={postsColumn.id} align="center" sx={{ fontSize: 16, fontWeight: 600, whiteSpace: 'nowrap' }}>{postsColumn.label}</TableCell>
                                    ))}
                                    </TableRow>
                                </TableHead>


                                <TableBody>
                                    {allPosts.map((post) => (
                                        <TableRow key={post._id} >           
                                            {postsColumns.map((postsColumn) => (
                                                <TableCell key={postsColumn.id} align="center" sx={{ whiteSpace: 'nowrap' }}>
                                                    {postsColumn.id === 'likes' ? post[postsColumn.id].length : 
                                                    (postsColumn.id === 'comments' ? post[postsColumn.id].length : 
                                                    (postsColumn.id === 'isPrivate' ?  (post[postsColumn.id] === true ? 'Private' : 'Public') : post[postsColumn.id]))}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>)
                }

            </div>
        </>
    )
}


export default AdminPage;