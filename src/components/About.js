import React, { Component } from 'react';
import Chart from 'react-google-charts';

class About extends Component {

    render() {
        return (
            <div className='col-12'>
                <div className='title'>
                    <h1>O projekcie</h1>
                    <p>
                        Projekt przedstawia statystyki z wyścigów F1 na bazie danych pobranych z Ergast API.
                        Na podstawie przetworzonych danych generowane są wykresy lub tabele ze statystykami dotyczącymi najbardziej
                        prestiżowego sportu motorowego na świecie!
                    </p>
                </div>
                <div>
                    <ul className='aboutList'>
                        <li className='aboutDecoration'>Link do repozytorium:
                            <ul>
                                <li><a className='aboutLink' href='https://github.com/andrzejsenderecki/f1stats_react' target='_blank'>Repozytorium F1stats!</a></li>
                            </ul>
                        </li>
                        <li className='aboutListTitle'>Technologie wykorzystane w projekcie:</li>

                        <li className='aboutDecoration'>React:
                            <ul>
                                <li>React Router</li>
                                <li>React SASS Loader</li>
                                <li>React Responsive</li>
                                <li>React Google Charts</li>
                            </ul>
                        </li>
                        <li className='aboutDecoration'>JavaScript:
                            <ul>
                                <li>ES6</li>
                                <li>Fetch</li>
                            </ul>
                        </li>
                        <li className='aboutDecoration'>HTML, CSS:
                            <ul>
                                <li>SASS</li>
                                <li>Responsive Web Design</li>
                            </ul>
                        </li>
                        <li className='aboutDecoration'>Inne technologie:
                            <ul>
                                <li>JSON</li>
                                <li>Webpack</li>
                                <li>Git</li>
                                <li>Projekt wykorzystuje dane dynamicznie pobierane z Ergast API</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default About;
