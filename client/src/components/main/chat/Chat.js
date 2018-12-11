import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './css/Chat.css';

import Messages from './Messages';
import TypeMessage from './TypeMessage';

const propTypes = {
  friend    : PropTypes.object.isRequired,
  messages  : PropTypes.array.isRequired,
  newMessage: PropTypes.object
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
    const message = this.state.message;

    // send message to chatting friend

    this.setState({
      message: ''
    })
  }

  render() {
    return (
      <div id="Chat">
        <div id="ChatInfo">
          {this.props.friend.name}
        </div>

        <Messages messages={this.state.messages}/>

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
  friend    : state.friends.chatReceiver,
  messages  : state.chat.messages,
  newMessage: state.chat.newMessage,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
