import React from 'react';
import Title from '../Title/Title';

const Contact = () => {
    return (
        <React.Fragment>
            <div className='row'>
                <div className='col-12'>
                    <Title styles='title' title='Kontakt' />
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <ul className='contactList'>
                        <li><a className='contactLink' href='https://pl.linkedin.com/in/andrzej-senderecki-64b7b6159' target='_blank' rel='noopener noreferrer'>Link do profilu LinkedIn</a></li>
                        <li><a className='contactLink' href='https://github.com/andrzejsenderecki' target='_blank' rel='noopener noreferrer'>Link do profilu Github</a></li>
                        <li><a className='contactLink' href='https://github.com/andrzejsenderecki/f1stats_react' target='_blank' rel='noopener noreferrer'>Link do repozytorium F1stats!</a></li>
                        <li><a className='contactLink' href='https://www.instagram.com/andrzejsenderecki/' target='_blank' rel='noopener noreferrer'>Link do profilu Instagram</a></li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Contact;