import React from 'react';
import PropTypes from 'prop-types';

import './css/Messages.css';

const propTypes = {
  messages: PropTypes.array
}

const defaultProps = {
  messages: []
}

const Messages = (props) => {
  return (
    <ul id="Messages">
      hello
    </ul>
  )
}

Messages.propTypes = propTypes;
Messages.defaultProps = defaultProps;

export default Messages;
