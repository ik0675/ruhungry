import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as friendActions from '../../../actions/friends';
import { dispatchCreateChat } from '../../../actions/chat';
import { dispatchCreateInvitation } from '../../../actions/invitation';

import FriendAction from './FriendAction';

import './css/FriendList.css';

const propTypes = {
  socket          : PropTypes.object.isRequired,
  id              : PropTypes.string.isRequired,
  name            : PropTypes.string.isRequired,
  onlineFriends   : PropTypes.array.isRequired,
  offlineFriends  : PropTypes.array.isRequired,
  getFriendList   : PropTypes.func.isRequired,
  friendConnect   : PropTypes.func.isRequired,
  friendDisconnect: PropTypes.func.isRequired,
  createChat      : PropTypes.func.isRequired,
  createInvitation: PropTypes.func.isRequired,
}

const defaultProps = {

}

class FriendList extends Component {
  state = {
    clickedFriend   : null,
    offsetTop       : 0,
    toggleChat      : false,
    toggleInvitation: false,
    isLoading       : true,
  }

  componentDidMount() {
    if (this.state.isLoading) {
      this.props.getFriendList(
        this.props.id,
        () => this.setState({ isLoading: false })
      );
    }

    this.props.socket.on('friendConnected', (friend) => {
      const friends = {
        onlineFriends : this.props.onlineFriends,
        offlineFriends: this.props.offlineFriends
      }
      this.props.friendConnect(friend, friends);
    });
    this.props.socket.on('friendDisconnected', (friend) => {
      const friends = {
        onlineFriends : this.props.onlineFriends,
        offlineFriends: this.props.offlineFriends
      }
      this.props.friendDisconnect(friend, friends);
    });
  }

  onFriendClick = (clickedFriend) => {
    const prevClickedFriend = this.state.clickedFriend;
    if (prevClickedFriend != null
          && prevClickedFriend.friend.id === clickedFriend.friend.id) {
        this.setState({ clickedFriend: null, offsetTop: 0 })
    } else {
      this.setState({ clickedFriend, offsetTop: this.refs[`friend${clickedFriend.index}`].offsetTop })
    }
  }

  goToAccount = () => {
    const friend = { ...this.state.clickedFriend.friend };
    this.onFriendClick(this.state.clickedFriend);
    this.props.history.push(`/main/account/${friend.id}`);
  }

  createChat = () => {
    const friend = { ...this.state.clickedFriend.friend };
    const ids = [
      { id: this.props.id, name: this.props.name },
      { id: friend.id, name: friend.name }
    ];
    this.onFriendClick(this.state.clickedFriend);
    this.props.createChat(ids);
  }

  createInvitation = () => {
    const friend = { ...this.state.clickedFriend };
    this.onFriendClick(this.state.clickedFriend);
    this.props.createInvitation(friend);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="friendList" >
          <img src="/loading.gif" alt="loading" />
        </div>
      )
    }
    const { clickedFriend } = this.state;
    const friendAction = (
      <FriendAction
        clickedFriend={this.state.clickedFriend}
        offsetTop={this.state.offsetTop}
        goToAccount={this.goToAccount}
        createChat={this.createChat}
        createInvitation={this.createInvitation}
      />
    );
    const onlineFriendList = this.props.onlineFriends.map((friend, i) => {
      const clickedFriend = {
        index : i,
        friend
      }

      return (
        <li
          className="friend online"
          key={`onlineFriend${friend.id}`}
          onClick={() => { this.onFriendClick(clickedFriend) }}
          ref={`friend${i}`}
        >
          <img src={`/images/${friend.img}`} alt="friend" />
          {friend.name}
          <span
            role="img"
            aria-label="blue circle"
          >
            🔵
          </span>
        </li>
      );
    })
    const offlineFriendList = this.props.offlineFriends.map((friend, i) => {
      let logout = friend.logout;
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

       const clickedFriend = {
         index : i + this.props.onlineFriends.length,
         friend
       }

       return (
         <li
           className="friend offline"
           key={`offlineFriend${friend.id}`}
           onClick={() => { this.onFriendClick(clickedFriend) }}
           ref={`friend${clickedFriend.index}`}
         >
           <img src={`/images/${friend.img}`} alt="friend" />
           {friend.name}
           <span>{logout}</span>
         </li>
       );
    })
    return (
      <div className="friendList" >
        {onlineFriendList}
        {offlineFriendList}
        {clickedFriend !== null && friendAction}
      </div>
    );
  }
}

FriendList.propTypes = propTypes;
FriendList.defaultProps = defaultProps;

const mapStateToProps = state => ({
  socket        : state.login.socket,
  id            : state.login.id,
  name          : state.login.name,
  onlineFriends : state.friends.onlineFriends,
  offlineFriends: state.friends.offlineFriends,
})

const mapDispatchToProps = {
  getFriendList   : friendActions.dispatchGetFriendList,
  friendConnect   : friendActions.dispatchFriendConnect,
  friendDisconnect: friendActions.dispatchFriendDisconnect,
  createChat      : dispatchCreateChat,
  createInvitation: dispatchCreateInvitation,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FriendList));
