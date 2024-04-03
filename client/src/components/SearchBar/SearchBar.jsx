/* Import react library */
import React, { useState } from 'react';
import SearchList from "../SearchBar/SearchList.jsx";


const SearchBar = (props) => {
    const [searchInput, setSearchInput] = useState("");

    const handleOnChange = (e) => {
        setSearchInput(e.target.value);
    }

    const handleDataReceivedFromChild = (selectedUser) => {
        setSearchInput('');

        props.sendDataToParent(selectedUser);

    }

    return ( 
        <div className='search-bar-container'>
            <i className="fa-solid fa-magnifying-glass icon"></i>
            <input placeholder='Type to search user...' value={searchInput} onChange={handleOnChange}/>
            {searchInput && <SearchList input={searchInput} sendDataToParent={handleDataReceivedFromChild}/>}
            {searchInput && <button className='clear-text-button' onClick={()=> setSearchInput("")}><i className="fa-solid fa-xmark icon"></i></button>}
        </div>
     );
}
 
export default SearchBar;