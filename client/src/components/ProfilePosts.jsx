/* Import react stuff */
import React, {useEffect, useState} from "react";

/* Import redux stuff */
import { useSelector, useDispatch } from "react-redux";

/* Import components */
import Post from './Post.jsx';

/* Import assets */
import postImg1 from '../assets/postImg1.jpg';
import postImg2 from '../assets/postImg2.jpg';
import postImg3 from '../assets/postImg3.jpg';
import postImg4 from '../assets/postImg4.png';
import postImg5 from '../assets/postImg5.jpg';
import postImg6 from '../assets/postImg6.jpg';

const ProfilePosts = () => {
    return ( 
        <div className="profile-post-container">
            <Post image={postImg1}/>
            <Post image={postImg5}/>
            <Post image={postImg6}/>
            <Post image={postImg4}/>
            <Post image={postImg5}/>
        </div>
    );
}
 
export default ProfilePosts;