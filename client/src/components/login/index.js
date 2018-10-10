import React, { Component } from 'react';
import MainPage from './MainPage';
import SignUp from './SignUp';
import './css/index.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      loggedIn: false,
      isToggleOn: false
    };

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handlePwChange = this.handlePwChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
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
    if (res.status === 200) {
      // login successful
      this.setState({
        loggedIn: true
      });
      alert('Logged In');
    }
    else {
      // incorrect validation info
      alert('Incorrect ID / Password!');
    }
  }

  render() {
    return (
      <div className="loginForm">
        <MainPage
                  info={this.state}
                  onIdChange={this.handleIdChange}
                  onPwChange={this.handlePwChange}
                  onSubmit={this.handleSubmit} />

        <SignUp   info={this.state}
                  onToggle={this.handleToggle}/>

        <p className="mt-5 mb-3 text-muted">© 2018-Present</p>
      </div>
    );
  }
}

export default Login;
