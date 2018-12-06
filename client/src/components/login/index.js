import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';

import Login from './Login';
import SignUp from './SignUp';
import logo from './hungry.jpg';

import './css/index.css';

const propTypes = {
  socket: PropTypes.object,
  msg   : PropTypes.string,
}

const defaultProps = {
  socket: undefined,
  msg   : undefined,
}

class LoginPage extends Component {
  state = {
    id        : '',
    password  : '',
    isToggleOn: false,
    loginInfo : null,
    signUpInfo: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.login();
  }

  handleToggle() {
    this.setState({
      isToggleOn: !this.state.isToggleOn
    });
  }

  login = async () => {
    try {
      const res = await fetch('/api/login', {
        method  : 'POST',
        headers : {
                    'Content-Type': 'application/json'
                  },
        body    : JSON.stringify({
                    id      : this.state.id,
                    password: this.state.password,
                  })
      });
      const loginInfo = await res.json();
      if (loginInfo.status) {
        this.props.handleLogin(loginInfo.user);
      } else {
        this.setState({
          loginInfo: loginInfo,
          isToggleOn: false,
          signUpInfo: null,
        });
      }
    } catch(err) {
      console.log(err)
    }
  }

  handleSignUp = async (user) => {
    try {
      const res = await fetch('/api/signUp', {
        method  : 'POST',
        headers : {
                    'Content-Type': 'application/json'
                  },
        body    : JSON.stringify(user)
      });
      const signUpInfo = await res.json();
      this.setState({
        signUpInfo: signUpInfo,
        isToggleOn: false,
        loginInfo: null,
      });
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    if (this.props.isLogin === 'true') {
      return (
        <Redirect to='/main' />
      );
    }
    let msg = undefined;
    if (this.state.loginInfo !== null) {
      if (!this.state.loginInfo.status)
        msg = <div className="alertMsg red italic">
                {this.state.loginInfo.message}
              </div>;
    }
    else if (this.state.signUpInfo !== null) {
      if (this.state.signUpInfo.status)
        msg = <div className="alertMsg green italic">
                {this.state.signUpInfo.message}
              </div>
      else
        msg = <div className="alertMsg red italic">
                {this.state.signUpInfo.message}
              </div>
    }

    return (
      <div className="loginForm">
        <img src={logo} alt="logo" className="brand-logo"/>
        {typeof msg !== 'undefined' && msg}
        <Login    id={ this.state.id }
                  password={ this.state.password }
                  handleChange={ this.handleChange }
                  onSubmit={ this.handleSubmit }
        />

        <SignUp   info={this.state}
                  onToggle={this.handleToggle}
                  onSubmit={this.handleSignUp}
        />

        <p className="mt-5 mb-3 text-muted">© 2018-Present</p>
      </div>
    );
  }
}

LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;

const mapStateToProps = state => ({
  socket: state.login.socket,
  msg   : state.login.msg,
})

const mapDispatchToProps = {

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
