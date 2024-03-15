/* Import react stuff */
import React, {useEffect, useState} from "react";

/* Import redux stuff */
import { useSelector, useDispatch } from "react-redux";

const Post = (props) => {
    return ( 
        <div className="post-container">
            <img src={props.image} alt="This is post Img" className="post-image"/>
            <div className="post-info">
                <span className="post-title">This is post title</span>
                <span className="post-date">This is the date</span>
            </div>
            <p className="post-content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, officiis. Libero, laborum minima! Eaque perferendis ad autem doloribus. Consectetur, error? Molestiae recusandae sunt sapiente nobis ipsam optio voluptatem enim distinctio.</p>
        </div>
    );
}
 
export default Post;