import React from 'react';
import '../App.scss';

const Title = (props) => {
    return (
        props.subtitle ? (
            <React.Fragment>
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
                <p>{props.description}</p>
            </React.Fragment>
        ) : (
            <React.Fragment>
                <h1>{props.title}</h1>
                <p>{props.description}</p>
            </React.Fragment>
        )
    )
}

export default Title;