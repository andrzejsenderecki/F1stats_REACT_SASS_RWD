import React from 'react';

const Title = (props) => {
    return (
        props.subtitle ? (
            <div className='title'>
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
                <p>{props.description}</p>
            </div>
        ) : (
            <div className='title'>
                <h1>{props.title}</h1>
                <p>{props.description}</p>
            </div>
        )
    )
}

export default Title;