import React from 'react';

const FormInput = (props) => {
    return (    
        <input
            type={props.type}
            placeholder={props.initialValue}
            value={props.inputValue}
            onChange={props.inputAction}
        />
    )
}

export default FormInput;