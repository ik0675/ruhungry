import React, { Component } from 'react';
import { withRouter } from 'react-router';

import './css/index.css';

class Main extends Component {
  constructor(props) {
    super(props);

    if (this.props.user.id === '' || this.props.user.name === '')
      this.props.history.push('/');
    return;
  }
  render() {
    return (
      <div>
        Hello, {this.props.user.name}
      </div>
    )
  }
}

export default withRouter(Main);
