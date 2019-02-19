import React from 'react';

const FormBtn = (props) => {
    return (
        <div>
            <button onClick={props.action}>{props.text}</button>
        </div>
    )
}

export default FormBtn;