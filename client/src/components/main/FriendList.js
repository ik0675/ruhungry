import React, { Component } from 'react';

import FriendAction from './FriendAction';

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
    const { clickedFriend } = this.props;
    const friendAction = () => <FriendAction yOff={clickedFriend.index} />;
    const onlineFriendList = this.props.friends.onlineFriends.map((user, i) => {
      return <li className="friend online" key={i} onClick={()=>{this.props.onFriendClick(i, true)}}>{user.name}</li>;
    })
    const offlineFriendList = this.props.friends.offlineFriends.map((user, i) => {
      let logout = user.logout;
       if (logout > 60) {
         logout = parseInt(logout / 60, 10);
         if (logout > 24) {
           logout = parseInt(logout / 24, 10);
           logout += ' d';
         } else {
           logout += ' h';
         }
       } else {
         logout += ' m';
       }
       return <li className="friend offline" key={i} onClick={() => {this.props.onFriendClick(i, false)}}>{user.name}<span>{logout}</span></li>;
    })
    return (
      <div className="friendList">
        {onlineFriendList}
        {offlineFriendList}
        {clickedFriend !== null && friendAction()}
      </div>
    );
  }
}
