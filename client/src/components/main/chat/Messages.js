import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/Messages.css';

const propTypes = {
  id      : PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
}

const defaultProps = {

}

class Messages extends Component {
  constructor(props) {
    super(props);

    this.messageRef = React.createRef();
  }

  componentDidUpdate() {
    let messageDiv = this.messageRef.current;
    messageDiv.scrollTop = messageDiv.scrollHeight;
  }

  render() {
    const printMessages = this.props.messages.map((data, i) => {
      const className = data.id === this.props.id ?
                        'sentMessage' : 'receivedMessages';
      return (
        <li
          className={`${className}`}
          key={`${data.id}:${i}`}
        >
          <div className="MessageInfo">
            {data.name}
            <span className="SentAt">{data.sentAt}</span>
          </div>
          <div className="Messages">{data.message}</div>
        </li>
      )
    })
    return (
      <ul id="Messages" ref={this.messageRef}>
        { printMessages }
      </ul>
    )
  }
}

Messages.propTypes = propTypes;
Messages.defaultProps = defaultProps;

export default Messages;
