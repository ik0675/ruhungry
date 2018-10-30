import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import io from 'socket.io-client';

import LoginPage from './login';
import Main from './main';
import Loading from './loading';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: 'pending',
      id: '',
      name: '',
    }

    this.socket = io('localhost:4000'); // connect to socket.io on server
    this.isLogingOut = false;

    fetch('/api/session')
    .then(res => res.json())
    .then(loginInfo => {
      if (!loginInfo.status) {
        this.setState({
          isLogin: 'false'
        });
      } else {
        this.setState({
          isLogin: 'true',
          id: loginInfo.user.id,
          name: loginInfo.user.name,
        });
        this.socket.emit('login', {id: loginInfo.user.id, name: loginInfo.user.name});
      }
    })
    .catch(err => {
      console.error(err);
    });

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin = async(user) => {
    this.setState({
      isLogin: 'true',
      id: user.id,
      name: user.name,
    });
    this.socket.emit('login', user);

    let pathname = this.props.location.state ? this.props.location.state : '/main';
    this.props.history.push(pathname + this.props.location.search);
  }

  handleLogout = async () => {
    await this.setState({
      isLogin: 'false',
      id: '',
      name: '',
    });
    this.socket.emit('logout');
    this.isLogingOut = true;
    fetch('/api/logout') // remove session loginInfo
    .then(res => {
      this.setState({
        isLogin: 'false',
      }, () => { this.isLogingOut = false; })
      this.props.history.push('/');
    });
  }

  render() {
    const { isLogin, id, name } = this.state;
    if (isLogin === 'pending') {
      return(
        <Loading loadingFor="checking session to login..."/>
      );
    } else if (this.isLogingOut) {
      return (
        <Loading loadingFor='logging out...' />
      )
    }
    return (
        <div>
          <Route exact path='/' component={
            () => <LoginPage isLogin={isLogin}
                             handleLogin={this.handleLogin} />} />
          <Route path="/main" component={
            () => <Main isLogin={isLogin}
                        user={{id: id, name: name}}
                        socket={this.socket}
                        handleLogout={this.handleLogout}/>} />
        </div>
    );
  }
}

export default withRouter(App);
