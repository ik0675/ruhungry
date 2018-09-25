import React, { Component } from 'react';
import MainPage from './components/MainPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      res : ''
    };

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handlePwChange = this.handlePwChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    alert('Submit Button has been pressed!');
    e.preventDefault();
    alert(JSON.stringify(this.state));
  }

  componentDidMount() {
    this.runApiTest()
      .then(res => {
        console.log(res);
        this.setState({
          res : res.test,
        });
      });
  }

  runApiTest = async () => {
    const res = await fetch('api/test');
    const body = await res.json();
    return body;
  }

  render() {
    return (
      <MainPage
                info={this.state}
                onIdChange={this.handleIdChange}
                onPwChange={this.handlePwChange}
                onSubmit={this.handleSubmit} />

      // <div className="App">
      //   {this.state.res}
      // </div>
    );
  }
}

export default App;
