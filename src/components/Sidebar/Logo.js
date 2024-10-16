import React from 'react';
import logo from "../../images/logo.png";


function Logo() {
    return (
        <div className='Logo'>
            <img src={logo} alt='logo' />
            <div className='logotext'>rganix</div>
        </div>
    )
}

export default Logo