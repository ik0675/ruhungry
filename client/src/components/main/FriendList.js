import React, { Component } from 'react';

import './css/FriendList.css';

export default class FriendList extends Component {
  constructor(props) {
    super(props);

    this.socket = this.props.socket;
    this.getFriendList();
  }

  componentDidMount() {
    this.socket.on('friendConnected', (user) => {
      this.props.handleFriendConnect(user);
    });
    this.socket.on('friendDisconnected', (user) => {
      this.props.handleFriendDisconnect(user);
    });
  }

  getFriendList = () => {
    if (this.props.user.id !== '') {
      fetch('/api/getFriendList', {
          method : 'POST',
          headers: {
                      'Content-Type': 'application/json'
                   },
          body   : JSON.stringify({id: this.props.user.id})
      })
      .then(res => res.json())
      .then(friendUsers => { this.props.getFriends(friendUsers); })
    }
  }

  render() {
    const onlineFriendList = this.props.friends.onlineFriends.map((user, i) => {
      return <li className="friend" key={i}>{user.id} : {user.name}</li>;
    })
    const offlineFriendList = this.props.friends.offlineFriends.map((user, i) => {
      return <li className="friend" key={i}>{user.id} : {user.name}</li>;
    })
    return (
      <div>
        <p>Friend List</p>
        <p>online</p>
        {onlineFriendList}
        <p>offline</p>
        {offlineFriendList}
      </div>
    );
  }
}
