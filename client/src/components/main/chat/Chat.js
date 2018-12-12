import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as chatActions from '../../../actions/chat';

import './css/Chat.css';

import Messages from './Messages';
import TypeMessage from './TypeMessage';

const propTypes = {
  id            : PropTypes.string.isRequired,
  socket        : PropTypes.object.isRequired,
  chatInfo      : PropTypes.object.isRequired,
  messages      : PropTypes.array.isRequired,
  exitChat      : PropTypes.func.isRequired,
  sendMessage   : PropTypes.func.isRequired,
  receiveMessage: PropTypes.func.isRequired,
  getMessages   : PropTypes.func.isRequired,
}

const defaultProps = {

}

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }

    this.props.getMessages(this.props.chatInfo.chatId, 0);
  }

  componentDidMount() {
    this.props.socket.on('newMessage', (data) => {
      console.log('got message', data);
      this.props.receiveMessage(data);
    })
  }

  handleMessage = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    // send message to chatting friend only if anything is typed
    if (this.state.message !== '') {
      const data = {
        chat_id : this.props.chatInfo.chatId,
        id      : this.props.id,
        message : this.state.message
      }
      this.props.sendMessage(data, this.props.socket);
      this.setState({
        message: ''
      })
    }
  }

  getNames = () => {
    const ids = this.props.chatInfo.ids;
    let names = [];
    for (let i = 0; i < ids.length; ++i) {
      names.push(ids[i].name);
    }
    return names;
  }

  render() {
    const names = this.getNames();
    const printNames = names.map(name => {
      return ( name );
    })
    return (
      <div id="Chat">
        <div id="ChatInfo">
          {printNames}
          <span
            role="button"
            aria-label="small roman numeral ten"
            onClick={this.props.exitChat}
          >
            ⅹ
          </span>
        </div>

        <Messages
          id={this.props.id}
          messages={this.props.messages}
        />

        <TypeMessage
          message={this.state.message}
          handleMessage={this.handleMessage}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

Chat.propTypes = propTypes;
Chat.defaultProps = defaultProps;

const mapStateToProps = state => ({
  id      : state.login.id,
  socket  : state.login.socket,
  chatInfo: state.chat.chatInfo,
  messages: state.chat.messages,
})

const mapDispatchToProps = {
  exitChat      : chatActions.dispatchExitChat,
  sendMessage   : chatActions.dispatchSendMessage,
  receiveMessage: chatActions.dispatchReceiveMessage,
  getMessages   : chatActions.dispatchGetMessages,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
