import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  dispatchLoadAccountInfo,
  dispatchFriendRequest,
  dispatchIsFriends,
} from '../../../actions/account';

import FriendRequests from './FriendRequests';

import './css/Account.css';

const propTypes = {
  myId          : PropTypes.string.isRequired,
  id            : PropTypes.string.isRequired,
  name          : PropTypes.string.isRequired,
  userImg       : PropTypes.string.isRequired,
  loaded        : PropTypes.bool.isRequired,
  friendLoaded  : PropTypes.bool.isRequired,
  friendStatus  : PropTypes.string.isRequired,
  load          : PropTypes.func.isRequired,
  friendRequest : PropTypes.func.isRequired,
  isFriends     : PropTypes.func.isRequired,
};

class Account extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    if (!this.props.loaded) {
      this.props.load(id);
    }
  };
  componentDidUpdate() {
    if (this.props.id !== this.props.myId && !this.props.friendLoaded) {
      const id = this.props.myId;
      const friend_id = this.props.id;
      this.props.isFriends(id, friend_id);
    }
  }

  sendFriendRequest = _ => {
    const { id } = this.props;
    this.props.friendRequest(id);
  };

  render() {
    const {
      myId, id, name, userImg,
      loaded, friendLoaded, friendStatus
    } = this.props;
    if (!loaded) {
      return (
        <div className="Account">
          <p>Loading account information...</p>
          <img src="/loading.gif" alt="loading" />
        </div>
      )
    } else if (id === '') {
      return (
        <div className="Account">
          <p>The ID requested doesn't exist...</p>
          <p>This is most likely because the user deactivated the account</p>
        </div>
      )
    }
    let button;
    if (myId !== id) {
      if (!friendLoaded) {
        button = <img src="/loading.gif" alt="loading" />;
      } else if (friendStatus === 'friend') {
        button = (
          <button className="btn-friend">
            Friends!
          </button>
        );
      } else if (friendStatus === 'not sent') {
        button = (
          <button
            className="btn-notSent"
            onClick={this.sendFriendRequest}
          >
            Send Friend Request
          </button>
        );
      } else if (friendStatus === 'sent') {
        button = (
          <button className="btn-sent">
            Request Sent
          </button>
        );
      } else if (friendStatus === 'err') {
        button = (
          <button className="btn-err">
            Server Error...
          </button>
        )
      }
    }
    return (
      <div className="Account">
        <img src={`/images/${userImg}`} alt="user" />
        <p className="account-info">
          {name}
          {button}
        </p>
        <div className="Account-panel">
          <div className="Account-invitations">
            <hr />
            <p>Invitations</p>
            <hr />
          </div>
          {myId === id &&
            <div className="Account-friendRequest">
              <hr />
              <p>Friend Requests</p>
              <hr />
              <FriendRequests />
            </div>
          }
          {myId === id &&
            <div className="Account-chat">
              <hr />
              <p>Open Chat Rooms</p>
              <hr />
            </div>
          }
        </div>
      </div>
    );
  };
}

Account.propTypes = propTypes;

const mapStateToProps = state => ({
  myId        : state.login.id,
  id          : state.account.id,
  name        : state.account.name,
  userImg     : state.account.userImg,
  loaded      : state.account.loaded,
  friendLoaded: state.account.friendLoaded,
  friendStatus: state.account.friendStatus,
});

const mapDispatchToProps = {
  load          : dispatchLoadAccountInfo,
  friendRequest : dispatchFriendRequest,
  isFriends     : dispatchIsFriends,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
