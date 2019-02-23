import React from 'react';

const FormBtn = (props) => {
    return (
        <button className='formBtn' onClick={props.action}>{props.text}</button>
    )
}

export default FormBtn;