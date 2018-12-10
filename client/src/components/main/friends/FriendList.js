import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as friendActions from '../../../actions/friends';

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
}

const defaultProps = {

}

class FriendList extends Component {
  constructor(props) {
    super(props);

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
    this.setState({
      clickedFriend
    })
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="friendList" >
          loading...
        </div>
      )
    }
    // const { clickedFriend } = this.state;
    // const friendAction = () => (
    //   <FriendAction
    //     clickedFriend={this.state.clickedFriend}
    //     onFriendClick={this.onFriendClick}
    //   />
    // );
    const onlineFriendList = this.props.onlineFriends.map((friend, i) => {
      return (
        <li
          className="friend online"
          key={friend.id}
          onClick={() => {
            const clickedFriend = {
              status: true,
              index : i,
              friend
            }
            this.onFriendClick(clickedFriend)
          }}
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
       return (
         <li
           className="friend offline"
           key={friend.id}
           onClick={() => {
             const clickedFriend = {
               status: true,
               index : i + this.props.onlineFriends.length,
               friend
             }
             this.onFriendClick(clickedFriend)
           }}
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
        {/*clickedFriend !== null && clickedFriend.status && friendAction()*/}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
