import React, { Component } from 'react';
import '../App.scss';
import Chart from 'react-google-charts';

class CurrentSeason extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            season: '',
            round: '',
            dataChart: '',
            sortBy: 'points',
            seasonNumber: '',
            roundNumber: '',
            raceName: '',
            circuitName: '',
            raceDate: '',
            chart: 'ColumnChart',
            err: ''
        }
    }

    componentDidMount() {
        let dateYear = new Date();
        let url = `https://ergast.com/api/f1/${dateYear.getFullYear()}.json`;
        fetch(url).then(resp => {
            return resp.json();
        }).then(json => {
            this.setState({
                data: json.MRData
            })
        });
    }

    displayRound = (season, round) => {
        this.setState({
            season: season,
            round: round,
        }, this.searchRound);
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

    searchRound = () => {
        let url = `https://ergast.com/api/f1/${this.state.season}/${this.state.round}/results.json`;
        fetch(url).then(resp => {
            return resp.json();
        }).then(json => {

            let resultArray = json.MRData.RaceTable.Races.map((element) => {
                let result = element.Results.map((element) => {
                    let data = [];
                    data.push(element.Driver.familyName);
                    if (this.state.sortBy === 'points') {
                        data.push(Number(element.points));
                    } else {
                        data.push(Number(element.laps));
                    }
                    return data;
                });
                return result;
            });

            let sortWinsArray = [];
            let winsArray = [[]];
            if (this.state.sortBy === 'laps') {
                for (let i = 0; i < resultArray[0].length; i++) {
                    let driver = resultArray[0][i][0];

                    let count = resultArray[0][i][1];

                    sortWinsArray.push({count: count, driver: driver})
                }
                sortWinsArray.sort((a, b) => {
                    return Number(a.count) - Number(b.count);
                });
                sortWinsArray.reverse();
                for (let i = 0; i < sortWinsArray.length; i++) {
                    winsArray[0].push([sortWinsArray[i].driver, sortWinsArray[i].count]);
                }
            }

            if (this.state.sortBy === 'points') {
                resultArray[0].unshift(['', 'Punkty']);
                this.setState({
                    dataChart: resultArray,
                });
            } else {
                winsArray[0].unshift(['', 'Ukończone okrążenia']);
                this.setState({
                    dataChart: winsArray,
                });
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

            this.setState({
                seasonNumber: seasonNumber,
                roundNumber: roundNumber,
                raceName: raceName,
                circuitName: circuitName,
                raceDate: raceDate,
                err: '',
            });
        }).catch(() => {
            this.setState({
                seasonNumber: '',
                roundNumber: '',
                raceName: '',
                circuitName: '',
                raceDate: '',
                err: 'Jeszcze nie było tej rundy',
            })
        });
    };

    render() {

        let loading =
            <div className='col-12 loadingCurrentPosition chartCurrentContent'>
                <div className='loading' />
            </div>;

        let title =
            <div className='col-12'>
                <div className='title'>
                    <h1>Aktualny sezon</h1>
                    <p>Klasyfikacja ze względu na ilość zdobytych punktów lub wygranych wyścigów w aktualnym
                        sezonie.</p>
                </div>
            </div>;

        let titleAndData =
            <ul className='dataListCurrent'>
                <li>Sezon: <span>{this.state.seasonNumber}</span></li>
                <li>Runda numer: <span>{this.state.roundNumber}</span></li>
                <li>Wyścig: <span>{this.state.raceName}</span></li>
                <li>Data: <span>{this.state.raceDate}</span></li>
            </ul>;

        let form =
            <form className='formCurrent'>
                <select onChange={this.sortByValue}>
                    <option value="points">Zdobyte punkty</option>
                    <option value="laps">Ukończone okrążenia</option>
                </select>
                <select onChange={this.chartValue}>
                    <option value="ColumnChart">Wykres blokowy</option>
                    <option value="LineChart">Wykres liniowy</option>
                    <option value="ScatterChart">Wykres punktowy</option>
                </select>
            </form>

        let date = new Date();
        let currentDate;
        if (date.getMonth() <= 8) {
            currentDate = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
        } else {
            currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        }
        if (this.state.data === '') {
            return (
                <div>
                    <div className='row'>
                        {title}
                    </div>
                    <div className='row'>
                        {loading}
                    </div>
                </div>
            )
        } else if (this.state.err !== '') {
            return (
                <div>
                    <div className='row'>
                        {title}
                    </div>
                    <div className='row'>
                        <div className='col-3'>
                            <ul className='dataRace'>
                                {this.state.data.RaceTable.Races.map((element, index) => {
                                    if (element.date < currentDate) {
                                        return <li key={index} className='pastRaces'
                                                   onClick={() => this.displayRound(element.season, element.round)}>{element.round}. {element.raceName}</li>
                                    } else {
                                        return <li key={index} className='futureRaces'
                                                   onClick={() => this.displayRound(element.season, element.round)}>{element.round}. {element.raceName}</li>
                                    }
                                })}
                            </ul>
                        </div>
                        <div className='col-9'>
                            {titleAndData}
                            <div className='chartCurrentContent'>
                                <p className='info'>{this.state.err}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            if (this.state.dataChart === '') {
                return (
                    <div>
                        <div className='row'>
                            {title}
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <ul className='dataRace'>
                                    {this.state.data.RaceTable.Races.map((element, index) => {
                                        if (element.date < currentDate) {
                                            return <li key={index} className='pastRaces'
                                                       onClick={() => this.displayRound(element.season, element.round)}>{element.round}. {element.raceName}</li>
                                        } else {
                                            return <li key={index} className='futureRaces'
                                                       onClick={() => this.displayRound(element.season, element.round)}>{element.round}. {element.raceName}</li>
                                        }
                                    })}
                                </ul>
                            </div>
                            <div className='col-9 chartCurrentContent'>
                                <p className='info'>Kliknij wybraną rundę, aby wyświetlić statystyki.</p>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <div className='row'>
                            {title}
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <ul className='dataRace'>
                                    {this.state.data.RaceTable.Races.map((element, index) => {
                                        if (element.date < currentDate) {
                                            return <li key={index} className='pastRaces'
                                                       onClick={() => this.displayRound(element.season, element.round)}>{element.round}. {element.raceName}</li>
                                        } else {
                                            return <li key={index} className='futureRaces'
                                                       onClick={() => this.displayRound(element.season, element.round)}>{element.round}. {element.raceName}</li>
                                        }
                                    })}
                                </ul>
                            </div>
                            <div className='col-9'>
                            <div className='chartCurrentContent'>
                                {titleAndData}
                                {form}

                                <Chart
                                    key={this.state.chart}
                                    height='70vh'
                                    chartType={this.state.chart}
                                    data={
                                        [...this.state.dataChart[0]]
                                    }
                                    options={{
                                        chartArea: { left: 80, right: 60, top: 20, bottom: 130 },
                                        legend: {position: 'none'},
                                        fontSize: 12,
                                        colors: ['darkorange'],
                                        backgroundColor: { fill:'transparent' },
                                        animation: {
                                            duration: 1000,
                                            easing: 'out',
                                            startup: true,
                                        },
                                        hAxis: {
                                            showTextEvery: 1,
                                            textStyle : {
                                                fontName: 'Open Sans',
                                                fontSize: 14
                                            },
                                            slantedText: true,
                                            slantedTextAngle: 60
                                        },
                                        vAxis: {
                                            textStyle : {
                                                fontName: 'Open Sans',
                                                fontSize: 12,
                                            },
                                        },
                                    }}
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default CurrentSeason;
