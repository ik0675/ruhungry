import React, { Component } from 'react';
import { withRouter } from 'react-router';

import './css/Loading.css';

class Loading extends Component {
  render() {
    return (
      <div id="loading">
        <p>{this.props.loadingFor}</p>
        <img src="/loading.gif" alt="loading gif" />
      </div>
    );
  }
}

Loading.defaultProps = {
  loadingFor: 'checking for session...',
}

export default withRouter(Loading);
