import React, { Component } from 'react';
import Chart from 'react-google-charts';

class FinishResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            season: '2018',
            sortBy: 'points',
            chart: 'bar',
            seasonNumber:'',
            err: '',
            data: '',
            loading: false
        }
    }

    componentDidMount() {
        this.searchSeason();
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

    nextSeason = (event) => {
        event.preventDefault();
        let season = Number(this.state.season);
        season = season + 1;
        this.setState({
            season: Number(season),
            loading: true
        }, this.searchSeason);
    };

    prevSeason = (event) => {
        event.preventDefault();
        let season = Number(this.state.season);
        season = season - 1;
        this.setState({
            season: Number(season),
            loading: true
        }, this.searchSeason);
    };

    searchSeason = () => {
        let url = `http://ergast.com/api/f1/${this.state.season}/driverStandings.json`;
        fetch(url).then(resp => {
            return resp.json();
        }).then(json => {

            let resultArray = json.MRData.StandingsTable.StandingsLists.map((element) => {
                let result = element.DriverStandings.map((element) => {
                    let data = [];
                    data.push(element.Driver.familyName);
                    if(this.state.sortBy === 'points') {
                        data.push(Number(element.points));
                    } else {
                        data.push(Number(element.wins));
                    }
                    return data;
                });
                return result;
            });

            let sortWinsArray = [];
            let winsArray = [[]];
            if(this.state.sortBy === 'wins') {
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
                winsArray[0].unshift(['', 'Wygrane rundy']);
                this.setState({
                    data: winsArray,
                });
            }

            let seasonNumber = json.MRData.StandingsTable.season;

            let roundNumber = json.MRData.StandingsTable.StandingsLists.map((element) => {
                return element.round;
            });

            this.setState({
                seasonNumber: seasonNumber,
                roundNumber: roundNumber,
                loading: false,
                err: '',
            })

        }).catch(() => {
            this.setState({
                seasonNumber: 'Nie znaleziono takiego sezonu',
                loading: false,
                err: 'Nie znaleziono takiego sezonu',
            })
        });
    };

    render() {

        let loading =
            <div className='col-10 chartContent loadingPosition'>
                <div className='loading' />
            </div>;

        let title =
            <div className='col-12'>
                <div className='title'>
                    <h1 className='title'>Ranking sezonu</h1>
                    <p>Klasyfikacja ze względu na ilość zdobytych punktów lub wygranych wyścigów w danym
                        sezonie.</p>
                </div>
            </div>;

        let formAndBtn =
            <div className='col-2 formContent'>
                <form className='formSeason'>
                <div className='formStatusWrap'>
                    <button className='buttonMini' onClick={this.prevSeason}>&lt;</button>
                    <input type="text" placeholder='Podaj rok' value={this.state.season} onChange={this.seasonValue}/>
                    <button className='buttonMini' onClick={this.nextSeason}>&gt;</button>
                </div>
                </form>
                <div className='btnContent'>
                    <button className='button' onClick={this.searchSeason}>Szukaj Sezonu</button>
                </div>
                <form className='formSeason'>
                    <select onChange={this.sortByValue}>
                        <option value="points">Zdobyte punkty</option>
                        <option value="wins">Wygrane wyścigi</option>
                    </select>
                    <select onChange={this.chartValue}>
                        <option value="bar">Wykres blokowy</option>
                        <option value="line">Wykres liniowy</option>
                    </select>
                </form>
            </div>;

        let titleAndRaces =
            <div className='col-12'>
                <ul className='dataList'>
                    <li>Sezon: <span>{this.state.seasonNumber}</span></li>
                    <li>Ilość rund: <span>{this.state.roundNumber}</span></li>
                </ul>
            </div>;

        if (this.state.seasonNumber === '') {
            return (
                <div>
                    <div className='row'>
                        {title}
                    </div>
                    <div className='row'>
                        {titleAndRaces}
                    </div>
                    <div className='row'>
                        {formAndBtn}
                        {loading}
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
                        {titleAndRaces}
                    </div>
                    <div className='row'>
                        {formAndBtn}
                        {loading}
                    </div>
                </div>
            )
        } else if(this.state.err !== '') {
            return (
                <div>
                    <div className='row'>
                        {title}
                    </div>
                    <div className='row'>
                        {titleAndRaces}
                    </div>
                    <div className='row'>
                        {formAndBtn}
                        <div className='col-10 loadingPosition'>
                            <p className='info'>Nie znaleziono takiego sezonu</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            if(this.state.chart === 'bar') {
                return (
                    <div>
                        <div className='row'>
                            {title}
                        </div>
                        <div className='row'>
                            {titleAndRaces}
                        </div>
                        <div className='row'>
                            {formAndBtn}
                            <div className='col-10'>
                                <div className='chartContent'>
                                    <Chart
                                        key="ColumnChart"
                                        height='100%'
                                        chartType="ColumnChart"
                                        data={
                                            [...this.state.data[0]]
                                        }
                                        options={{
                                            chartArea: { left: 80, right: 60, top: 20, bottom: 130 },
                                            legend: {position: 'none'},
                                            fontSize: 12,
                                            colors: ['darkorange'],
                                            animation: {
                                                duration: 1000,
                                                easing: 'out',
                                                startup: true,
                                            },
                                            hAxis: {
                                                showTextEvery: 1,
                                                textStyle : {
                                                    fontSize: 14
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
                    </div>
                )
            } else if (this.state.chart === 'line') {
                return (
                    <div>
                        <div className='row'>
                            {title}
                        </div>
                        <div className='row'>
                            {titleAndRaces}
                        </div>
                        <div className='row'>
                            {formAndBtn}
                            <div className='col-10'>
                                <div className='chartContent'>
                                    <Chart
                                        key="LineChart"
                                        height='100%'
                                        chartType="LineChart"
                                        data={
                                            [...this.state.data[0]]
                                        }
                                        options={{
                                            chartArea: { left: 80, right: 60, top: 20, bottom: 130 },
                                            legend: {position: 'none'},
                                            fontSize: 12,
                                            colors: ['darkorange'],
                                            animation: {
                                                duration: 1000,
                                                easing: 'out',
                                                startup: true,
                                            },
                                            hAxis: {
                                                showTextEvery: 1,
                                                textStyle : {
                                                    fontSize: 14
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
                    </div>
                )
            }
        }
    }
}

export default FinishResults;
