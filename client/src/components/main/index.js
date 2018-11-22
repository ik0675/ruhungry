import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import PropTypes from 'prop-types';

import './css/index.css';

import Header from './Header';
import FriendList from './FriendList';
import Posts from './Posts';
import Chat from './chat/Chat';

const propTypes = {
  isLogin: PropTypes.string
}

const defaultProps = {
  isLogin: 'false'
}

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: this.props.isLogin,
      onlineFriends: [],
      offlineFriends: [],
      clickedFriend: null,
      toggleSetting: false,
      chat: false,
      invitation: false
    };

    this.getFriends = this.getFriends.bind(this);
    this.handleFriendConnect = this.handleFriendConnect.bind(this);
    this.handleFriendDisconnect = this.handleFriendDisconnect.bind(this);
  }

  componentWillMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  getFriends(users) {
    if (this._mounted) {
      this.setState({
        onlineFriends: users.onlineFriends,
        offlineFriends: users.offlineFriends,
      });
    }
  }

  handleLogout = () => {
    this.props.handleLogout();
    this.setState({
      isLogin: 'false',
      onlineFriends: [],
      offlineFriends: [],
    });
  }

  checkUserInList(list, user) {
    for (let i = 0; i < list.length; ++i) {
      if (list[i].id === user.id)
        return i;
    }
    return -1;
  }

  handleFriendConnect(user) {
    if (this.checkUserInList(this.state.onlineFriends, user) === -1) {
      let onlineFriends = [...this.state.onlineFriends, user];
      let offlineFriends = [...this.state.offlineFriends];
      let index = this.checkUserInList(offlineFriends, user);
      offlineFriends.splice(index, 1);
      this.setState({
        onlineFriends: onlineFriends,
        offlineFriends: offlineFriends,
      });
    }
  }

  handleFriendDisconnect(user) {
    if (this.checkUserInList(this.state.offlineFriends, user) === -1) {
      let offlineFriends = [...this.state.offlineFriends, user];
      let onlineFriends = [...this.state.onlineFriends];
      let index = this.checkUserInList(onlineFriends, user);
      onlineFriends.splice(index, 1);
      this.setState({
        onlineFriends: onlineFriends,
        offlineFriends: offlineFriends,
      });
    }
  }

  onFriendClick = (i, status) => {
    if (i === -1) {
      this.setState({
        toggleSetting: false
      })
      return;
    }
    let friend;
    if (status) {
      friend = this.state.onlineFriends[i];
    } else {
      friend = this.state.offlineFriends[i];
      i += this.state.onlineFriends.length;
    }
    const prevClicked = this.state.clickedFriend;
    if (prevClicked !== null
        && friend.id === prevClicked.id) {
      this.setState({
        clickedFriend: null,
        toggleSetting: false
      })
    } else {
      this.setState({
        clickedFriend: { ...friend, index: i },
        toggleSetting: true
      })
    }
  }

  openChat = () => {
    const friend = this.state.clickedFriend;
    if (friend !== null) {
      this.setState({
        chat: true
      })
    } else {
      alert('browser err');
    }
  }

  createInvitation = () => {
    const friend = this.state.clickedFriend;
    if (friend !== null) {
      this.setState({
        invitation: true
      })
    } else {
      alert('browser err');
    }
  }

  render() {
    if (this.props.isLogin === 'false') {
      return (
        <Redirect to='/' />
      );
    }
    let {
      onlineFriends, offlineFriends,
      clickedFriend, chat, invitation,
      toggleSetting
    } = this.state;
    let user = this.props.user;
    let friends = {onlineFriends, offlineFriends};
    return (
      <div className="wrapper">
        <Header
          user={user}
          handleLogout={this.handleLogout}
        />

        <FriendList socket={this.props.socket}
                    user={user}
                    friends={friends}
                    clickedFriend={clickedFriend}
                    toggleSetting={toggleSetting}
                    onFriendClick={this.onFriendClick}
                    getFriends={this.getFriends}
                    handleFriendConnect={this.handleFriendConnect}
                    handleFriendDisconnect={this.handleFriendDisconnect}
                    openChat={this.openChat}
                    createInvitation={this.createInvitation}
        />

        <Posts />

        {chat && <Chat friend={clickedFriend}/> }

      </div>
    )
  }
}

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default withRouter(Main);
