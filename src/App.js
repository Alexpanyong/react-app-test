import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';
import { Route1 } from './components/Route1/Route1';
import { Route2 } from './components/Route2/Route2';
import createBrowserHistory from 'history/createBrowserHistory';

class App extends Component {

  render() {
    const history = createBrowserHistory();
    return (
      <div className="App">
        <div className="App-intro">
          <Router history={history}>
            <div>
              <ul className="appNavigation">
                <li>
                  <Link to="/">Route 1</Link>
                </li>
                <li>
                  <Link to="/route2">Route 2</Link>
                </li>
              </ul>
              <hr />
              <Route exact path="/" component={Route1} />
              <Route path="/route2" component={Route2} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
