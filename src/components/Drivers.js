import React, { Component } from 'react';

class Drivers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            driver: 'Lauda',
            data: [],
            driverData: '',
            loading: true,
            err: '',
        }
    }

    componentDidMount() {
        this.searchDriver();
    }

    driverValue = (event) => {
        this.setState({
            driver: event.target.value
        });
    };

    searchDriver = () => {

        this.setState({
            loading: true
        });

        let urlArr = () => {
            let arr = [];
            for(let i=1; i<=50; i++) {
                arr.push(`http://ergast.com/api/f1/drivers/${this.state.driver}/driverStandings/${i}.json`);
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
                return el.MRData.StandingsTable.StandingsLists;
            });

            let dataArr = [];

            for(let i=0; i<responseArr.length; i++) {
                dataArr.push([[],[],[],[],[],[],[]]);
            }

            let driverData = [];

            driverData.push(responseArr[0][0].DriverStandings[0].Driver.givenName + ' ' + responseArr[0][0].DriverStandings[0].Driver.familyName);
            driverData.push(responseArr[0][0].DriverStandings[0].Driver.dateOfBirth);
            driverData.push(responseArr[0][0].DriverStandings[0].Driver.nationality);

            for(let i=0; i<responseArr.length; i++) {
                dataArr[i][0].push(i+1);
                dataArr[i][1].push(responseArr[i].length);
                for(let j=0; j<responseArr[i].length; j++) {
                    dataArr[i][j+2].push(responseArr[i][j].season);
                    dataArr[i][j+2].push(responseArr[i][j].round);
                    dataArr[i][j+2].push(responseArr[i][j].DriverStandings[0].wins);
                    dataArr[i][j+2].push(responseArr[i][j].DriverStandings[0].points);
                    dataArr[i][j+2].push(responseArr[i][j].DriverStandings[0].Constructors[0].name);
                }
            }

            let dataArrResults = [];

            for(let i=0; i<dataArr.length; i++) {
                if(dataArr[i][1][0] > 0) {
                    dataArrResults.push(dataArr[i]);
                }
            }

            this.setState({
                data: dataArrResults,
                driverData: driverData,
                loading: false,
                err: ''
            })

        }).catch(() => {
            this.setState({
                driverData: [],
                loading: false,
                err: 'Nie znaleziono takiego kierowcy',
            })
        });
    };

    render() {

        let loading =
            <div className='col-10 tableContent loadingDriversPosition'>
                <div className='loading' />
            </div>;

        let title =
            <div className='col-12'>
                <div className='title'>
                    <h1>Ranking kierowców</h1>
                    <p>Statystyki wybranego kierowcy - zdobyte pozycje w klasyfikacjach generalnych.</p>
                </div>
            </div>;

        let formAndBtn =
            <div className='col-2 formContent'>
                <form className='formDriver'>
                    <input type="text" placeholder='Nazwisko' value={this.state.driver} onChange={this.driverValue} />
                </form>
                <div className='btnContent'>
                    <button className='button' onClick={this.searchDriver}>Szukaj kierowcy</button>
                </div>
            </div>;

        let driverData =
            <div className='col-12'>
                <ul className='dataList'>
                    <li>Kierowca: <span>{this.state.driverData[0]}</span></li>
                    <li>Data urodzin: <span>{this.state.driverData[1]}</span></li>
                    <li>Kraj pochodzenia: <span>{this.state.driverData[2]}</span></li>
                </ul>
            </div>;

        if (this.state.driver === '') {
            return (
                <div>
                    <div className='row'>
                        {title}
                    </div>
                    <div className='row'>
                        {driverData}
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
                        {driverData}
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
                        {driverData}
                    </div>
                    <div className='row'>
                        {formAndBtn}
                        <div className='col-10 loadingPosition'>
                            <p className='info'>{this.state.err}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className='row'>
                        {title}
                    </div>
                    <div className='row'>
                        {driverData}
                    </div>
                    <div className='row'>
                        {formAndBtn}
                        <div className='col-10'>
                            <div className='scrollTable'>
                                <table className='mainTable'>
                                    <thead>
                                        <tr>
                                            <th className='tableHeader tableBgFirst'>Pozycja</th>
                                            <th className='tableHeader tableBgSecond'>Ile razy</th>
                                            <th className='tableHeader tableBgFirst'>Sezony</th>
                                            <th className='tableHeader tableBgSecond'>Ilość rund</th>
                                            <th className='tableHeader tableBgFirst'>Wygrane rundy</th>
                                            <th className='tableHeader tableBgSecond'>Zdobyte punkty</th>
                                            <th className='tableHeader tableBgFirst'>Zespół</th>
                                        </tr>
                                    </thead>
                                    {this.state.data.map((element,index) => {
                                        let dataElement = element;
                                        return (
                                            <tbody>
                                                <tr>
                                                    <td rowspan={element[2].length} className='tableCol'>{element[0]}</td>
                                                    <td rowspan={element[2].length} className="tableCol">{element[1]}</td>
                                                        {element[2].map((element,index) => {
                                                            return (
                                                                <td className="tableCol">{element}</td>
                                                            )
                                                        }
                                                    )}
                                                </tr>
                                                {element[2].map((element,index) => {
                                                    if(index>0) {
                                                        return (
                                                            <tr>
                                                                {dataElement[index+2].map((element,index) => {
                                                                    return <td className="tableCol">{element}</td>;
                                                                })}
                                                            </tr>
                                                            )
                                                        }
                                                    })}
                                            </tbody>
                                            )
                                        })}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Drivers;
