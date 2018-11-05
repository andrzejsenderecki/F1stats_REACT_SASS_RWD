import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.scss';

class Footer extends Component {
    render() {
        return (
            <div className="row">
                <div className='col-12 footer'>
                    <div className='logoFooter'>
                        <p>F1stats!</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;