import React from 'react';
import '../../App.scss';

const Error = (props) => {
    return (
        <div className='error'>
            <p>{props.error}</p>
        </div>
    )
}

export default Error;