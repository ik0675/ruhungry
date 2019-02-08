import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import FriendSuggest from './FriendSuggest';

import './css/FindFriend.css';

const propTypes = {
  type              : PropTypes.string.isRequired,
  name              : PropTypes.string,
  toggle            : PropTypes.bool,
  friendSuggests    : PropTypes.object.isRequired,
  err               : PropTypes.bool.isRequired,
  inFriendsLoaded   : PropTypes.bool.isRequired,
  notInFriendsLoaded: PropTypes.bool.isRequired,
  handleClose       : PropTypes.func.isRequired,
  handleChange      : PropTypes.func.isRequired,
};

const defaultProps = {
  name  : '',
  toggle: true,
};

class FindFriend extends Component {
  render() {
    let style = {};
    if (this.props.type === 'header' && !this.props.toggle) {
      style.display = 'none';
    }
    const noName = (
      <p className="FindFriend-noName">
        Enter a name to search for
      </p>
    );
    const err = (
      <p className="FindFriend-err">
        Server Err... Please try again later
      </p>
    );

    let inFriendsSearch, notInFriendsSearch;
    const inFriends = this.props.friendSuggests.inFriends;
    const notInFriends = this.props.friendSuggests.notInFriends;
    if (this.props.err) {
      inFriendsSearch = err;
      notInFriendsSearch = err;
    } else if (this.props.name.length === 0) {
      inFriendsSearch = noName;
      notInFriendsSearch = noName;
    } else {
      if (!this.props.inFriendsLoaded) {
        inFriendsSearch = (
          <div className="FindFriend-loading" >
            <img src="/loading.gif" alt="loading" />
          </div>
        );
      } else if (inFriends.length === 0) {
        inFriendsSearch = <p className="FindFriend-empty" >There is no one by the name who is a friend with you</p>;
      } else {
        inFriendsSearch = inFriends.map((person, i) => {
          return (
            <FriendSuggest
              type={this.props.type}
              person={person}
              key={`person${i}`}
              handleClose={this.props.handleClose}
              handleChange={this.props.handleChange}
            />
          );
        });
      }

      if (!this.props.notInFriendsLoaded) {
        notInFriendsSearch = (
          <div className="FindFriend-loading" >
            <img src="/loading.gif" alt="loading" />
          </div>
        );
      } else if (notInFriends.length === 0) {
        notInFriendsSearch = <p className="FindFriend-empty" >There is no one by the name who isn't a friend with you</p>;
      } else {
        notInFriendsSearch = notInFriends.map((person, i) => {
          return (
            <FriendSuggest
              type={this.props.type}
              person={person}
              key={`personNotFriend${i}`}
              handleClose={this.props.handleClose}
              handleChange={this.props.handleChange}
            />
          );
        });
      }
    }

    return (
      <div
        className="FindFriend"
        type={this.props.type}
        style={style}
      >
        <div className="FindFriend-panel">
          <p className="FindFriend-header" >
            Friends
          </p>
          <div>
            {inFriendsSearch}
          </div>
          <p className="FindFriend-header" >Not Friends</p>
          <div>
            {notInFriendsSearch}
          </div>
        </div>
        <div
          type={this.props.type}
          className="FindFriend-header-display"
        >
          <span onClick={this.props.handleClose}>CLOSE</span>
        </div>
      </div>
    );
  };
};

FindFriend.propTypes = propTypes;
FindFriend.defaultProps = defaultProps;

export default withRouter(FindFriend);
