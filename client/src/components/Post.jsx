/* Import react stuff */
import React, {useEffect, useState, useRef} from "react";

/* Import redux stuff */
import { useSelector, useDispatch } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";

const Post = (props) => {
    const [toggleDropDownList, setToggleDropDownList] = useState(false);

    const openDropdownList = (e) => {
        setToggleDropDownList(!toggleDropDownList);
    }

    /* Toggle the dropdown when click outside the browser */
    const dropdownRef = useRef(null);
    useEffect(() => {
        /* Trigger toggle the dropdown when the mouse click outside the browser */
        function handleClickOutside(e) {
          if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setToggleDropDownList(false);
          }
        }
    
        /* Check the click event is occured */
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, []);

    return ( 
        <div className="post-container" ref={dropdownRef}>
            <img src={props.image} alt="This is post Img" className="post-image"/>

            {/* Dropdown list */}
            <button className="list-button" onClick={openDropdownList}><i className="fa-solid fa-list-ul"></i></button>
            {toggleDropDownList && <ProfileDropdown postIndex={props.postIndex} setToggleDropDownList={openDropdownList}/>}

            <div className="post-info">
                <span className="post-title">{props.title}</span>
                <span className="post-date">{props.date}</span>
            </div>
            <p className="post-content">{props.description}</p>
        </div>
    );
}
 
export default Post;