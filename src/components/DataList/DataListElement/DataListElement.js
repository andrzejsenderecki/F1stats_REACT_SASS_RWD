import React from 'react';

const DataListElement = (props) => {
    return (
        <li>{props.text} <span>{props.value}</span></li>
    )
}

export default DataListElement;