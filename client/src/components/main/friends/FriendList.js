import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FriendAction from './FriendAction';

import './css/FriendList.css';

const undefinedFunc = (name) => {
  return () => {
    alert(`${name} is not defined!`);
  }
}

const propTypes = {
  socket                : PropTypes.object,
  user                  : PropTypes.object,
  friends               : PropTypes.object,
  clickedFriend         : PropTypes.object,
  toggleSetting         : PropTypes.bool,
  onFriendClick         : PropTypes.func,
  getFriends            : PropTypes.func,
  handleFriendConnect   : PropTypes.func,
  handleFriendDisconnect: PropTypes.func,
  openChat              : PropTypes.func,
  createInvitation      : PropTypes.func,
}

const defaultProps = {
  socket                : null,
  user                  : null,
  friends               : null,
  clickedFriend         : null,
  toggleSetting         : false,
  onFriendClick         : undefinedFunc('onFriendClick'),
  getFriends            : undefinedFunc('getFriends'),
  handleFriendConnect   : undefinedFunc('handleFriendConnect'),
  handleFriendDisconnect: undefinedFunc('handleFriendDisconnect'),
  openChat              : undefinedFunc('openChat'),
  createInvitation      : undefinedFunc('createInvitation'),
}

class FriendList extends Component {
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
    const { clickedFriend, toggleSetting } = this.props;
    const friendAction = () => <FriendAction
                                  yOff={clickedFriend.index}
                                  onFriendClick={this.props.onFriendClick}
                                  openChat={this.props.openChat}
                                  createInvitation={this.props.createInvitation}
                               />;
    const onlineFriendList = this.props.friends.onlineFriends.map((user, i) => {
      return <li
                className="friend online"
                key={i}
                onClick={ () => {
                  this.props.onFriendClick(i, true)}
                }
             >
              {user.name}
             </li>;
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
       return <li
                className="friend offline"
                key={i}
                onClick={ () => {
                  this.props.onFriendClick(i, false)}
                }
              >
                {user.name}
                <span>{logout}</span>
              </li>;
    })
    return (
      <div className="friendList">
        {onlineFriendList}
        {offlineFriendList}
        {toggleSetting && clickedFriend !== null && friendAction()}
      </div>
    );
  }
}

FriendList.propTypes = propTypes;
FriendList.defaultProps = defaultProps;

export default FriendList;
