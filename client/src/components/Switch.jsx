import React from 'react';

const Switch = (props) => {
    return (  
        <div>
            <label className='switch'>
            <input type="checkbox" checked={props.value} onChange={props.onToggled}/>
            <span className='slider'></span>
            </label>
        </div>

    );
}
 
export default Switch;