import React from 'react';

const FormInput = (props) => {
    return (
        <div className='formStatusWrap'>
            <button className='buttonMini' onClick={props.leftBtnAction}>&lt;</button>
            <input type="text" placeholder={props.initialValue} value={props.inputValue} onChange={props.inputAction}/>
            <button className='buttonMini' onClick={props.rightBtnAction}>&gt;</button>
        </div>
    )
}

export default FormInput;