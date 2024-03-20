/* Import react library */
import React, {useEffect, useState, useRef} from "react";

/* Import components */
import ProfileDropdown from "./ProfileDropdown";

const Post = (props) => {
    /* Reference to a HTML tag */
    const dropdownRef = useRef(null);

    /* States */
    const [toggleDropDownList, setToggleDropDownList] = useState(false);

    /* Handlers */
    const openDropdownList = (e) => {
        setToggleDropDownList(!toggleDropDownList);
    }

    useEffect(() => {
        /* Trigger toggle the dropdown when the mouse click outside the browser */
        function handleClickOutside(e) {
          if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setToggleDropDownList(false);
          }
        }
    
        /* Check the 'click' event is occured */
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, []);

    return ( 
        <div className="post-container" ref={dropdownRef}>
            {/* Display post image */}
            <img src={props.image} alt="This is post Img" className="post-image"/>

            {/* The list button in the post */}
            <button className="list-button" onClick={openDropdownList}><i className="fa-solid fa-list-ul"></i></button>

            {/* Display dropdown list if the list button in the post is clicked */}
            {toggleDropDownList && <ProfileDropdown postIndex={props.postIndex} setToggleDropDownList={openDropdownList}/>}

            {/* Display post information (e.g post title, post release date, post description) */}
            <div className="post-info">
                <span className="post-title">{props.title}</span>
                <span className="post-date">{props.date}</span>
            </div>
            <p className="post-content">{props.description}</p>
            
        </div>
    );
}
 
export default Post;