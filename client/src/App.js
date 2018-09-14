import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res : '',
    };
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
      <div className="App">
        {this.state.res}
      </div>
    );
  }
}

export default App;
