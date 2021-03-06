import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';

import * as actions from '../../actions/login';

import Login from './Login';
import SignUp from './SignUp';

import './css/index.css';

const propTypes = {
  socket: PropTypes.object,
  msg   : PropTypes.object,
  login : PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
}

const defaultProps = {
  socket: undefined,
  msg   : undefined,
  login : undefined,
  signup: undefined,
}

class LoginPage extends Component {
  state = {
    id        : '',
    password  : '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      id      : this.state.id,
      password: this.state.password
    }
    this.props.login(user);
  }

  render() {
    if (this.props.socket !== null) {
      return (
        <Redirect to='/main' />
      );
    }

    let msg = undefined;
    if (this.props.msg !== null) {
      if (!this.props.msg.status) {
        msg = (
          <div className="alertMsg red italic">
            { this.props.msg.msg }
          </div>
        );
      } else {
        msg = (
          <div className="alertMsg green italic">
            { this.props.msg.msg }
          </div>
        );
      }
    }

    return (
      <div className="loginForm">
        <img src="/hungry.jpg" alt="logo" className="brand-logo"/>
        { msg }
        <Login
          id={ this.state.id }
          password={ this.state.password }
          handleChange={ this.handleChange }
          onSubmit={ this.handleSubmit }
        />

        <SignUp
          onSubmit={ this.props.signup }
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
  login : actions.dispatchLogin,
  signup: actions.dispatchSignup,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
