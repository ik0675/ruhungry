import React , { Component } from 'react';

import './css/Login.css';

class Login extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="form-group form-group-sm">
                    <input type="text"
                           className="form-control"
                           placeholder="Email"
                           value={this.props.info.id}
                           onChange={this.props.onIdChange}/>
                </div>
                <div className="form-group form-group-sm">
                    <input type="password"
                           className="form-control"
                           placeholder="암호"
                           value={this.props.info.password}
                           onChange={this.props.onPwChange} />
                </div>
                <input className="btn btn-mid btn-primary btn-block" type="submit" value="로그인" />
            </form>
        );
    }
}

export default Login;
