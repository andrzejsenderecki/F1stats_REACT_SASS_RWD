import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import CurrentSeason from './components/CurrentSeason';
import FinishResults from './components/FinishResults';
import RaceResults from './components/RaceResults';
import Drivers from './components/Drivers';
import ReasonsForEndingRaces from "./components/ReasonsForEndingRaces";
import Home from './components/Home';
import Footer from './components/Footer';
import './App.scss';

class App extends Component {
  render() {
    return (
        <div>
          <BrowserRouter>
              <div>
                <Navigation />
                <Switch>
                    <Route path='/' component={Home} exact />
                    <Route path='/season' component={FinishResults} />
                    <Route path='/race' component={RaceResults} />
                    <Route path='/drivers' component={Drivers} />
                    <Route path='/current' component={CurrentSeason} />
                    <Route path='/reason' component={ReasonsForEndingRaces} />
                    <Route component={NotFound} exact />
                </Switch>
              </div>
          </BrowserRouter>
          <Footer />
        </div>
    );
  }
}

export default App;
