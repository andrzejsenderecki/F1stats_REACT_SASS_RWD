import React from 'react';

const DataList = ({children}) => {
    return (
        <ul className='dataList'>
            {children}
        </ul>
    )
}

export default DataList;