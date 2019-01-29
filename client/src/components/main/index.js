import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Route, Switch } from 'react-router';
import { connect } from 'react-redux';

import { dispatchLogout } from '../../actions/login';
import { dispatchExitInvitation } from '../../actions/invitation';

import './css/index.css';

import Header from './header/Header';
import FriendList from './friends/FriendList';
import Posts from './post/Posts';
import Chat from './chat/Chat';
import MakeInvitation from './invitation/MakeInvitation';
import Upload from './upload';
import Account from './account';
import FindFriends from './findFriends';

const propTypes = {
  id      : PropTypes.string.isRequired,
  name    : PropTypes.string.isRequired,
  isLogin : PropTypes.string.isRequired,
  socket  : PropTypes.object,
  chatInfo: PropTypes.object,
  onInvite: PropTypes.object,
  upload  : PropTypes.bool.isRequired,
  logout  : PropTypes.func.isRequired,
}

const defaultProps = {
  socket  : null,
  onChat  : null,
  onInvite: null,
}

class Main extends Component {
  handleLogout = () => {
    this.props.logout(this.props.socket);
  }

  render() {
    if (this.props.isLogin !== 'true') {
      return (
        <Redirect to='/' />
      );
    }

    const makeInvitation = (
      <MakeInvitation
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        displayExit
        onExit={this.props.exitInvite}
      />
    )

    return (
      <div id="Main">
        <Header
          id={this.props.id}
          name={this.props.name}
          handleLogout={this.handleLogout}
        />

        <FriendList />

        <Switch>
          <Route
            path="/main/account"
            component={Account}
          />
          <Route
            path="/main/findFriends"
            component={FindFriends}
          />
          <Route
            path="/main"
            component={Posts}
          />
        </Switch>

         {this.props.chatInfo != null && <Chat />}
         {this.props.onInvite != null && makeInvitation}
         {this.props.upload && <Upload />}
      </div>
    )
  }
}

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

const mapStateToProps = state => ({
  id      : state.login.id,
  name    : state.login.name,
  isLogin : state.login.isLogin,
  socket  : state.login.socket,
  chatInfo: state.chat.chatInfo,
  onInvite: state.invitation.invitationReceiver,
  upload  : state.upload.toggle,
})

const mapDispatchToProps = {
  logout    : dispatchLogout,
  exitInvite: dispatchExitInvitation,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
