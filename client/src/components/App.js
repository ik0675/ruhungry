import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import io from 'socket.io-client';

import LoginPage from './login';
import Main from './main';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: 'pending',
      id: '',
      name: '',
    }

    this.socket = io('localhost:4000'); // connect to socket.io on server
    this.isLogin = false;

    if (!this.isLogin) {
      this.checkSession()
        .then((loginInfo) => {
          if (loginInfo === null) {
            this.setState({
              isLogin: 'false',
            });
          }
          else {
            console.log('login successful');
            this.setState({
              isLogin: 'true',
              id: loginInfo.user.id,
              name: loginInfo.user.name,
            });
            console.log('emiting log in...');
            this.socket.emit('login', {id: loginInfo.user.id, name: loginInfo.user.name});
          }
          this.isLogin = true;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    this.handleLogout = this.handleLogout.bind(this);
  }

  checkSession = async () => {
    console.log('checking session...');
    try {
      let sessionId = sessionStorage.getItem('sessionId');
      if (sessionId !== null) {
        // session id is set. try logging in
        console.log('session id set. trying logging in...');
        const res = await fetch('/api/login/session', {
          method : 'POST',
          headers: {
                      'Content-Type': 'application/json'
                   },
          body   : JSON.stringify({sessionId})
        });
        const loginInfo = await res.json();
        return loginInfo;
      } else {
        console.log('no session id.');
      }
    }
    catch (err) {
      console.log(err);
    }
    return null;
  }

  handleLogin = async(user) => {
    this.setState({
      isLogin: 'true',
      id: user.id,
      name: user.name,
    });
    this.socket.emit('login', user);

    let pathname = this.props.location.state ? this.props.location.state : '/main';
    console.log('redirecting to ', pathname + this.props.location.search);
    this.props.history.push(pathname + this.props.location.search);
  }

  handleLogout = async () => {
    await this.setState({
      isLogin: 'false',
      id: '',
      name: '',
    });
    console.log('logging out');
    this.socket.emit('logout');
    sessionStorage.removeItem('sessionId'); // remove stored sessionId
    this.props.history.push('/');
  }

  render() {
    if (this.state.isLogin === 'pending') {
      return(
        <div>
          checking session for login...
        </div>
      );
    }
    return (
        <div>
          <Route exact path='/' component={
            () => <LoginPage handleLogin={this.handleLogin} />} />
          <Route path="/main" component={
            () => <Main isLogin={this.state.isLogin}
                        user={{id: this.state.id, name: this.state.name}}
                        socket={this.socket}
                        handleLogout={this.handleLogout}/>} />
        </div>
    );
  }
}

export default withRouter(App);
