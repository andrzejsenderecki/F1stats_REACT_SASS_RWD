import React, { Component } from 'react';
import Chart from 'react-google-charts';

class ReasonsForEndingRaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seasonFrom: '2010',
            seasonTo: '2018',
            chart: 'bar',
            countResults: '10',
            seasonNumber:'',
            resultLine: 0,
            move: '1',
            err: '',
            data: '',
            loading: false
        }
    }

    componentDidMount() {
        this.searchSeason();
    }

    seasonFromValue = (event) => {
        this.setState({
            seasonFrom: event.target.value
        });
    };

    seasonToValue = (event) => {
        this.setState({
            seasonTo: event.target.value
        });
    };

    chartValue = (event) => {
        this.setState({
            chart: event.target.value
        });
    };

    countResultsValue = (event) => {
        this.setState({
            countResults: event.target.value
        }, this.searchSeason);
    };

    nextSeasonPrev = (event) => {
        event.preventDefault();
        let season = Number(this.state.seasonTo);
        season = season - 1;
        this.setState({
            seasonTo: Number(season),
            loading: true
        }, this.searchSeason);
    };

    prevSeasonNext = (event) => {
        event.preventDefault();
        let season = Number(this.state.seasonFrom);
        season = season + 1;
        this.setState({
            seasonFrom: Number(season),
            loading: true
        }, this.searchSeason);
    };

    prevSeasonPrev = (event) => {
        event.preventDefault();
        let season = Number(this.state.seasonFrom);
        season = season - 1;
        this.setState({
            seasonFrom: Number(season),
            loading: true
        }, this.searchSeason);
    };

    nextSeasonNext = (event) => {
        event.preventDefault();
        let season = Number(this.state.seasonTo);
        season = season + 1;
        this.setState({
            seasonTo: Number(season),
            loading: true
        }, this.searchSeason);
    };

    nextResults = () => {
        this.setState({
            resultLine: this.state.resultLine+Number(this.state.move),
        }, this.searchSeason);
    };

    prevResults = () => {
        this.setState({
            resultLine: this.state.resultLine-Number(this.state.move),
        }, this.searchSeason);
    };

    move = (event) => {
        this.setState({
            move: event.target.value
        }, this.searchSeason);
    };

    searchSeason = () => {
        let urlArr = () => {
            let arr = [];
            for(let i=Number(this.state.seasonFrom); i<=Number(this.state.seasonTo); i++) {
                arr.push(`http://ergast.com/api/f1/${i}/status.json`);
            }
            return arr;
        };

        let urlAddress = urlArr();

        let myPromise = urlAddress.map(element => {
            return fetch(element).then(response =>{
                return response.json();
            });
        });

        Promise.all(
            [...myPromise]
        ).then(response => {
            let responseArr = response.map(el => {
                return el.MRData.StatusTable.Status;
            });

            let dataArr = [];

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

            let countArr = [];

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

            let displayArr = [];

            if (this.state.countResults === 'all') {
                for (let i = 0; i < countArr.length; i++) {
                    displayArr.push([countArr[i].status, countArr[i].count]);

                }
            } else if (this.state.countResults === '15') {
                for(let i=this.state.resultLine; i<this.state.resultLine+15; i++) {
                    displayArr.push([countArr[i].status, countArr[i].count]);
                }
            } else if (this.state.countResults === '10') {
                for (let i = this.state.resultLine; i<this.state.resultLine+10; i++) {
                    displayArr.push([countArr[i].status, countArr[i].count]);
                }
            } else if (this.state.countResults === '5') {
                for (let i = this.state.resultLine; i<this.state.resultLine+5; i++) {
                    displayArr.push([countArr[i].status, countArr[i].count]);
                }
            }

            displayArr.unshift(['', 'Ile razy: ']);

            this.setState({
                err: '',
                data: displayArr,
                loading: false
            })
        }).catch((err) => {
            this.setState({
                seasonFrom: 'Nie znaleziono takiego sezonu lub rundy',
                seasonTo: 'Nie znaleziono takiego sezonu lub rundy',
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
                    <h1 className='title'>Statusy ukończenia wyścigów</h1>
                    <p>Statystyka prezentuje przyczyny z jakich kierowcy kończyli wyścigi na przestrzeni podanych lat</p>
                </div>
            </div>;

        let formAndBtn =
            <div className='col-2 formContent'>
                <form className='formStatus'>
                    <div className='formStatusWrap'>
                        <button className='buttonMini' onClick={this.prevSeasonPrev}>&lt;</button>
                        <input type="text" placeholder='Od' value={this.state.seasonFrom}
                               onChange={this.seasonFromValue}/>
                        <button className='buttonMini' onClick={this.prevSeasonNext}>&gt;</button>
                    </div>
                    <div className='formStatusWrap'>
                        <button className='buttonMini' onClick={this.nextSeasonPrev}>&lt;</button>
                        <input type="text" placeholder='Do' value={this.state.seasonTo}
                               onChange={this.seasonToValue}/>
                        <button className='buttonMini' onClick={this.nextSeasonNext}>&gt;</button>
                    </div>
                </form>
                <div className='btnContent '>
                    <button type='button' className='button' onClick={this.searchSeason}>Szukaj Sezonu</button>
                </div>
                <form className='formStatus'>
                    <select onChange={this.chartValue}>
                        <option value="bar">Wykres blokowy</option>
                        <option value="line">Wykres liniowy</option>
                    </select>
                </form>
            </div>;

        let titleAndRaces =
            <div className='col-12'>
                <ul className='dataList'>
                    <li>Sezony od <span>{this.state.seasonFrom}</span> do <span>{this.state.seasonTo}</span></li>
                </ul>
            </div>;

        if (this.state.seasonFrom === '' || this.state.data === '') {
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
                            {titleAndRaces}
                        </div>
                        <div className='row'>
                            {formAndBtn}
                            <div className='col-10'>
                                    <form className='formStatusMove'>
                                        <button type='button' className='buttonMove buttonMoveLeft' onClick={this.prevResults}>&lt;</button>
                                        <button type='button' className='buttonMove buttonMoveRight' onClick={this.nextResults}>&gt;</button>
                                        <select onChange={this.move}>
                                            <option value='1'>Przewiń wyniki o 1</option>
                                            <option value='3'>Przewiń wyniki o 3</option>
                                            <option value='5'>Przewiń wyniki o 5</option>
                                            <option value='10'>Przewiń wyniki o 10</option>
                                        </select>
                                        <select value={this.state.countResults} onChange={this.countResultsValue}>
                                            <option value='all'>Pokaż wszystkie</option>
                                            <option value='5'>Pokaż 5 wyników</option>
                                            <option value='10'>Pokaż 10 wyników</option>
                                            <option value='15'>Pokaż 15 wyników</option>
                                        </select>
                                    </form>
                                <Chart
                                    key="ColumnChart"
                                    height='70vh'
                                    chartType="ColumnChart"
                                    data={
                                        [...this.state.data]
                                    }
                                    options={{
                                        chartArea: { left: 80, right: 40, top: 20, bottom: 130 },
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
                                    <form className='formStatusMove'>
                                        <button type='button' className='buttonMoveLeft' onClick={this.prevResults}>&lt;</button>
                                        <button type='button' className='buttonMoveRight' onClick={this.nextResults}>&gt;</button>
                                        <select onChange={this.move}>
                                            <option value='1'>Przewiń wyniki o 1</option>
                                            <option value='3'>Przewiń wyniki o 3</option>
                                            <option value='5'>Przewiń wyniki o 5</option>
                                            <option value='10'>Przewiń wyniki o 10</option>
                                        </select>
                                        <select value={this.state.countResults} onChange={this.countResultsValue}>
                                            <option value='all'>Pokaż wszystkie</option>
                                            <option value='5'>Pokaż 5 wyników</option>
                                            <option value='10'>Pokaż 10 wyników</option>
                                            <option value='15'>Pokaż 15 wyników</option>
                                        </select>
                                    </form>
                                <Chart
                                    key="ColumnChart"
                                    height='70vh'
                                    chartType="ColumnChart"
                                    data={
                                        [...this.state.data]
                                    }
                                    options={{
                                        chartArea: { left: 80, right: 40, top: 20, bottom: 130 },
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

export default ReasonsForEndingRaces;
