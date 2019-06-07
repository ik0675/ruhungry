import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  dispatchLoadAccountInfo,
  dispatchFriendRequest
} from "../../../actions/account";

import TopNav from "./TopNav";
import FriendRequests from "./FriendRequests";
import Posts from "../post/Posts";
import ChatRooms from "../chat";
import UploadProfilePic from "../upload/ProfilePic";

import "./css/Account.css";

const propTypes = {
  myId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  userImg: PropTypes.string.isRequired,
  friendStatus: PropTypes.string,
  load: PropTypes.func.isRequired,
  friendRequest: PropTypes.func.isRequired
};

class Account extends Component {
  state = {
    invitation: 2,
    id: this.props.match.params.id,
    loaded: false,
    editProfilePic: false
  };

  invitationRef = React.createRef();
  friendRequestRef = React.createRef();
  openChatRoomsRef = React.createRef();

  componentDidMount() {
    const id = this.props.match.params.id;
    if (!this.state.loaded) {
      this.props.load(id, () => this.setState({ loaded: true }));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.id !== nextProps.match.params.id) {
      this.setState(
        {
          id: nextProps.match.params.id,
          loaded: false
        },
        () =>
          this.props.load(this.state.id, () => this.setState({ loaded: true }))
      );
    }
  }

  handleEditProfilePic = _ => {
    this.setState(prevState => ({
      editProfilePic: !prevState.editProfilePic
    }));
  };

  handleInvitationFilter = e => {
    const val = parseInt(e.target.value, 10);
    if (this.state.invitation !== val) {
      this.setState({ invitation: val });
    }
  };

  sendFriendRequest = _ => {
    const { id } = this.props;
    this.setState({ friendLoaded: false }, () => {
      this.props.friendRequest(id, () => this.setState({ friendLoaded: true }));
    });
  };

  render() {
    const { myId, id, name, userImg, friendStatus } = this.props;
    const { loaded } = this.state;
    if (!loaded) {
      return (
        <div className="Account">
          <p>Loading account information...</p>
          <img src="/loading.gif" alt="loading" />
        </div>
      );
    } else if (id === "") {
      return (
        <div className="Account">
          <p>The ID requested doesn't exist...</p>
          <p>This is most likely because the user deactivated the account</p>
        </div>
      );
    }
    let button, editProfilePic;
    if (myId !== id) {
      if (friendStatus === "friend") {
        button = <button className="btn-friend">Friends!</button>;
      } else if (friendStatus === "not sent") {
        button = (
          <button className="btn-notSent" onClick={this.sendFriendRequest}>
            Send Friend Request
          </button>
        );
      } else if (friendStatus === "sent") {
        button = <button className="btn-sent">Request Sent</button>;
      } else if (friendStatus === "err") {
        button = <button className="btn-err">Server Error...</button>;
      }
    } else {
      editProfilePic = (
        <button onClick={this.handleEditProfilePic}>
          Edit profile picture
        </button>
      );
    }

    const refs = {
      invitation: this.invitationRef,
      friendRequest: this.friendRequestRef,
      openChatRooms: this.openChatRoomsRef
    };
    return (
      <div className="Account">
        <TopNav refs={refs} />
        <img src={`${userImg}`} alt="user" />
        <p className="account-info">
          {name}
          {button}
          {editProfilePic}
        </p>
        <div className="Account-panel">
          <div className="Account-invitations" ref={this.invitationRef}>
            <hr />
            <div className="invitation-filter">
              Invitations
              <div>
                <select onChange={this.handleInvitationFilter}>
                  <option value="2">All</option>
                  <option value="0">Sent</option>
                  <option value="1">Received</option>
                </select>
              </div>
            </div>
            <hr />
            <Posts
              makePost={false}
              page="account"
              filter={this.state.invitation}
              accountId={this.props.match.params.id}
            />
          </div>
          {myId === id && (
            <div className="Account-friendRequest" ref={this.friendRequestRef}>
              <hr />
              <p>Friend Requests</p>
              <hr />
              <FriendRequests />
            </div>
          )}
          {myId === id && (
            <div className="Account-chat" ref={this.openChatRoomsRef}>
              <hr />
              <p>Open Chat Rooms</p>
              <hr />
              <ChatRooms />
            </div>
          )}
          {this.state.editProfilePic && (
            <UploadProfilePic toggleUpload={this.handleEditProfilePic} />
          )}
        </div>
      </div>
    );
  }
}

Account.propTypes = propTypes;

const mapStateToProps = state => ({
  myId: state.login.id,
  id: state.account.id,
  name: state.account.name,
  userImg: state.account.userImg,
  friendStatus: state.account.friendStatus
});

const mapDispatchToProps = {
  load: dispatchLoadAccountInfo,
  friendRequest: dispatchFriendRequest
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account)
);
