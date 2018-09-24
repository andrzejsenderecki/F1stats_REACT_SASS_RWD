import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import CurrentSeason from './components/CurrentSeason';
import FinishResults from './components/FinishResults';
import RaceResults from './components/RaceResults';
import Home from './components/Home'
import './App.css';

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
                    <Route path='/current' component={CurrentSeason} />
                    <Route component={NotFound} exact />
                </Switch>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;