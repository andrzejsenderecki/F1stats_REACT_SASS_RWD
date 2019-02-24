import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import Title from '../Title/Title';
import FormBtn from '../Form/FormBtn/FormBtn';
import FormInput from '../Form/FormInput/FormInput';
import Form from '../Form/Form';
import DataList from '../DataList/DataList';
import DataListElement from '../DataList/DataListElement/DataListElement';
import Error from '../Error/Error';

class Drivers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            driver: 'Lauda',
            data: null,
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

    searchBtn = () => {
        this.setState({
            data: [],
            driverData: '',
            err: ''
        }, this.searchDriver);
    }

    searchDriver = () => {

        this.setState({
            loading: true
        });

        let driver = `https://ergast.com/api/f1/drivers/${this.state.driver}.json`;
        fetch(driver).then(resp => {
            return resp.json();
        }).then(json => {
            let driverData = [];
            driverData.push(json.MRData.DriverTable.Drivers[0].givenName + ' ' + json.MRData.DriverTable.Drivers[0].familyName);
            driverData.push(json.MRData.DriverTable.Drivers[0].dateOfBirth);
            driverData.push(json.MRData.DriverTable.Drivers[0].nationality);

            this.setState({
                driverData: driverData,
            })

            let urlArr = () => {
                let arr = [];
                for(let i=1; i<=50; i++) {
                    arr.push(`https://ergast.com/api/f1/drivers/${this.state.driver}/driverStandings/${i}.json`);
                }
                return arr;
            };

            let urlAddress = urlArr();

            let myPromise = urlAddress.map(element => {
                return fetch(element).then(response => {
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
                    loading: false,
                    err: ''
                })

            }).catch(() => {
                this.setState({
                    driverData: [],
                    loading: false,
                    err: 'Coś poszło nie tak.',
                })
            });
        }).catch(() => {
            this.setState({
                driverData: [],
                loading: false,
                err: 'Nie znaleziono takiego kierowcy',
            })
        });
    };

    render() {
        let formAndBtn =
            <div className='col-2'>
                <Form>
                    <FormInput
                        type='text'
                        initialValue='Nazwisko kierowcy'
                        inputValue={this.state.driver}
                        inputAction={this.driverValue}
                    />
                    <FormBtn
                        text='Szukaj kierowcy'
                        action={this.searchBtn}
                    />  
                </Form>
            </div>;

        return (
            <React.Fragment>
                <div className='row'>
                    <div className='col-12'>
                        <Title
                            styles='title' 
                            title='Ranking kierowców'
                            description='Statystyki wybranego kierowcy - zdobyte pozycje w klasyfikacjach generalnych.'
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <DataList >
                            <DataListElement
                                text='Kierowca:'
                                value={this.state.driverData[0]}
                            />
                            <DataListElement
                                text='Data urodzin:'
                                value={this.state.driverData[1]}
                            />
                            <DataListElement
                                text='Kraj pochodzenia:'
                                value={this.state.driverData[2]}
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

export default Drivers;