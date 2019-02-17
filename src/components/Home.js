import React, { Component } from 'react';
import '../App.scss';
import Loading from './Loading';
import ChartResult from './ChartResult';
import ChartOptions from './ChartOptions';
import Title from './Title'; 

const title = 'F1stats!';
const subtitle = 'Statystyki wyścigów Formuły 1';
const description = 'Projekt przedstawia statystyki z wyścigów F1 na bazie danych udostępnionych przez ERGAST API. Na podstawie przetworzonych danych generowane są wykresy lub tabele ze statystykami dotyczącymi najszybszego sportu motorowego na świecie!';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            season: '',
            sortBy: 'points',
            chart: 'ColumnChart',
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
        let url = `https://ergast.com/api/f1/2018/driverStandings.json`;
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
        if (this.state.data === '') {
            this.searchSeason();
        }
            
        if (this.state.seasonNumber === '') {
            return (
                <Loading />
            );
        } else if(this.state.err !== '') {
            return (
                <div className='row'>
                    <ul>
                        <li>Nie znaleziono takiego sezonu</li>
                    </ul>
                </div>
            );
        } else {
            return (
                <div className='row'>
                    <div className='col-4 banner'>
                        <Title 
                            title={title}
                            subtitle={subtitle}
                            description={description}
                        />
                        <ChartOptions
                            optionA='points'
                            optionB='wins'
                            optionAText='Zdobyte punkty'
                            optionBText='Wygrane wyścigi'
                            sortBy={this.sortByValue}
                            chartType={this.chartValue}
                        />
                    </div>
                    <div className='col-8'>
                        <ChartResult
                            chartKey={this.state.chart}
                            chartType={this.state.chart}
                            chartData={this.state.data}
                        />
                    </div>
                </div>
            )
        }
    }
}

export default Home;
