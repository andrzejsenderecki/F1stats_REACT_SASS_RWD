import React, { Component } from 'react';
import '../App.scss';
import Chart from 'react-google-charts';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            season: '',
            sortBy: 'points',
            chart: 'bar',
            seasonNumber:'',
            err: '',
            data: '',
            loading: true
        }
    }

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

    searchSeason = () => {
        let url = `http://ergast.com/api/f1/2018/driverStandings.json`;
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
                seasonNumber: 'Error',
                err: 'Error',
            })
        });
    };

    render() {

        let loading =
            <div className='col-8 loadingHomePosition'>
                <div className='loading'/>
            </div>;

        let loadingChart =
            <div className='col-8 loadingHomeChartPosition'>
                <div className='loading'/>
            </div>;

        if (this.state.data === '') {
            this.searchSeason();
        }

        let formAndBtn =
            <div>
                <form className='formBanner'>
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

        let banner =
            <div className='col-4 banner'>
                <h1>F1stats!</h1>
                <h5>Statystyki wyścigów Formuły 1</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus hic iste nostrum numquam quaerat
                    quibusdam! Fugiat natus necessitatibus non veniam? Eos eum omnis unde? A adipisci.</p>
            </div>;

        let bannerAndBtn =
            <div className='col-4 banner'>
                <h1>F1stats!</h1>
                <h5>Statystyki wyścigów Formuły 1</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus hic iste nostrum numquam quaerat
                    quibusdam! Fugiat natus necessitatibus non veniam? Eos eum omnis unde? A adipisci.</p>
                {formAndBtn}
            </div>;

        if (this.state.seasonNumber === '') {
            return (
                <div className='row'>
                    {banner}
                    {loading}
                </div>
            );
        } else if(this.state.err !== '') {
            return (
                <div className='row'>
                    {banner}
                    <ul className='dataList'>
                        <li>Nie znaleziono takiego sezonu</li>
                    </ul>
                </div>
            );
        } else {
            if(this.state.chart === 'bar') {
                return (
                    <div className='row'>
                        {bannerAndBtn}
                        <div className='col-8'>
                            <div className='chartSize'>
                            <Chart
                                key="ColumnChart"
                                height='80vh'
                                chartType="ColumnChart"
                                loader={loadingChart}
                                data={
                                    [...this.state.data[0]]
                                }
                                options={{
                                    chartArea: { left: 60, right: 60, top: 60, bottom: 100 },
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
                                        slantedTextAngle: 60,
                                        title: 'Ranking sezonu 2018'
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
            } else if (this.state.chart === 'line') {
                return (
                    <div className='row'>
                        {bannerAndBtn}
                        <div className='col-8'>
                            <Chart
                                key="LineChart"
                                height={500}
                                chartType="LineChart"
                                loader={loadingChart}
                                data={
                                    [...this.state.data[0]]
                                }
                                options={{
                                    chartArea: { left: 100, right: 100, top: 60, bottom: 100 },
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
                                        slantedTextAngle: 60,
                                        title: 'Ranking sezonu 2018'
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
                )
            }
        }
    }
}

export default Home;
