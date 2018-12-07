import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/SignUp.css';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

const defaultProps = {
  onSubmit: undefined,
}

class SignUp extends Component {
  state = {
    id      : '',
    password: '',
    name    : '',
    toggle  : false,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleToggle = () => {
    this.setState( (prevState) => ({
      id      : '',
      password: '',
      name    : '',
      toggle  : !prevState.toggle,
    }) )
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state);
    this.setState({
      id      : '',
      password: '',
      name    : '',
      toggle  : false,
    });
  }

  render() {
    return (
      <div className="sign">
        <button
          className='btn btn-md btn-info btn-block'
          type="submit"
          onClick={ this.handleToggle }
        >
          회원가입
        </button>
        { this.state.toggle &&
          <div className="form-group">
            <input
              placeholder="이름"
              type="text"
              className='form-control'
              onChange={ this.handleChange }
              value={ this.state.name }
              name="name"
            />

            <input
              placeholder="Email"
              type="text"
              className='form-control'
              onChange={ this.handleChange }
              value={ this.state.id }
              name="id"
            />

            <input
              placeholder="Password"
              type="password"
              className='form-control'
              onChange={ this.handleChange }
              value={ this.state.password }
              name="password"
            />

            <button
              className='btn btn-md btn-secondary btn-block'
              onClick={ this.handleSubmit }
            >
              제출
            </button>
          </div>
        }
      </div>
    );
  }
}

SignUp.propTypes = propTypes;
SignUp.defaultProps = defaultProps;

export default SignUp;
