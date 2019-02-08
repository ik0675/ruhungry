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
  type            : PropTypes.string,
  friendSuggests  : PropTypes.object.isRequired,
  searchFriends   : PropTypes.func.isRequired,
  searchNotFriends: PropTypes.func.isRequired,
};

const defaultProps = {
  type: 'page',
}

class FindFriends extends Component {
  state = {
    name              : '',
    inFriendsLoaded   : true,
    notInFriendsLoaded: true,
    err               : false,
    toggle            : false,
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
      <div
        className="FindFriends"
        type={this.props.type}
      >
        <h1 type={this.props.type} >Find Friends</h1>
        <input
          page={this.props.type}
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
          onFocus={() => this.setState({ toggle: true })}
          placeholder="Search for a friend here..."
        />
        <FindFriend
          type={this.props.type}
          name={this.state.name}
          toggle={this.state.toggle}
          friendSuggests={this.props.friendSuggests}
          inFriendsLoaded={this.state.inFriendsLoaded}
          notInFriendsLoaded={this.state.notInFriendsLoaded}
          err={this.state.err}
          handleClose={() => this.setState({ toggle: false })}
          handleChange={this.handleChange}
        />
      </div>
    );
  };
};

FindFriends.propTypes = propTypes;
FindFriends.defaultProps = defaultProps;

const mapStateToProps = state => ({
  friendSuggests: state.friends.friendSuggests,
});

const mapDispatchToProps = {
  searchFriends   : dispatchFriendSearchInFriends,
  searchNotFriends: dispatchFriendSearchNotInFriends
};

export default connect(mapStateToProps, mapDispatchToProps)(FindFriends);
