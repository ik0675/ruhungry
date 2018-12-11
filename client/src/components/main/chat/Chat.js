import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dispatchExitChat } from '../../../actions/chat';

import './css/Chat.css';

import Messages from './Messages';
import TypeMessage from './TypeMessage';

const propTypes = {
  chatInfo  : PropTypes.object.isRequired,
  newMessage: PropTypes.object,
  messages  : PropTypes.array.isRequired,
  exitChat  : PropTypes.func.isRequired,
}

const defaultProps = {
  newMessage: null
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
    // send message to chatting friend

    this.setState({
      message: ''
    })
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
  chatInfo  : state.chat.chatInfo,
  messages  : state.chat.messages,
  newMessage: state.chat.newMessage,
})

const mapDispatchToProps = {
  exitChat  : dispatchExitChat
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
