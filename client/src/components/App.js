import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import io from 'socket.io-client';

import LoginPage from './login';
import Main from './main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
    };
    this.socket = io('localhost:4000');

    this.handleLoginId = this.handleLoginId.bind(this);
  }

  handleLoginId(user) {
    this.setState({
      id: user.id,
      name: user.name
    });
    this.socket.emit('loggedIn', user);
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={
            () => <LoginPage handleLoginId={this.handleLoginId} />} />
          <Route path="/main" component={
            () => <Main user={this.state} />} />
        </div>
      </Router>
    );
  }
}

export default App;
