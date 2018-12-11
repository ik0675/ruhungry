import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { dispatchCheckSession } from '../actions/login';

import LoginPage from './login';
import Main from './main';
import Loading from './loading';

const propTypes = {
  isLogin     : PropTypes.string.isRequired,
  checkSession: PropTypes.func.isRequired,
}

const defaultProps = {
  
}

class App extends Component {
  constructor(props) {
    super(props);

    this.isLogingOut = false;
    this.props.checkSession();
  }

  render() {
    const { isLogin } = this.props;
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
            <Route exact path='/' component={ LoginPage } />
            <Route path="/main" component={ Main } />
          </Switch>
        </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const mapStateToProps = state => ({
  isLogin : state.login.isLogin,
})

const mapDispatchToProps = {
  checkSession: dispatchCheckSession,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
