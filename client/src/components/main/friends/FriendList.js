import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as friendActions from '../../../actions/friends';
import { dispatchCreateChat } from '../../../actions/chat';

import FriendAction from './FriendAction';

import './css/FriendList.css';

const propTypes = {
  socket          : PropTypes.object.isRequired,
  id              : PropTypes.string.isRequired,
  name            : PropTypes.string.isRequired,
  onlineFriends   : PropTypes.array.isRequired,
  offlineFriends  : PropTypes.array.isRequired,
  isLoading       : PropTypes.bool.isRequired,
  getFriendList   : PropTypes.func.isRequired,
  friendConnect   : PropTypes.func.isRequired,
  friendDisconnect: PropTypes.func.isRequired,
  createChat      : PropTypes.func.isRequired,
  createInvitation: PropTypes.func.isRequired,
}

const defaultProps = {

}

class FriendList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedFriend   : null,
      toggleChat      : false,
      toggleInvitation: false,
    }

    this.props.getFriendList(this.props.id);
  }

  componentDidMount() {
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
        this.setState({ clickedFriend: null })
    } else {
      this.setState({ clickedFriend })
    }
  }

  createChat = () => {
    const friend = { ...this.state.clickedFriend }
    const ids = [
      { id: this.props.id, name: this.props.name },
      { id: friend.id, name: friend.name }
    ];
    this.onFriendClick(this.state.clickedFriend);
    this.props.createChat(ids);
  }

  createInvitation = () => {
    const friend = { ...this.state.clickedFriend }
    this.onFriendClick(this.state.clickedFriend);
    this.props.createInvitation(friend);
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="friendList" >
          loading...
        </div>
      )
    }
    const { clickedFriend } = this.state;
    const friendAction = () => {
      if (this.state.clickedFriend != null) {
        return (
          <FriendAction
            clickedFriend={this.state.clickedFriend}
            createChat={this.createChat}
            createInvitation={this.createInvitation}
          />
        );
      }
      return undefined;
    }
    const onlineFriendList = this.props.onlineFriends.map((friend, i) => {
      const clickedFriend = {
        index : i,
        friend
      }

      return (
        <li
          className="friend online"
          key={friend.id}
          onClick={() => { this.onFriendClick(clickedFriend) }}
        >
          {friend.name}
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
           key={friend.id}
           onClick={() => { this.onFriendClick(clickedFriend) }}
         >
           {friend.name}
           <span>{logout}</span>
         </li>
       );
    })
    return (
      <div className="friendList" >
        {onlineFriendList}
        {offlineFriendList}
        {clickedFriend !== null && friendAction()}
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
  isLoading     : state.friends.isLoading,
})

const mapDispatchToProps = {
  getFriendList   : friendActions.dispatchGetFriendList,
  friendConnect   : friendActions.dispatchFriendConnect,
  friendDisconnect: friendActions.dispatchFriendDisconnect,
  createChat      : dispatchCreateChat,
  createInvitation: friendActions.dispatchCreateInvitation,
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
