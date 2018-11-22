import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/Chat.css';

import Messages from './Messages';
import TypeMessage from './TypeMessage';

const propTypes = {
  friend: PropTypes.object
}

const defaultProps = {
  friend: null
}

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: [],
    }
  }

  handleMessage = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const message = this.state.message;

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

export default Chat;
