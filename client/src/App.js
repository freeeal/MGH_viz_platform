import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path={'/'} exact component={Login} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
