import React from 'react';
import '../../App.scss';

const FormMove = (props) => {
    return (
        <div className='formMoveContainer'>
            <form className='formMove'>
                <button type='button' className='buttonMove buttonMoveLeft' onClick={props.prevResults}>&lt;</button>
                <button type='button' className='buttonMove buttonMoveRight' onClick={props.nextResults}>&gt;</button>
                <select onChange={props.move}>
                    <option value='1'>Przewiń wyniki o 1</option>
                    <option value={props.countResults}>Przewiń wyniki o {props.countResults}</option>
                </select>
                <select value={props.countResults} onChange={props.countResultsValue}>
                    <option value='all'>Pokaż wszystkie</option>
                    <option value='5'>Pokaż 5 wyników</option>
                    <option value='10'>Pokaż 10 wyników</option>
                    <option value='15'>Pokaż 15 wyników</option>
                </select>
            </form>
        </div>
    )
}

export default FormMove;