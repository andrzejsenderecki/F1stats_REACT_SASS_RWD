import React, { Component } from 'react';
import ChartResult from '../Chart/ChartResult';
import Loading from '../Loading/Loading';
import Title from '../Title/Title';
import FormOptions from '../Form/FormOptions/FormOptions';
import FormInput from '../Form/FormInput/FormInput';
import Form from '../Form/Form';
import DataList from '../DataList/DataList';
import DataListElement from '../DataList/DataListElement/DataListElement';
import Error from '../Error/Error';

class FinishResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            season: '2018',
            seasonNumber: null,
            roundNumber: null,
            sortBy: 'points',
            chart: 'ColumnChart',
            err: null,
            data: null,
            loading: false
        }
    }

    componentDidMount() {
        this.searchSeason();
    }

    seasonValue = (event) => {
        this.setState({
            season: event.target.value
        }, this.searchSeason);
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

    searchSeason = () => {
        const url = `https://ergast.com/api/f1/${this.state.season}/driverStandings.json`;

        fetch(url).then(resp => {
            return resp.json();
        }).then(json => {

            const resultArray = json.MRData.StandingsTable.StandingsLists.map((element) => {
                const result = element.DriverStandings.map((element) => {
                    const data = [];
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

            const sortWinsArray = [];
            const winsArray = [[]];
            if(this.state.sortBy === 'wins') {
                for(let i=0; i<resultArray[0].length; i++) {
                    const driver = resultArray[0][i][0];

                    const count = resultArray[0][i][1];

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

            const seasonNumber = json.MRData.StandingsTable.season;

            const roundNumber = json.MRData.StandingsTable.StandingsLists.map((element) => {
                return element.round;
            });

            this.setState({
                seasonNumber: seasonNumber,
                roundNumber: roundNumber,
                loading: false,
                err: null,
            });
        }).catch(() => {
            this.setState({
                seasonNumber: null,
                roundNumber: null,
                loading: false,
                err: 'Nie znaleziono takiego sezonu',
            })
        });
    };

    render() {
        const formAndBtn =
            <div className='col-2'>
                <Form>
                    <FormInput
                        type='number'
                        initialValue='Podaj rok'
                        inputValue={this.state.season}
                        inputAction={this.seasonValue}
                    />
                    <FormOptions
                        optionA='points'
                        optionB='wins'
                        optionAText='Zdobyte punkty'
                        optionBText='Wygrane wyścigi'
                        sortBy={this.sortByValue}
                        chartType={this.chartValue}
                    />  
                </Form>
            </div>;

        return (
            <React.Fragment>
                <div className='row'>
                    <div className='col-12'>
                        <Title
                            styles='title' 
                            title='Ranking sezonu'
                            description='Klasyfikacja ze względu na ilość zdobytych punktów lub wygranych wyścigów w danym sezonie.'
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <DataList >
                            <DataListElement
                                text='Sezon:'
                                value={this.state.seasonNumber}
                            />
                            <DataListElement
                                text='Ilość rund:'
                                value={this.state.roundNumber}
                            />
                        </DataList>
                    </div>
                </div>
                { this.state.data ? (
                    <div className='row'>
                        {formAndBtn}
                        <div className='col-10'>
                            { this.state.err ? (
                                <Error error={this.state.err} />
                            ) : (
                                <ChartResult
                                    chartKey={this.state.chart}
                                    chartType={this.state.chart}
                                    chartData={this.state.data[0]}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='row'>
                        {formAndBtn}
                    <div className='col-10'>
                        <Loading />
                    </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default FinishResults;