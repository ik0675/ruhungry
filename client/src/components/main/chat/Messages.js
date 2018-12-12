import React from 'react';
import PropTypes from 'prop-types';

import './css/Messages.css';

const propTypes = {
  id      : PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
}

const defaultProps = {

}

function Messages(props) {
  const printMessages = props.messages.map((data, i) => {
    const className = data.id === props.id ?
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
    <ul id="Messages">
      { printMessages }
    </ul>
  )
}

Messages.propTypes = propTypes;
Messages.defaultProps = defaultProps;

export default Messages;
