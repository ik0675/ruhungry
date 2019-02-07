import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import FriendSuggest from './FriendSuggest';

import './css/FindFriend.css';

const propTypes = {
  type              : PropTypes.string,
  friendSuggests    : PropTypes.object.isRequired,
  err               : PropTypes.bool.isRequired,
  inFriendsLoaded   : PropTypes.bool.isRequired,
  notInFriendsLoaded: PropTypes.bool.isRequired,
};

const defaultProps = {
  type: 'page',
};

class FindFriend extends Component {
  render() {
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
              person={person}
              key={`person${i}`}
              handleChange={this.handleChange}
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
              person={person}
              key={`personNotFriend${i}`}
              handleChange={this.handleChange}
            />
          );
        });
      }
    }

    return (
      <div className="FindFriend" type={this.props.type}>
        <p className="FindFriend-header" >Friends</p>
        <div>
          {inFriendsSearch}
        </div>
        <p className="FindFriend-header" >Not Friends</p>
        <div>
          {notInFriendsSearch}
        </div>
      </div>
    );
  };
};

export default withRouter(FindFriend);
