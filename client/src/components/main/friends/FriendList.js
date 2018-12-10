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
  getFriendList   : PropTypes.func.isRequired,
  friendConnect   : PropTypes.func.isRequired,
  friendDisconnect: PropTypes.func.isRequired,

  // socket                : PropTypes.object,
  // user                  : PropTypes.object,
  // friends               : PropTypes.object,
  // clickedFriend         : PropTypes.object,
  // toggleSetting         : PropTypes.bool,
  // onFriendClick         : PropTypes.func,
  // getFriends            : PropTypes.func,
  // handleFriendConnect   : PropTypes.func,
  // handleFriendDisconnect: PropTypes.func,
  // openChat              : PropTypes.func,
  // createInvitation      : PropTypes.func,
}

const defaultProps = {
  // socket                : null,
  // user                  : null,
  // friends               : null,
  // clickedFriend         : null,
  // toggleSetting         : false,
  // onFriendClick         : undefinedFunc('onFriendClick'),
  // getFriends            : undefinedFunc('getFriends'),
  // handleFriendConnect   : undefinedFunc('handleFriendConnect'),
  // handleFriendDisconnect: undefinedFunc('handleFriendDisconnect'),
  // openChat              : undefinedFunc('openChat'),
  // createInvitation      : undefinedFunc('createInvitation'),
}

class FriendList extends Component {
  constructor(props) {
    super(props);

    this.props.getFriendList(this.props.id);
  }

  componentDidMount() {
    const friends = {
      onlineFriends : this.props.onlineFriends,
      offlineFriends: this.props.offlineFriends,
    }

    this.props.socket.on('friendConnected', (user) => {
      this.props.friendConnect(user, friends);
    });
    this.props.socket.on('friendDisconnected', (user) => {
      this.props.friendDisconnect(user, friends);
    });
  }

  render() {
    // const { clickedFriend, toggleSetting } = this.props;
    // const friendAction = (
    //   <FriendAction
    //     yOff={clickedFriend.index}
    //     onFriendClick={this.props.onFriendClick}
    //     openChat={this.props.openChat}
    //     createInvitation={this.props.createInvitation}
    //   />
    // );
    const onlineFriendList = this.props.onlineFriends.map((user) => {
      // onClick={() => { this.props.onFriendClick(i, true) }}
      return <li
                className="friend online"
                key={user.id}
             >
              {user.name}
             </li>;
    })
    const offlineFriendList = this.props.offlineFriends.map((user) => {
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
       // onClick={() => { this.props.onFriendClick(i, false) }}
       return <li
                className="friend offline"
                key={user.id}
              >
                {user.name}
                <span>{logout}</span>
              </li>;
    })
    return (
      <div className="friendList">
        {onlineFriendList}
        {offlineFriendList}
        {/*toggleSetting && clickedFriend !== null && friendAction() */}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
