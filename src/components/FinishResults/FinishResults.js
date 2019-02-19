import React, { Component } from 'react';
import ChartResult from '../Chart/ChartResult';
import Loading from '../Loading/Loading';
import Title from '../Title/Title';
import ChartOptions from '../Form/FormOptions/FormOptions';
import FormBtn from '../Form/FormBtn/FormBtn';

const title = 'Ranking sezonu';
const description = 'Klasyfikacja ze względu na ilość zdobytych punktów lub wygranych wyścigów w danym sezonie.';

class FinishResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            season: '2018',
            seasonNumber: '',
            roundNumber: '',
            sortBy: 'points',
            chart: 'ColumnChart',
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
        let url = `https://ergast.com/api/f1/${this.state.season}/driverStandings.json`;
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
                seasonNumber: '',
                roundNumber: '',
                loading: false,
                err: 'Nie znaleziono takiego sezonu',
            })
        });
    };

    render() {

        let error =
            <div className='col-10 loadingPosition chartContent'>
                <p className='info'>{this.state.err}</p>
            </div>;

        let formAndBtn =
            <div className='col-2 formContent'>
                <form className='formSeason'>
                    <div className='formStatusWrap'>
                        <button className='buttonMini' onClick={this.prevSeason}>&lt;</button>
                        <input type="text" placeholder='Podaj rok' value={this.state.season} onChange={this.seasonValue}/>
                        <button className='buttonMini' onClick={this.nextSeason}>&gt;</button>
                    </div>
                    <div className='formStatusWrap'>
                        <button className='buttonMini' onClick={this.prevSeason}>&lt;</button>
                        <input type="text" placeholder='Podaj rok' value={this.state.season} onChange={this.seasonValue}/>
                        <button className='buttonMini' onClick={this.nextSeason}>&gt;</button>
                    </div>
                    <div className='formStatusWrap'>
                        <button className='buttonMini' onClick={this.prevSeason}>&lt;</button>
                        <input type="text" placeholder='Podaj rok' value={this.state.season} onChange={this.seasonValue}/>
                        <button className='buttonMini' onClick={this.nextSeason}>&gt;</button>
                    </div>
                </form>
                <FormBtn text='Szukaj sezonu' action={this.searchSeason} />
                <ChartOptions
                    optionA='points'
                    optionB='wins'
                    optionAText='Zdobyte punkty'
                    optionBText='Wygrane wyścigi'
                    sortBy={this.sortByValue}
                    chartType={this.chartValue}
                />
            </div>;

        let seasonData =
            <div className='col-12'>
                <ul className='dataList'>
                    <li>Sezon: <span>{this.state.seasonNumber}</span></li>
                    <li>Ilość rund: <span>{this.state.roundNumber}</span></li>
                </ul>
            </div>;

        if (this.state.data === '') {
            return (
                <div>
                    <div className='row'>
                        <Title 
                            title={title}
                            description={description}
                        />
                    </div>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            );
        } else if(this.state.loading === true) {
            return (
                <div>
                    <div className='row'>
                        <Title 
                            title={title}
                            description={description}
                        />
                    </div>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            )
        } else if(this.state.err !== '') {
            return (
                <div>
                    <div className='row'>
                        <Title 
                            title={title}
                            description={description}
                        />
                    </div>
                    <div className='row'>
                        {seasonData}
                    </div>
                    <div className='row'>
                        {formAndBtn}
                        {error}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className='row'>
                        <div className='col-12 title'>
                            <Title 
                                title={title}
                                description={description}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        {seasonData}
                    </div>
                    <div className='row'>
                        {formAndBtn}
                        <div className='col-10'>
                                <ChartResult
                                    chartKey={this.state.chart}
                                    chartType={this.state.chart}
                                    chartData={this.state.data}
                                />
                            </div>
                    </div>
                </div>
            )
        }
    }
}

export default FinishResults;
