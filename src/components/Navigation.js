import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

class Navigation extends Component {
    render() {
        return (
            <div>
                <h1 className='logo'>F1stats</h1>
                <ul className='navigation'>
                    <li><NavLink to='/'>Strona Główna</NavLink></li>
                    <li><NavLink to='/season'>Sezony</NavLink></li>
                    <li><NavLink to='/race'>Wyścigi</NavLink></li>
                    <li><NavLink to='/current'>Aktualny sezon</NavLink></li>
                </ul>
            </div>
        )
    }
}

export default Navigation;