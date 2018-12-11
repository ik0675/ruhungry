import React from 'react';
import PropTypes from 'prop-types';

import './css/Messages.css';

const propTypes = {
  id      : PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
}

const defaultProps = {

}

const Messages = (props) => {
  const printMessages = props.messages.map((message, i) => {
    const className = message.id === props.id ? 'sentMessage' : 'receivedMessage';
    return (
      <li className={`${className}`}>
        message.message
      </li>
    )
  })
  return (
    <ul id="Messages">
      { printMessages }
    </ul>
  )
}

Messages.propTypes = propTypes;
Messages.defaultProps = defaultProps;

export default Messages;
