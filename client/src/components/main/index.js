import React, { Component } from 'react';
import { withRouter } from 'react-router';

import './css/index.css';

class Main extends Component {
  constructor(props) {
    super(props);

    // redirect to login page if not logged in
    if (this.props.user.id === '' || this.props.user.name === '')
      this.props.history.push('/');
  }
  render() {
    return (
      <div>
        Hello, {this.props.user.name}
        <button onClick={this.props.handleLogout}>로그아웃</button>
      </div>
    )
  }
}

export default withRouter(Main);
