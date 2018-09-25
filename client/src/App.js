import React, { Component } from 'react';
import MainPage from './components/MainPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      loggedIn: false,
    };

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handlePwChange = this.handlePwChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      <MainPage
                info={this.state}
                onIdChange={this.handleIdChange}
                onPwChange={this.handlePwChange}
                onSubmit={this.handleSubmit} />
    );
  }
}

export default App;
