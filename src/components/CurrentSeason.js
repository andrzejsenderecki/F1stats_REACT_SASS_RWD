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
            chart: 'bar'
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
            chart: event.target.value,
        }, this.searchRound);
    };

    searchRound = () => {
        let url = `http://ergast.com/api/f1/${this.state.season}/${this.state.round}/results.json`;
        fetch(url).then(resp => {
            return resp.json();
        }).then(json => {

            let resultArray = json.MRData.RaceTable.Races.map((element) => {
                let result = element.Results.map((element) => {
                    let data = [];
                    data.push(element.Driver.familyName);
                    if (this.state.sortBy === 'points') {
                        data.pusph(Number(element.points));
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
                seasonNumber: 'Error',
                err: 'Error',
            })
        });
    };

    render() {


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

        let date = new Date();
        let currentDate;
        if (date.getMonth() <= 8) {
            currentDate = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
            console.log(currentDate);
        } else {
            currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            console.log(currentDate);
        }
        if (this.state.data === '') {
            return <p className='title'>Loading...</p>
        } else {
            if (this.state.dataChart === '') {
                return (
                    <div className='content'>
                        <h3 className='title'>Sezon {this.state.data.RaceTable.season}</h3>
                        <ul className='dataRace'>
                            {this.state.data.RaceTable.Races.map((element, index) => {
                                if (element.date < currentDate) {
                                    return <li key={index} className='pastRaces'
                                               onClick={() => this.displayRound(element.season, element.round)}>{element.date} | {element.raceName}</li>
                                } else {
                                    return <li key={index} className='futureRaces'
                                               onClick={() => this.displayRound(element.season, element.round)}>{element.date} | {element.raceName}</li>
                                }
                            })}
                        </ul>
                    </div>
                )
            } else {
                if (this.state.chart === 'bar') {
                    return (
                        <div className='content'>
                            <h3 className='title'>Sezon {this.state.data.RaceTable.season}</h3>
                            <ul className='dataRace'>
                                {this.state.data.RaceTable.Races.map((element, index) => {
                                    if (element.date <= currentDate) {
                                        console.log('EL');
                                        console.log(element.date);
                                        console.log(currentDate);
                                        console.log('EL');
                                        if(element.round === this.state.round) {
                                            return <li key={index} className='pastRaces' onClick={() => this.displayRound(element.season, element.round)}>
                                                {element.date} | {element.raceName} {this.state.round}
                                                <div className="chart">
                                                    <div className='content'>
                                                        <form className='formRace'>
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
                                                    {titleAndData}
                                                    <Chart
                                                        key="ColumnChart"
                                                        height={500}
                                                        chartType="ColumnChart"
                                                        loader={<div>Loading Chart</div>}
                                                        data={
                                                            [...this.state.dataChart[0]]
                                                        }
                                                        options={{
                                                            title: 'Przyczyny z jakich kierowcy kończyli wyścigi',
                                                            chartArea: {left: 100, right: 100, top: 60, bottom: 130},
                                                            legend: {position: 'none'},
                                                            fontSize: 12,
                                                            color: 'yellow',
                                                            hAxis: {
                                                                showTextEvery: 1,
                                                                textStyle: {
                                                                    fontSize: 12
                                                                },
                                                                slantedText: true,
                                                                slantedTextAngle: 60,
                                                                title: 'Przyczyny ukończenia wyścigów'
                                                            },
                                                            vAxis: {
                                                                title: 'Ilość',
                                                                textStyle: {
                                                                    fontSize: 12,
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </li>
                                        } else {
                                            return <li className='pastRaces'
                                                       onClick={() => this.displayRound(element.season, element.round)}>{element.date} | {element.raceName} {this.state.round}</li>
                                        }
                                    } else {
                                        if(element.round === this.state.round) {
                                            return <li className='futureRaces' onClick={() => this.displayRound(element.season, element.round)}>
                                                {element.date} | {element.raceName} {this.state.round}
                                                <div>
                                                    Jeszcze nie było takiego wyścigu
                                                </div>
                                            </li>
                                        } else {
                                            return <li className='futureRaces' onClick={() => this.displayRound(element.season, element.round)}>{element.date} | {element.raceName} {this.state.round}</li>
                                        }
                                    }
                                })}
                            </ul>
                        </div>
                    )
                } else {
                    return (
                        <div className='content'>
                            <h3 className='title'>Sezon {this.state.data.RaceTable.season}</h3>
                            <ul className='dataRace'>
                                {this.state.data.RaceTable.Races.map((element, index) => {
                                    if (element.date <= currentDate) {
                                        console.log('EL');
                                        console.log(element.date);
                                        console.log(currentDate);
                                        console.log('EL');
                                        if(element.round === this.state.round) {
                                            return <li key={index} className='pastRaces' onClick={() => this.displayRound(element.season, element.round)}>
                                                {element.date} | {element.raceName} {this.state.round}
                                                <div className="chart">
                                                    <div className='content'>
                                                        <form className='formRace'>
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
                                                    {titleAndData}
                                                    <Chart
                                                        key="LineChart"
                                                        height={500}
                                                        chartType="LineChart"
                                                        loader={<div>Loading Chart</div>}
                                                        data={
                                                            [...this.state.dataChart[0]]
                                                        }
                                                        options={{
                                                            title: 'Przyczyny z jakich kierowcy kończyli wyścigi',
                                                            chartArea: {left: 100, right: 100, top: 60, bottom: 130},
                                                            legend: {position: 'none'},
                                                            fontSize: 12,
                                                            color: 'yellow',
                                                            hAxis: {
                                                                showTextEvery: 1,
                                                                textStyle: {
                                                                    fontSize: 12
                                                                },
                                                                slantedText: true,
                                                                slantedTextAngle: 60,
                                                                title: 'Przyczyny ukończenia wyścigów'
                                                            },
                                                            vAxis: {
                                                                title: 'Ilość',
                                                                textStyle: {
                                                                    fontSize: 12,
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </li>
                                        } else {
                                            return <li className='pastRaces'
                                                       onClick={() => this.displayRound(element.season, element.round)}>{element.date} | {element.raceName} {this.state.round}</li>
                                        }
                                    } else {
                                        if(element.round === this.state.round) {
                                            return <li className='futureRaces' onClick={() => this.displayRound(element.season, element.round)}>
                                                {element.date} | {element.raceName} {this.state.round}
                                                <div>
                                                    Jeszcze nie było takiego wyścigu
                                                </div>
                                            </li>
                                        } else {
                                            return <li className='futureRaces' onClick={() => this.displayRound(element.season, element.round)}>{element.date} | {element.raceName} {this.state.round}</li>
                                        }
                                    }
                                })}
                            </ul>
                        </div>
                    )
                }
            }
        }
    }
}

export default CurrentSeason;
