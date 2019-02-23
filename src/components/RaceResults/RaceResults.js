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

class RaceResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            season: '2018',
            round: '1',
            sortBy: 'points',
            chart: 'ColumnChart',
            seasonNumber:null,
            roundNumber: null,
            raceName: null,
            circuitName: null,
            raceDate: null,
            err: null,
            data: null,
            loading: true,
        }
    }

    componentDidMount() {
        this.searchRound();
    }

    seasonValue = (event) => {
        this.setState({
            season: event.target.value
        }, this.searchRound)
    };

    roundValue = (event) => {
        this.setState({
            round: event.target.value
        }, this.searchRound)
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

        const url = `https://ergast.com/api/f1/${this.state.season}/${this.state.round}/results.json`;
        fetch(url).then(resp => {
            return resp.json();
        }).then(json => {

            const resultArray = json.MRData.RaceTable.Races.map((element) => {
                const result = element.Results.map((element) => {
                    const data = [];
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

            const sortWinsArray = [];
            const winsArray = [[]];
            if(this.state.sortBy === 'laps') {
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
                winsArray[0].unshift(['', 'Ukończone okrążenia']);
                this.setState({
                    data: winsArray,
                });
            }

            const seasonNumber = json.MRData.RaceTable.Races.map((element) => {
                return element.season;
            });

            const roundNumber = json.MRData.RaceTable.Races.map((element) => {
                return element.round;
            });

            const raceName = json.MRData.RaceTable.Races.map((element) => {
                return element.raceName;
            });

            const circuitName = json.MRData.RaceTable.Races.map((element) => {
                return element.Circuit.circuitName;
            });

            const raceDate = json.MRData.RaceTable.Races.map((element) => {
                return element.date;
            });

            this.setState ({
                seasonNumber: seasonNumber,
                roundNumber: roundNumber,
                raceName: raceName,
                circuitName: circuitName,
                raceDate: raceDate,
                err: null,
                loading: false
            });
        }).catch(() => {
            this.setState({
                seasonNumber:null,
                roundNumber: null,
                raceName: null,
                circuitName: null,
                raceDate: null,
                seasonNumber: null,
                err: 'Nie znaleziono takiego sezonu lub rundy',
                loading: false
            })
        });
    };

    render() {

        let formAndBtn =
            <div className='col-2'>
                <Form>
                    <FormInput
                        initialValue='Podaj rok'
                        inputValue={this.state.season}
                        inputAction={this.seasonValue}
                    />
                    <FormInput
                        initialValue='Podaj rundę'
                        inputValue={this.state.round}
                        inputAction={this.roundValue}
                    />
                    <FormOptions
                        optionA='points'
                        optionB='laps'
                        optionAText='Zdobyte punkty'
                        optionBText='Ilość okrążeń'
                        sortBy={this.sortByValue}
                        chartType={this.chartValue}
                    />  
                </Form>
            </div>;

        return (
            <div>
                <div className='row'>
                    <div className='col-12 title'>
                        <Title 
                            title='Wyścigi'
                            description='Wyniki wybranego wyścigu w danym sezonie ze względu na ilość zdobytych punktów lub ilość ukończonych okrążeń.'
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
                                text='Runda:'
                                value={this.state.roundNumber}
                            />
                            <DataListElement
                                text='Wyścig:'
                                value={this.state.raceName}
                            />
                            <DataListElement
                                text='Data:'
                                value={this.state.raceDate}
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
                                    chartData={this.state.data}
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
            </div>
        );    
    }
}

export default RaceResults;