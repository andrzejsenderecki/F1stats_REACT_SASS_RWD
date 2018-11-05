import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.scss';

class Navigation extends Component {
    render() {
        return (
            <div className="row header">
                <div className='col-3'>
                    <div className='logo'>
                        <p>F1stats!</p>
                    </div>
                </div>
                <div className='col-9'>
                    <ul className='navigation'>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/season'>Sezony</NavLink></li>
                        <li><NavLink to='/race'>Wyścigi</NavLink></li>
                        <li><NavLink to='/current'>Aktualny</NavLink></li>
                        <li><NavLink to='/reason'>Przyczyny</NavLink></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Navigation;
