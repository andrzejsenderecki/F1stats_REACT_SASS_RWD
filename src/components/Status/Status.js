import React, { Component } from 'react';
import ChartResult from '../Chart/ChartResult';
import Loading from '../Loading/Loading';
import Title from '../Title/Title';
import FormOptions from '../Form/FormOptions/FormOptions';
import FormInput from '../Form/FormInput/FormInput';
import Form from '../Form/Form';
import FormMove from '../FormMove/FormMove';
import DataList from '../DataList/DataList';
import DataListElement from '../DataList/DataListElement/DataListElement';
import Error from '../Error/Error';

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seasonFrom: '2015',
            seasonTo: '2018',
            chart: 'ColumnChart',
            countResults: '10',
            seasonNumber: '',
            resultLine: 0,
            move: '1',
            blockNext: false,
            err: null,
            data: null,
            loading: false,
            dateYear: ''
        }
    }

    componentDidMount() {
        this.searchSeason();
    }

    seasonFromValue = (event) => {
        this.setState({
            seasonFrom: event.target.value
        }, this.searchSeason);
    };

    seasonToValue = (event) => {
        this.setState({
            seasonTo: event.target.value
        }, this.searchSeason);
    };

    chartValue = (event) => {
        this.setState({
            chart: event.target.value
        });
    };

    countResultsValue = (event) => {
        this.setState({
            countResults: event.target.value,
            resultLine: 0,
            blockNext: false,
        }, this.searchSeason);
    };

    nextResults = () => {
        if(this.state.blockNext === false) {
            this.setState({
                resultLine: this.state.resultLine+Number(this.state.move),
            }, this.searchSeason);
        }
    };

    prevResults = () => {
        if(this.state.resultLine>0) {
            this.setState({
                resultLine: this.state.resultLine-Number(this.state.move),
                blockNext: false
            }, this.searchSeason);
        }
    };

    move = (event) => {
        this.setState({
            move: event.target.value
        }, this.searchSeason);
    };

    searchSeason = () => {

        const dateYear = new Date();

        const urlArr = () => {
            let arr = [];
            for(let i=Number(this.state.seasonFrom); i<=Number(this.state.seasonTo); i++) {
                arr.push(`https://ergast.com/api/f1/${i}/status.json`);
            }
            return arr;
        };

        const urlAddress = urlArr();

        const myPromise = urlAddress.map(element => {
            return fetch(element).then(response =>{
                return response.json();
            });
        });

        Promise.all(
            [...myPromise]
        ).then(response => {
            const responseArr = response.map(el => {
                return el.MRData.StatusTable.Status;
            });

            const dataArr = [];

            for(let i=0; i<responseArr.length; i++) {
                dataArr.push([]);
            }

            for(let i=0; i<responseArr.length; i++) {
                for(let j=0; j<135; j++) {
                    let counter = 0;
                    for(let k=0; k<responseArr[i].length; k++) {
                        if(j+1 === Number(responseArr[i][k].statusId)) {
                            dataArr[i].push(responseArr[i][k]);
                            counter = 1;
                        }
                    }
                    if(counter === 0) {
                        dataArr[i].push(undefined);
                    }
                }
            }

            const countArr = [];

            for(let i=0; i<135; i++) {
                let status = [];
                let count = 0;
                for(let j=0; j<dataArr.length; j++) {
                    if(dataArr[j][i] !== undefined) {
                        count = count + Number(dataArr[j][i].count);
                        status = dataArr[j][i].status;
                    }
                }
                if(count > 0) {
                    countArr.push({count: count, status: status});
                }
            }

            countArr.sort((a,b) => {
                return Number(a.count) - Number(b.count);
            });
            countArr.reverse();

            const displayArr = [];

            if (this.state.countResults === 'all') {
                for (let i = 0; i < countArr.length; i++) {
                    displayArr.push([countArr[i].status, countArr[i].count]);
                }
            } else if (this.state.countResults === '15') {
                let count = 15;
                if(this.state.resultLine+15 >= countArr.length) {
                    count = countArr.length % this.state.resultLine;
                    this.setState({
                        blockNext: true
                    })
                } else {
                    count = 15;
                }
                for (let i = this.state.resultLine; i<this.state.resultLine+count; i++) {
                    displayArr.push([countArr[i].status, countArr[i].count]);
                    if(count<15) {
                        this.setState({
                            blockNext: true
                        })
                    }
                }
            } else if (this.state.countResults === '10') {
                let count = 10;
                if(this.state.resultLine+10 >= countArr.length) {
                    count = countArr.length % this.state.resultLine;
                    this.setState({
                        blockNext: true
                    })
                } else {
                    count = 10;
                }
                for (let i = this.state.resultLine; i<this.state.resultLine+count; i++) {
                    displayArr.push([countArr[i].status, countArr[i].count]);
                    if(count<10) {
                        this.setState({
                            blockNext: true
                        })
                    }
                }
            } else if (this.state.countResults === '5') {
                let count = 5;
                if(this.state.resultLine+5 >= countArr.length) {
                    count = countArr.length % this.state.resultLine;
                    this.setState({
                        blockNext: true
                    })
                } else {
                    count = 5;
                }
                for (let i = this.state.resultLine; i<this.state.resultLine+count; i++) {
                    displayArr.push([countArr[i].status, countArr[i].count]);
                    if(count<5) {
                        this.setState({
                            blockNext: true
                        })
                    }
                }
            }

            displayArr.unshift(['', 'Ile razy: ']);

            this.setState({
                err: null,
                data: displayArr,
                loading: false,
                dateYear: dateYear.getFullYear()
            })
        }).catch(() => {
            this.setState({
                seasonFrom: 'Nie znaleziono takiego sezonu lub rundy',
                seasonTo: 'Nie znaleziono takiego sezonu lub rundy',
                err: 'Nie znaleziono takiego sezonu lub rundy',
                loading: false
            })
        });
    };

    render() {

        const formAndBtn =
            <div className='col-2'>
                <Form>
                    <FormInput
                        initialValue='Sezon od'
                        inputValue={this.state.seasonFrom}
                        inputAction={this.seasonFromValue}
                    />
                    <FormInput
                        initialValue='Sezon do'
                        inputValue={this.state.seasonTo}
                        inputAction={this.seasonToValue}
                    />
                    <FormOptions chartType={this.chartValue} />  
                </Form>
            </div>;

        return (
            <div>
                <div className='row'>
                    <div className='col-12'>
                        <Title 
                            title='Statusy ukończenia wyścigów'
                            description='Statystyka prezentuje przyczyny z jakich kierowcy kończyli wyścigi na przestrzeni podanych lat.'
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <DataList >
                            <DataListElement
                                text='Sezon od:'
                                value={this.state.seasonFrom}
                            />
                            <DataListElement
                                text='Sezon do:'
                                value={this.state.seasonTo}
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
                                <React.Fragment>
                                    <FormMove
                                        prevResults={this.prevResults}
                                        nextResults={this.nextResults}
                                        move={this.move}
                                        countResults={this.state.countResults}
                                        countResultsValue={this.countResultsValue}
                                    />
                                    <ChartResult
                                        chartKey={this.state.chart}
                                        chartType={this.state.chart}
                                        chartData={this.state.data}
                                    />
                                </React.Fragment>
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

export default Status;