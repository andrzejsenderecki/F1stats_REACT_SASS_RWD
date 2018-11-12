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
        console.log('click');
        event.preventDefault();
        this.setState({
            show: this.state.show ? false : true
        })
    }

    render() {


    if (this.state.show===false) {
        return(
            <div>
    <MediaQuery maxDeviceWidth={899}>


    <div className="row header">
            <div className='col-3'>
                <div className='logo'>
                    <p>F1stats!</p>
                </div>
            </div>
            <div className='col-9 navigation'>
                <ul className='navigationList'>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li>
                        <ul>
                            <li>
                                <a onClick={this.showHideMenu}>Statystyki</a>
                            </li>
                        </ul>
                    </li>
                    <li><NavLink to='/'>O projekcie</NavLink></li>
                    <li><NavLink to='/'>Kontakt</NavLink></li>
                </ul>
            </div>
        </div>

    </MediaQuery>
    <MediaQuery minDeviceWidth={900}>


    <div className="row header">
            <div className='col-3'>
                <div className='logo'>
                    <p>F1stats!</p>
                </div>
            </div>
            <div className='col-9 navigation'>
                <ul className='navigationList'>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li>
                        <ul>
                            <li>
                                <a>Statystyki</a>
                                <ul className='navigationSubList'>
                                    <li><NavLink to='/season'>Sezony</NavLink></li>
                                    <li><NavLink to='/race'>Wyścigi</NavLink></li>
                                    <li><NavLink to='/current'>Aktualny sezon</NavLink></li>
                                    <li><NavLink to='/reason'>Statusy ukończenia wyścigu</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><NavLink to='/'>O projekcie</NavLink></li>
                    <li><NavLink to='/'>Kontakt</NavLink></li>
                </ul>
            </div>
        </div>

    </MediaQuery>
    </div>
    )
} else {
    return(
        <MediaQuery maxDeviceWidth={899}>
        <div className="row header">
                <div className='col-3'>
                    <div className='logo'>
                        <p>F1stats!</p>
                    </div>
                </div>
                <div className='col-9 navigation'>
                    <ul className='navigationList'>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li>
                            <ul>
                                <li>
                                    <a onClick={this.showHideMenu}>Statystyki</a>
                                    <ul className='navigationSubList'>
                                        <li><NavLink to='/season'>Sezony</NavLink></li>
                                        <li><NavLink to='/race'>Wyścigi</NavLink></li>
                                        <li><NavLink to='/current'>Aktualny sezon</NavLink></li>
                                        <li><NavLink to='/reason'>Statusy ukończenia wyścigu</NavLink></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><NavLink to='/'>O projekcie</NavLink></li>
                        <li><NavLink to='/'>Kontakt</NavLink></li>
                    </ul>
                </div>
            </div>
        </MediaQuery>
    )
}
}
}

export default Navigation;
