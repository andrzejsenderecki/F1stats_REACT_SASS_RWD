import React, { Component } from 'react';
import Chart from 'react-google-charts';

class RaceResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            season: '2018',
            round: '1',
            sortBy: 'points',
            chart: 'bar',
            seasonNumber:'',
            roundNumber: '',
            raceName: '',
            circuitName: '',
            raceDate: '',
            err: '',
            data: '',
            loading: true,
        }
    }

    componentDidMount() {
        this.searchRound();
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
            chart: event.target.value,
        }, this.searchRound);
    };

    nextSeason = (event) => {
        event.preventDefault();
        let season = Number(this.state.season);
        season = season + 1;
        this.setState({
            season: Number(season),
            loading: true
        }, this.searchRound);
    };

    prevSeason = (event) => {
        event.preventDefault();
        let season = Number(this.state.season);
        season = season - 1;
        this.setState({
            season: Number(season),
            loading: true
        }, this.searchRound);
    };

    nextRound = (event) => {
        event.preventDefault();
        let round = Number(this.state.round);
        round = round + 1;
        this.setState({
            round: Number(round),
            loading: true
        }, this.searchRound);
    };

    prevRound = (event) => {
        event.preventDefault();
        let round = Number(this.state.round);
        round = round - 1;
        this.setState({
            round: Number(round),
            loading: true
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
                    if(this.state.sortBy === 'points') {
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
            if(this.state.sortBy === 'laps') {
                for(let i=0; i<resultArray[0].length; i++) {
                    let driver = resultArray[0][i][0];

                    let count = resultArray[0][i][1];

                    sortWinsArray.push({count: count, driver: driver})
                }
                sortWinsArray.sort((a,b) => {
                    return Number(a.count) - Number(b.count);
                });
                sortWinsArray.reverse();
                for (let i=0; i<sortWinsArray.length; i++) {
                    winsArray[0].push([sortWinsArray[i].driver, sortWinsArray[i].count]);
                }
            }

            if(this.state.sortBy === 'points') {
                resultArray[0].unshift(['', 'Punkty']);
                this.setState({
                    data: resultArray,
                });
            } else {
                winsArray[0].unshift(['', 'Ukończone okrążenia']);
                this.setState({
                    data: winsArray,
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

            this.setState ({
                seasonNumber: seasonNumber,
                roundNumber: roundNumber,
                raceName: raceName,
                circuitName: circuitName,
                raceDate: raceDate,
                err: '',
                loading: false
            });
        }).catch(() => {
            this.setState({
                seasonNumber: 'Nie znaleziono takiego sezonu lub rundy',
                err: 'Nie znaleziono takiego sezonu lub rundy',
                loading: false
            })
        });
    };
    render() {

        let loading =
            <div className='col-10 loadingPosition'>
                <div className='loading' />
            </div>;

        let title =
            <div className='col-12'>
                <div className='title'>
                    <h1 className='title'>Wyścigi</h1>
                    <p>Wyniki wybranego wyścigu w danym sezonie ze wzlgędu na ilosć zdobytych pnktów lub ilość ukończonych okrążeń.</p>
                </div>
            </div>;

        let formAndBtn =

                <div className='col-2 formContent'>
                    <form className='formRace'>
                        <div className='formStatusWrap'>
                            <button className='buttonMini' onClick={this.prevSeason}>&lt;</button>
                            <input type="text" value={this.state.season} placeholder='Rok' onChange={this.seasonValue} />
                            <button className='buttonMini' onClick={this.nextSeason}>&gt;</button>
                        </div>
                        <div className='formStatusWrap'>
                            <button className='buttonMini' onClick={this.prevRound}>&lt;</button>
                            <input type="text" value={this.state.round} placeholder='Runda' onChange={this.roundValue} />
                            <button className='buttonMini' onClick={this.nextRound}>&gt;</button>
                        </div>
                    </form>
                    <div className="btnContent">
                        <button className='button' onClick={this.searchRound}>Szukaj Wyścigu</button>
                    </div>
                    <form className='formRace'>
                        <select onChange={this.sortByValue}>
                            <option value="points">Zdobyte punkty</option>
                            <option value="laps">Ilość okrążeń</option>
                        </select>
                        <select onChange={this.chartValue}>
                            <option value="bar">Wykres blokowy</option>
                            <option value="line">Wykres liniowy</option>
                        </select>
                    </form>
                </div>;

        let titleAndData =
            <div className='col-12'>
                <ul className='dataList'>
                    <li>Sezon: <span>{this.state.seasonNumber}</span></li>
                    <li>Runda numer: <span>{this.state.roundNumber}</span></li>
                    <li>Wyścig: <span>{this.state.raceName}</span></li>
                    <li>Tor: <span>{this.state.circuitName}</span></li>
                    <li>Data: <span>{this.state.raceDate}</span></li>
                </ul>
            </div>;

        if(this.state.seasonNumber === '' && this.state.roundNumber === '') {
            return (
                <div>
                    <div className='row'>
                        {title}
                    </div>
                    <div className='row'>
                        {titleAndData}
                    </div>
                    <div className='row'>
                        {formAndBtn}
                    </div>
                </div>
            );
        } else if(this.state.loading === true) {
            return (
                <div>
                    <div className='row'>
                        {title}
                    </div>
                    <div className='row'>
                        {titleAndData}
                    </div>
                    <div className='row'>
                        {formAndBtn}
                        {loading}
                    </div>
                </div>
            )
        } else if(this.state.err !== '' || this.state.round <= 0) {
            return (
                <div>
                    <div className='row'>
                        {title}
                    </div>
                    <div className='row'>
                        {titleAndData}
                    </div>
                    <div className='row'>
                        {formAndBtn}
                        <div className='col-10 loadingPosition'>
                            <p className='info'>Nie znaleziono takiego sezonu lub rundy</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            if(this.state.chart === 'bar') {
                return (
                    <div>
                        <div className='row'>
                            {title}
                        </div>
                        <div className='row'>
                            {titleAndData}
                        </div>
                        <div className='row'>
                            {formAndBtn}
                            <div className='col-10'>
                                <Chart
                                    key="ColumnChart"
                                    height='60vh'
                                    chartType="ColumnChart"
                                    loader={loading}
                                    data={
                                        [...this.state.data[0]]
                                    }
                                    options={{
                                        chartArea: { left: 80, right: 40, top: 20, bottom: 130 },
                                        legend: {position: 'none'},
                                        fontSize: 12,
                                        colors: ['darkorange'],
                                        animation: {
                                            duration: 500,
                                            easing: 'out',
                                            startup: true,
                                        },
                                        hAxis: {
                                            showTextEvery: 1,
                                            textStyle : {
                                                fontSize: 12
                                            },
                                            slantedText: true,
                                            slantedTextAngle: 60
                                        },
                                        vAxis: {
                                            textStyle : {
                                                fontSize: 12,
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )
            } else if(this.state.chart === 'line') {
                return (
                    <div>
                        <div className='row'>
                            {title}
                        </div>
                        <div className='row'>
                            {titleAndData}
                        </div>
                        <div className='row'>
                            {formAndBtn}
                            <div className='col-10'>
                                <Chart
                                    key="LineChart"
                                    height='60vh'
                                    chartType="LineChart"
                                    loader={loading}
                                    data={
                                        [...this.state.data[0]]
                                    }
                                    options={{
                                        chartArea: { left: 80, right: 40, top: 20, bottom: 130 },
                                        legend: {position: 'none'},
                                        fontSize: 12,
                                        colors: ['darkorange'],
                                        animation: {
                                            duration: 500,
                                            easing: 'out',
                                            startup: true,
                                        },
                                        hAxis: {
                                            showTextEvery: 1,
                                            textStyle : {
                                                fontSize: 12
                                            },
                                            slantedText: true,
                                            slantedTextAngle: 60
                                        },
                                        vAxis: {
                                            textStyle : {
                                                fontSize: 12,
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default RaceResults;
