import React, { Component } from 'react';

import './css/index.css';

class Main extends Component {
  render() {
    return (
      <div>
        Hello, {this.props.user.name}
      </div>
    )
  }
}

export default Main;
