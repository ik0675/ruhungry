import React , { Component } from 'react';
import PropTypes from 'prop-types';

import './css/Login.css';

const propTypes = {
  id          : PropTypes.string.isRequired,
  password    : PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onSubmit    : PropTypes.func.isRequired,
}

const defaultProps = {
  id          : undefined,
  password    : undefined,
  handleChange: undefined,
  onSubmit    : undefined,
}

class Login extends Component {
    render() {
        return (
            <form onSubmit={ this.props.onSubmit }>
                <div className="form-group form-group-sm">
                    <input type="text"
                           className="form-control"
                           placeholder="Email"
                           value={ this.props.id }
                           onChange={ this.props.handleChange }
                           name="id"
                    />
                </div>
                <div className="form-group form-group-sm">
                    <input type="password"
                           className="form-control"
                           placeholder="암호"
                           value={ this.props.password }
                           onChange={ this.props.handleChange }
                           name="password"
                    />
                </div>
                <input className="btn btn-mid btn-primary btn-block" type="submit" value="로그인" />
            </form>
        );
    }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
