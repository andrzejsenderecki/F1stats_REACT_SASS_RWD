import React, { Component } from 'react';
import {Bar, Line} from 'react-chartjs-2';

class RaceResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            season: '',
            round: '',
            sortBy: 'points',
            chart: 'bar',
            seasonNumber:'',
            roundNumber: '',
            raceName: '',
            circuitName: '',
            raceDate: '',
            err: '',
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: '',
                        data: [],
                        backgroundColor: ''
                    }
                ],
            }
        }
    }
    seasonValue = (event) => {
        this.setState({
            season: event.target.value
        })
    };

    roundValue = (event) => {
        this.setState({
            round: event.target.value
        })
    };

    sortByValue = (event) => {
        this.setState({
            sortBy: event.target.value
        }, this.searchRound);
    };

    chartValue = (event) => {
        this.setState({
            chart: event.target.value
        });
    };

    nextRound = () => {
        let round = Number(this.state.round);
        round = round + 1;
        this.setState({
            round: Number(round),
        }, this.searchRound);
    };

    prevRound = () => {
        let round = Number(this.state.round);
        round = round - 1;
        this.setState({
            round: Number(round),
        }, this.searchRound);
    };

    searchRound = () => {
        let url = `http://ergast.com/api/f1/${this.state.season}/${this.state.round}/results.json`;
        fetch(url).then(resp => {
            return resp.json();
        }).then(json => {
            let driversArray = json.MRData.RaceTable.Races.map((element) => {
                let driver = element.Results.map((element) => {
                    return element.Driver.familyName;
                });
                return driver;
            });
            let drivers = [];
            for(let i=0; i<driversArray[0].length; i++) {
                drivers.push(driversArray[0][i]);
            }

            let sortByArray = json.MRData.RaceTable.Races.map((element) => {
                let sortBy;
                if(this.state.sortBy === "points") {
                    sortBy = element.Results.map((element) => {
                        return Number(element.points);
                    });
                } else if(this.state.sortBy === "laps") {
                    sortBy = element.Results.map((element) => {
                        return Number(element.laps);
                    });
                }
                return sortBy;
            });
            let sort = [];
            for(let i=0; i<sortByArray[0].length; i++) {
                sort.push(sortByArray[0][i]);
            }

            let seasonNumber = json.MRData.RaceTable.Races.map((element) => {
                return element.season;
            });

            let roundNumber = json.MRData.RaceTable.Races.map((element) => {
                return element.round;
            });

            let raceName = json.MRData.RaceTable.Races.map((element) => {
                return element.raceName;
            });

            let circuitName = json.MRData.RaceTable.Races.map((element) => {
                return element.Circuit.circuitName;
            });

            let raceDate = json.MRData.RaceTable.Races.map((element) => {
                return element.date;
            });

            this.setState ({
                seasonNumber: seasonNumber,
                roundNumber: roundNumber,
                raceName: raceName,
                circuitName: circuitName,
                raceDate: raceDate,
                err: '',
                chartData: {
                    labels: drivers,
                    datasets: [
                        {
                            label: `F1stats - wyniki rundy ${this.state.round} w sezonie ${this.state.season}`,
                            data: sort,
                            backgroundColor: 'rgba(255, 0, 0, 0.7)'
                        }
                    ],
                }
            });
        }).catch(() => {
            this.setState({
                seasonNumber: 'Error',
                err: 'Error',
            })
        });
    };
    render() {
        let formAndBtn =
            <div>
                <div className='content'>
                    <form className='formRace'>
                        <input type="text" placeholder='Podaj rok' onChange={this.seasonValue} />
                        <input type="text" value={this.state.round} placeholder='Podaj rundę' onChange={this.roundValue} />
                        <select onChange={this.sortByValue}>
                            <option value="points">Zdobyte punkty</option>
                            <option value="laps">Ukończone okrążenia</option>
                        </select>
                        <select onChange={this.chartValue}>
                            <option value="bar">Wykres blokowy</option>
                            <option value="line">Wykres liniowy</option>
                        </select>
                    </form>
                </div>
                <div className='content'>
                    <button className='button' onClick={this.searchRound}>Szukaj Wyścigu</button>
                    <button className='button' onClick={this.prevRound}>Poprzedni Wyścig</button>
                    <button className='button' onClick={this.nextRound}>Kolejny Wyścig</button>
                </div>
            </div>;

        let titleAndData =
            <div className='content'>
                <ul className='dataList'>
                    <li>Sezon {this.state.seasonNumber}</li>
                    <li>Runda numer: {this.state.roundNumber}</li>
                    <li>Wyścig: {this.state.raceName}</li>
                    <li>Tor: {this.state.circuitName}</li>
                    <li>Data: {this.state.raceDate}</li>
                </ul>
            </div>;

        if(this.state.seasonNumber === '' && this.state.roundNumber === '') {
            return (
                <div>
                    {formAndBtn}
                </div>
            )
        } else if(this.state.err !== '' || this.state.round <= 0) {
            return (
                <div>
                    {formAndBtn}
                    <ul className='dataList'>
                        <li>Nie znaleziono takiego sezonu lub wyścigu</li>
                    </ul>
                </div>
            )
        } else {
            if(this.state.chart === 'bar') {
                return (
                    <div>
                        {formAndBtn}
                        {titleAndData}
                        <div className="chart">
                            <Bar data={this.state.chartData} height={80} />
                        </div>
                    </div>
                )
            } else if(this.state.chart === 'line') {
                return (
                    <div>
                        {formAndBtn}
                        {titleAndData}
                        <div className="chart">
                            <Line data={this.state.chartData} height={80} />
                        </div>
                    </div>
                )
            }
        }
    }
}

export default RaceResults;