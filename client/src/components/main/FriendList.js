import React, { Component } from 'react';

import './css/FriendList.css';

export default class FriendList extends Component {
  constructor(props) {
    super(props);

    this.socket = this.props.socket;

    this.getFriendList();
  }

  getFriendList = async() => {
    if (this.props.user.id !== '') {
      console.log('starting getFriendList...');
      const res = await fetch('/api/getFriendList', {
        method : 'POST',
        headers: {
                    'Content-Type': 'application/json'
                 },
        body   : JSON.stringify({id: this.props.user.id})
      });
      const friendUsers = await res.json();
      this.props.getFriends(friendUsers);
    }
  }

  componentDidMount() {
    this.socket.on('friendConnected', (user) => {
      this.props.handleFriendConnect(user);
    });

    this.socket.on('friendDisconnected', (user) => {
      this.props.handleFriendDisconnect(user);
    });
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
