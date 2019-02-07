import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dispatchGetFriendRequests, dispatchMakeFriends } from '../../../actions/account';

import FriendRequest from './FriendRequest';

import './css/FriendRequests.css';

const propTypes = {
  myId              : PropTypes.string.isRequired,
  socket            : PropTypes.object.isRequired,
  friendRequests    : PropTypes.array.isRequired,
  getFriendRequests : PropTypes.func.isRequired,
  makeFriends       : PropTypes.func.isRequired,
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
    let requests;
    if (this.props.friendRequests.length > 0) {
      requests = this.props.friendRequests.map((request, i) => (
        <FriendRequest
          myId={this.props.myId}
          socket={this.props.socket}
          friendRequest={request}
          key={`request${i}`}
          makeFriends={this.props.makeFriends}
          index={i}
        />
      ));
    } else {
      requests = <p>No more friend requests</p>
    }
    return (
      <div className="FriendRequests">
        {requests}
      </div>
    );
  }
}

FriendRequests.propTypes = propTypes;

const mapStateToProps = state => ({
  myId          : state.login.id,
  socket        : state.login.socket,
  friendRequests: state.account.friendRequests,
});

const mapDispatchToProps = {
  getFriendRequests : dispatchGetFriendRequests,
  makeFriends       : dispatchMakeFriends,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);
