import React, { Component } from 'react';
import {Bar, Line} from 'react-chartjs-2';

class FinishResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            season: '',
            sortBy: 'points',
            chart: 'bar',
            seasonNumber:'',
            roundCount: '',
            err: '',
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: '',
                        data: [],
                        backgroundColor: ''
                    }
                ]
            }
        }
    }
    seasonValue = (event) => {
        this.setState({
            season: event.target.value
        });
    };

    sortByValue = (event) => {
        this.setState({
            sortBy: event.target.value
        }, this.searchSeason);
    };

    chartValue = (event) => {
        this.setState({
            chart: event.target.value
        });
    };

    nextSeason = () => {
        let season = Number(this.state.season);
        season = season + 1;
        this.setState({
            season: Number(season),
        }, this.searchSeason);
    };

    prevSeason = () => {
        let season = Number(this.state.season);
        season = season - 1;
        this.setState({
            season: Number(season),
        }, this.searchSeason);
    };

    searchSeason = () => {
        let url = `http://ergast.com/api/f1/${this.state.season}/driverStandings.json`;
        fetch(url).then(resp => {
            return resp.json();
        }).then(json => {
            let driversArray = json.MRData.StandingsTable.StandingsLists.map((element) => {
                let driver = element.DriverStandings.map((element) => {
                    return element.Driver.familyName;
                });
                return driver;
            });
            let drivers = [];
            for(let i=0; i<driversArray[0].length; i++) {
                drivers.push(driversArray[0][i]);
            }

            let sortByArray = json.MRData.StandingsTable.StandingsLists.map((element) => {
                let sortBy;
                if(this.state.sortBy === "points") {
                    sortBy = element.DriverStandings.map((element) => {
                        return Number(element.points);
                    });
                } else {
                    sortBy = element.DriverStandings.map((element) => {
                        return Number(element.wins);
                    });
                    sortBy.sort((a,b) => a - b);
                    sortBy.reverse();
                }
                return sortBy;
            });
            let sort = [];
            for(let i=0; i<sortByArray[0].length; i++) {
                sort.push(sortByArray[0][i]);
            }

            let seasonNumber = json.MRData.StandingsTable.season;

            let roundNumber = json.MRData.StandingsTable.StandingsLists.map((element) => {
                return element.round;
            });

            this.setState({
                seasonNumber: seasonNumber,
                roundNumber: roundNumber,
                err: '',
                chartData: {
                    labels: drivers,
                    datasets: [
                        {
                            label: `F1stats - ranking kierowców w sezonie ${this.state.season}`,
                            data: sort,
                            backgroundColor: 'rgba(250, 0, 0, 0.7)'
                        }
                    ]
                }
            })
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
                    <form className='formSeason'>
                        <input type="text" placeholder='Podaj rok' value={this.state.season} onChange={this.seasonValue} />
                        <select onChange={this.sortByValue}>
                            <option value="points">Zdobyte punkty</option>
                            <option value="wins">Wygrane wyścigi</option>
                        </select>
                        <select onChange={this.chartValue}>
                            <option value="bar">Wykres blokowy</option>
                            <option value="line">Wykres liniowy</option>
                        </select>
                    </form>
                </div>
                <div className='content'>
                    <button className='button' onClick={this.searchSeason}>Szukaj Sezonu</button>
                    <button className='button' onClick={this.prevSeason}>Poprzedni Sezon</button>
                    <button className='button' onClick={this.nextSeason}>Kolejny Sezon</button>
                </div>
            </div>;

        let titleAndRaces =
            <div>
                <ul className='dataList'>
                    <li>Sezon {this.state.seasonNumber}</li>
                    <li>Ilość wyścigów: {this.state.roundNumber}</li>
                </ul>
            </div>;

        if(this.state.seasonNumber === '') {
            return (
                <div>
                    {formAndBtn}
                </div>
            );
        } else if(this.state.err !== '') {
            return (
                <div>
                    {formAndBtn}
                    <ul className='dataList'>
                        <li>Nie znaleziono takiego sezonu</li>
                    </ul>
                </div>
            );
        } else {
            if(this.state.chart === 'bar') {
                return (
                    <div>
                        {formAndBtn}
                        {titleAndRaces}
                        <div className="chart">
                            <Bar data={this.state.chartData} height={90} />
                        </div>
                    </div>
                )
            } else if (this.state.chart === 'line') {
                return (
                    <div>
                        {formAndBtn}
                        {titleAndRaces}
                        <div className="chart">
                            <Line data={this.state.chartData} height={90} />
                        </div>
                    </div>
                )
            }
        }
    }
}

export default FinishResults;