import React from 'react';
import '../../App.scss';

const Form = ({children}) => {
    return (
        <form className='form'>
            {children}
        </form>
    )
}

export default Form;