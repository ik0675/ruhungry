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
      return <li className="friend online" key={i}>{user.id} : {user.name}</li>;
    })
    const offlineFriendList = this.props.friends.offlineFriends.map((user, i) => {
      let logout = user.logout;
       if (logout > 60) {
         logout = parseInt(logout / 60, 10);
         if (logout > 24) {
           logout = parseInt(logout / 24, 10);
           logout += ' days ago';
         } else {
           logout += ' hours ago';
         }
       } else if (logout === 0) {
         logout = 'less than a minute ago';
       } else {
         logout += ' minutes ago';
       }
       return <li className="friend offline" key={i}>{user.name}<span> - {logout}</span></li>;
    })
    return (
      <div className="friendList sidenav" >
        <h1>Friend List</h1>
        <h2>online</h2>
          {onlineFriendList}
        <h2>offline</h2>
          {offlineFriendList}
      </div>
    );
  }
}
