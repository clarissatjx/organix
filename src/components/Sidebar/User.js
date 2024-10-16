import React from 'react';
import profilepicture from "../../images/placeholder.jpg";

function User() {
    return (
        <div className='User'>
            <div className='profilepicture'>
                <img src={profilepicture} alt='profilepicture' />
            </div>
            <div className='info'>
                <p>clarissatjx</p>
                <a href="#">Logout</a>
            </div>
        </div>
    )
}

export default User