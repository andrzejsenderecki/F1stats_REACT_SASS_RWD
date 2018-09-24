import React, { Component } from 'react';
import '../App.css';

class CurrentSeason extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
        }
    }
    componentDidMount() {
        let dateYear = new Date();
        let url = `http://ergast.com/api/f1/${dateYear.getFullYear()}.json`;
        fetch(url).then(resp => {
            return resp.json();
        }).then(json => {
            this.setState({
                data: json.MRData

            })

        });
    }
    render() {
        let date = new Date();
        var currentDate;
        if(date.getMonth() <= 8) {
            currentDate = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
        } else {
            currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        }
        if(this.state.data === '') {
            return <p className='title'>Loading...</p>
        } else {
            return (
                <div className='content'>
                    <h3 className='title'>Sezon {this.state.data.RaceTable.season}</h3>
                    <ul className='dataRace'>
                        {this.state.data.RaceTable.Races.map(element => {
                            if(element.date > currentDate) {
                                return<li className='pastRaces'>{element.date} | {element.raceName}</li>
                            } else {
                                return<li className='futureRaces'>{element.date} | {element.raceName}</li>
                            }
                        })}
                    </ul>
                </div>
            )
        }
    }
}

export default CurrentSeason;