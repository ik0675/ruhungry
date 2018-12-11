import React from 'react';
import PropTypes from 'prop-types';

import './css/TypeMessage.css';

const propTypes = {
  message       : PropTypes.string,
  handleMessage : PropTypes.func.isRequired,
  onSubmit      : PropTypes.func.isRequired,
}

const defaultProps = {
  message       : '',
}

const TypeMessage = (props) => {
  return (
    <form
        id="TypeMessage"
        onSubmit={props.onSubmit}
    >
      <input
        type="text"
        id="typeMessage"
        name="message"
        placeholder="type messages here..."
        value={props.message}
        onChange={props.handleMessage}
      />
      <input
        type="submit"
        id="sendMessage"
        value="Send"
      />
    </form>
  )
}

TypeMessage.propTypes = propTypes;
TypeMessage.defaultProps = defaultProps;

export default TypeMessage;
