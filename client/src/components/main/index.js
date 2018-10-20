import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';

import './css/index.css';

import FriendList from './FriendList';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: this.props.isLogin,
      onlineFriends: [],
      offlineFriends: [],
    };

    this.getFriends = this.getFriends.bind(this);
    this.handleFriendConnect = this.handleFriendConnect.bind(this);
    this.handleFriendDisconnect = this.handleFriendDisconnect.bind(this);
  }

  getFriends(users) {
    this.setState({
      onlineFriends: users.onlineFriends,
      offlineFriends: users.offlineFriends,
    });
  }

  handleLogout = () => {
    this.props.handleLogout();
    this.setState({
      isLogin: 'false',
      onlineFriends: [],
      offlineFriends: [],
    });
  }

  handleFriendConnect(user) {
    let onlineFriends = [...this.state.onlineFriends, user];
    let offlineFriends = [...this.state.offlineFriends];
    let index = offlineFriends.indexOf(user);
    offlineFriends = offlineFriends.splice(index, 1);
    console.log('connected friend, new friends = ',onlineFriends);
    this.setState({
      onlineFriends: onlineFriends,
      offlineFriends: offlineFriends,
    });
  }

  handleFriendDisconnect(user) {
    let offlineFriends = [...this.state.offlineFriends, user];
    let onlineFriends = [...this.state.onlineFriends];
    let index = onlineFriends.indexOf(user);
    onlineFriends = onlineFriends.splice(index, 1);
    console.log('disconnected friend, new friends = ', onlineFriends);
    this.setState({
      onlineFriends: onlineFriends,
      offlineFriends: offlineFriends,
    });
  }

  render() {
    if (this.props.isLogin === 'false') {
      return (
        <Redirect to='/' />
      );
    }
    let { onlineFriends, offlineFriends } = this.state;
    let user = this.props.user;
    let friends = {onlineFriends, offlineFriends};
    return (
      <div>
        <p>
          Hello, {user.name}
          <button className="logoutButton" onClick={this.handleLogout}>로그아웃</button>
        </p>

        <FriendList socket={this.props.socket}
                    user={user}
                    friends={friends}
                    getFriends={this.getFriends}
                    handleFriendConnect={this.handleFriendConnect}
                    handleFriendDisconnect={this.handleFriendDisconnect} />
      </div>
    )
  }
}

export default withRouter(Main);
