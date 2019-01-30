import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dispatchGetFriendRequests } from '../../../actions/account';

import FriendRequest from './FriendRequest';

import './css/FriendRequests.css';

const propTypes = {
  friendRequests: PropTypes.array.isRequired,
};

class FriendRequests extends Component {
  state = {
    loaded: false,
  }

  componentDidMount() {
    if (!this.state.loaded) {
      this.props.getFriendRequests(this.handleLoaded);
    }
  }

  handleLoaded = () => {
    this.setState({ loaded: true });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <img src="/loading.gif" alt="loading" />
      )
    }
    const requests = this.props.friendRequests.map((request, i) => (
      <FriendRequest friendRequest={request} key={`request${i}`} />
    ));
    return (
      <div className="FriendRequests">
        {requests}
      </div>
    );
  }
}

FriendRequests.propTypes = propTypes;

const mapStateToProps = state => ({
  friendRequests: state.account.friendRequests,
});

const mapDispatchToProps = {
  getFriendRequests: dispatchGetFriendRequests,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);
