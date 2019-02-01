import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  dispatchGetChatRooms,
  dispatchGetLastMsg,
  dispatchCreateChat,
} from '../../../actions/chat';

import ChatRoom from './ChatRoom';

import './css/ChatRooms.css';

const propTypes = {
  myId        : PropTypes.string.isRequired,
  chatRooms   : PropTypes.array.isRequired,
  getChatRooms: PropTypes.func.isRequired,
  getLastMsg  : PropTypes.func.isRequired,
  createChat  : PropTypes.func.isRequired,
};

class ChatRooms extends Component {
  state = {
    loaded: false,
    err   : false,
  }

  componentDidMount() {
    if (!this.state.loaded) {
      this.props.getChatRooms(
        () => this.setState({ loaded: true }),
        () => this.setState({ loaded: true, err: true })
      );
    }
  }

  render() {
    if (!this.state.loaded) {
      return (
        <div className="ChatRooms" style={{ textAlign: 'center' }} >
          <img src="/loading.gif" alt="loading" />
        </div>
      )
    } else if (this.state.err) {
      return (
        <div className="ChatRooms" style={{ textAlign: 'center' }} >
          <p style={{ fontSize: '20px' }} >Server Error...</p>
          <p style={{ fontSize: '16px' }}>Please try again</p>
        </div>
      )
    }

    const chatRooms = this.props.chatRooms.map((chatRoom, i) => {
      return (
        <ChatRoom
          myId={this.props.myId}
          chatId={chatRoom.chatId}
          ids={chatRoom.ids}
          names={chatRoom.names}
          imgs={chatRoom.imgs}
          key={`chatRoom${i}`}
          lastMsg={chatRoom.lastMsg}
          loadMsg={this.props.getLastMsg}
          openChat={this.props.createChat}
        />
      )
    });

    return (
      <div className="ChatRooms" >
        {chatRooms}
      </div>
    );
  }
};

ChatRooms.propTypes = propTypes;

const mapStateToProps = state => ({
  myId      : state.login.id,
  chatRooms : state.chat.chatRooms,
});

const mapDispatchToProps = {
  getChatRooms: dispatchGetChatRooms,
  getLastMsg  : dispatchGetLastMsg,
  createChat  : dispatchCreateChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRooms);
