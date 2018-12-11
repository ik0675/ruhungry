import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as chatActions from '../../../actions/chat';

import './css/Chat.css';

import Messages from './Messages';
import TypeMessage from './TypeMessage';

const propTypes = {
  id          : PropTypes.string.isRequired,
  chatInfo    : PropTypes.object.isRequired,
  messages    : PropTypes.array.isRequired,
  exitChat    : PropTypes.func.isRequired,
  sendMessage : PropTypes.func.isRequired,
}

const defaultProps = {
  
}

class Chat extends Component {
  state = {
    message: '',
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
      this.props.sendMessage({
        chat_id : this.props.chatInfo.chatId,
        id      : this.props.id,
        message : this.state.message })
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

        <Messages messages={this.state.messages} />

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
  chatInfo: state.chat.chatInfo,
  messages: state.chat.messages,
})

const mapDispatchToProps = {
  exitChat    : chatActions.dispatchExitChat,
  sendMessage : chatActions.dispatchSendMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
