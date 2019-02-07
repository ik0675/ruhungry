import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  dispatchFriendSearchInFriends,
  dispatchFriendSearchNotInFriends
} from '../../../actions/friends';

import FindFriend from './FindFriend';

import './css/FindFriends.css';

const propTypes = {
  friendSuggests  : PropTypes.object.isRequired,
  searchFriends   : PropTypes.func.isRequired,
  searchNotFriends: PropTypes.func.isRequired,
};

class FindFriends extends Component {
  state = {
    name              : '',
    inFriendsLoaded   : true,
    notInFriendsLoaded: true,
    err               : false,
  };

  handleChange = (e) => {
    this.setState({
      inFriendsLoaded   : false,
      notInFriendsLoaded: false,
      name              : e.target.value
    }, () => {
      const name = this.state.name;
      if (name !== '') {
        this.props.searchFriends(
          name,
          () => this.setState({ inFriendsLoaded: true }),
          () => this.setState({ err: true })
        );
        this.props.searchNotFriends(
          name,
          () => this.setState({ notInFriendsLoaded: true }),
          () => this.setState({ err: true })
        );
      }
    });
  };

  render() {
    return (
      <div className="FindFriends">
        <h1>Find Friends</h1>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Search for a friend here..."
        />
        <FindFriend
          friendSuggests={this.props.friendSuggests}
          inFriendsLoaded={this.state.inFriendsLoaded}
          notInFriendsLoaded={this.state.notInFriendsLoaded}
          err={this.state.err}
        />
      </div>
    );
  };
};

const mapStateToProps = state => ({
  friendSuggests: state.friends.friendSuggests,
});

const mapDispatchToProps = {
  searchFriends   : dispatchFriendSearchInFriends,
  searchNotFriends: dispatchFriendSearchNotInFriends
};

export default connect(mapStateToProps, mapDispatchToProps)(FindFriends);
