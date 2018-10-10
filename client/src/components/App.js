import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ''
    };
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={Login} />
      </Router>
    );
  }
}

export default App;
