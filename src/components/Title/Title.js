import React from 'react';

const Title = (props) => {
    return (
        props.subtitle ? (
            <div className={props.styles}>
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
                <p>{props.description}</p>
            </div>
        ) : (
            props.description ? (
                <div className={props.styles}>
                    <h1>{props.title}</h1>
                    <p>{props.description}</p>
                </div>
            ) : (
                <div className={props.styles}>
                    <h1>{props.title}</h1>
                </div>
            )
        )
    )
}

export default Title;