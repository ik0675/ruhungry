import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from './login';
import Main from './main';
import Loading from './loading';

const propTypes = {
  isLogin : PropTypes.string.isRequired,
  id      : PropTypes.string.isRequired,
  name    : PropTypes.string.isRequired,
}

const defaultProps = {
  isLogin : undefined,
  id      : undefined,
  name    : undefined,
}

class App extends Component {
  constructor(props) {
    super(props);

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
    const { isLogin, id, name } = this.props;
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
          <Switch>
            <Route exact path='/' component={
              () => <LoginPage isLogin={isLogin}
                               handleLogin={this.handleLogin} />} />
            <Route path="/main" component={
              () => <Main isLogin={isLogin}
                          user={{id: id, name: name}}
                          socket={this.socket}
                          handleLogout={this.handleLogout}/>} />
          </Switch>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogin : state.login.isLogin,
  id      : state.login.id,
  name    : state.login.name,
})

const mapDispatchToProps = {

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
