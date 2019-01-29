import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dispatchLoadAccountInfo } from '../../../actions/account';

import './css/Account.css';

const propTypes = {
  myId    : PropTypes.string.isRequired,
  id      : PropTypes.string.isRequired,
  name    : PropTypes.string.isRequired,
  userImg : PropTypes.string.isRequired,
  loaded  : PropTypes.bool.isRequired,
  load    : PropTypes.func.isRequired,
};

class Account extends Component {
  componentDidMount() {
    if (!this.props.loaded) {
      const id = this.props.match.params.id;
      this.props.load(id);
    }
  };

  render() {
    const { myId, id, name, userImg, loaded } = this.props;
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
    return (
      <div className="Account">
        <img src={`/images/${userImg}`} alt="user" />
        <p className="account-info">
          {name}
          {myId !== id && <button>Send friend request</button>}
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
  myId    : state.login.id,
  id      : state.account.id,
  name    : state.account.name,
  userImg : state.account.userImg,
  loaded  : state.account.loaded,
});

const mapDispatchToProps = {
  load : dispatchLoadAccountInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
