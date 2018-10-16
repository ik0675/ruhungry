import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Login from './Login';
import SignUp from './SignUp';

import './css/index.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      isToggleOn: false,
      loginInfo: null,
      signUpInfo: null,
    };

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handlePwChange = this.handlePwChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.login = this.login.bind(this);
  }

  handleIdChange(e) {
    this.setState({
      id: e.target.value
    });
  }

  handlePwChange(e) {
    this.setState({
      password: e.target.value
    });
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
        // redirect to mainPage
        await this.props.handleLoginId(loginInfo.user);
        //React Route Built-in (push -> redirect)
        this.props.history.push("/main");
        // return 안하면 main으로 redirect 된후에도 login panel 에서 setState(밑에코드)가 돌아감
        return ;
      }
      this.setState({
        loginInfo: loginInfo,
        isToggleOn: false,
        signUpInfo: null,
      });
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
        {typeof msg !== 'undefined' && msg}
        <Login    info={this.state}
                  onIdChange={this.handleIdChange}
                  onPwChange={this.handlePwChange}
                  onSubmit={this.handleSubmit} />

        <SignUp   info={this.state}
                  onToggle={this.handleToggle}
                  onSubmit={this.handleSignUp} />

        <p className="mt-5 mb-3 text-muted">© 2018-Present</p>
      </div>
    );
  }
}

export default withRouter(LoginPage);
