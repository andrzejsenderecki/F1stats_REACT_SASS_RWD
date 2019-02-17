import React from 'react';
import '../App.scss';

const Title = (props) => {
    return (
        <React.Fragment>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
            <p>{props.description}</p>
        </React.Fragment>
    )
}

export default Title;