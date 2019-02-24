import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
// import NotFound from './components/NotFound';
// import CurrentSeason from './components/CurrentSeason';
import FinishResults from './components/FinishResults/FinishResults';
import RaceResults from './components/RaceResults/RaceResults';
// import Drivers from './components/Drivers';
import Status from "./components/Status/Status";
import Home from './components/Home/Home';
// import About from './components/About';
// import Contact from './components/Contact';
import Footer from './components/Footer/Footer';
import './App.scss';

class App extends Component {
  render() {
    return (
        <div>
          <HashRouter>
              <div>
                <Navigation />
                <Switch>
                    <Route path='/' component={Home} exact />
                    <Route path='/season' component={FinishResults} />
                    <Route path='/race' component={RaceResults} />
                    {/* <Route path='/drivers' component={Drivers} 
                    <Route path='/current' component={CurrentSeason} />/>*/}
                    <Route path='/status' component={Status} />
                    {/*<Route path='/about' component={About} />
                    <Route path='/contact' component={Contact} />
                    <Route component={NotFound} exact /> */} 
                </Switch>
              </div>
          </HashRouter>
          <Footer />
        </div>
    );
  }
}

export default App;
