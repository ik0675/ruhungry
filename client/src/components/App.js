import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
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
    this.socket = io('localhost:4000'); // connect to socket.io on server
    this.checkSession(); // check session and login if possible

    this.handleLoginId = this.handleLoginId.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLoginId(user) {
    this.setState({
      id: user.id,
      name: user.name
    });
    this.socket.emit('loggedIn', user);
  }

  checkSession = async () => {
    if (this.state.id === '') {
      try {
        let sessionId = sessionStorage.getItem('sessionId');
        if (typeof sessionId !== 'undefined') {
          // session id is set. try logging in
          const res = await fetch('/api/login/session', {
            method : 'POST',
            headers: {
                        'Content-Type': 'application/json'
                     },
            body   : JSON.stringify({sessionId})
          });
          const loginInfo = await res.json();
          if (loginInfo.status) {
            // redirect to mainPage
            await this.handleLoginId(loginInfo.user);
            //React Route Built-in (push -> redirect)
            this.props.history.push("/main");
            return;
          }
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  handleLogout = async () => {
    await this.setState({
      id: '',
      name: '',
    });
    sessionStorage.removeItem('sessionId');
    this.props.history.push('/');
  }

  render() {
    return (
        <div>
          <Route exact path="/" component={
            () => <LoginPage handleLoginId={this.handleLoginId} />} />
          <Route path="/main" component={
            () => <Main user={this.state}
                        handleLogout={this.handleLogout}/>} />
        </div>
    );
  }
}

export default withRouter(App);
