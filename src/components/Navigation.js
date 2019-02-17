import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import '../App.scss';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    showHideMenu = (event) => {
        event.preventDefault();
        this.setState({
            show: this.state.show ? false : true
        })
    }

    render() {
        if (this.state.show === false) {
            return (
                <div>
                    <MediaQuery maxDeviceWidth={899}>
                        <div className='row'>
                            <div className='col-12 header'>
                                <div className='logo'>
                                    <div className=''>
                                        F1stats!
                                    </div>
                                </div>
                                <div className='navigation'>
                                    <ul className=''>
                                        <li><NavLink to='/'>Home</NavLink></li>
                                        <li>
                                            <ul>
                                                <li>
                                                    <a onClick={this.showHideMenu}>Statystyki</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><NavLink to='/about'>O projekcie</NavLink></li>
                                        <li><NavLink to='/contact'>Kontakt</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </MediaQuery>
                    <MediaQuery minDeviceWidth={900}>
                        <div className='row'>
                            <div className='col-12 header'>
                                <div className='logo'>
                                    F1stats!
                                </div>
                                <ul className='navigation'>
                                    <li><NavLink to='/'>Home</NavLink></li>
                                    <li>
                                        <ul>
                                            <li>
                                                <a>Statystyki</a>
                                                <ul>
                                                    <li><NavLink to='/season'>Sezony</NavLink></li>
                                                    <li><NavLink to='/race'>Wyścigi</NavLink></li>
                                                    <li><NavLink to='/status'>Statusy</NavLink></li>
                                                    <li><NavLink to='/drivers'>Kierowcy</NavLink></li>
                                                    <li><NavLink to='/current'>Aktualny sezon</NavLink></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><NavLink to='/about'>O projekcie</NavLink></li>
                                    <li><NavLink to='/contact'>Kontakt</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </MediaQuery>
                </div>
            )
        } else {
            return(
                <MediaQuery maxDeviceWidth={899}>
                    <div className='row'>
                        <div className='col-12 header'>
                            <div className='logo'>
                                <p>F1stats!</p>
                            </div>
                            <div className=''>
                                <ul className='navigation'>
                                    <li><NavLink to='/'>Home</NavLink></li>
                                    <li>
                                        <ul>
                                            <li>
                                                <a onClick={this.showHideMenu}>Statystyki</a>
                                                <ul className=''>
                                                    <li><NavLink to='/season'>Sezony</NavLink></li>
                                                    <li><NavLink to='/race'>Wyścigi</NavLink></li>
                                                    <li><NavLink to='/status'>Statusy</NavLink></li>
                                                    <li><NavLink to='/drivers'>Kierowcy</NavLink></li>
                                                    <li><NavLink to='/current'>Aktualny sezon</NavLink></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><NavLink to='/about'>O projekcie</NavLink></li>
                                    <li><NavLink to='/contact'>Kontakt</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                        
                </MediaQuery>
            )
        }
    }
}

export default Navigation;
