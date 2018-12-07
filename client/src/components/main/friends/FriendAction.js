import React from 'react';
import PropTypes from 'prop-types';

import './css/FriendAction.css';

const undefinedFunc = (name) => {
  return () => {
    alert(`${name} is not defined!`);
  }
}

const propTypes = {
  yOff            : PropTypes.number,
  onFriendClick   : PropTypes.func,
  openChat        : PropTypes.func,
  createInvitation: PropTypes.func,
}

const defaultProps = {
  yOff            : -1,
  onFriendClick   : undefinedFunc('onFriendClick'),
  openChat        : undefinedFunc('openChat'),
  createInvitation: undefinedFunc('createInvitation'),
}

const FriendAction = (props) => {
  const yOff = props.yOff;
  const style = {
    position: 'absolute',
    left: 'calc(100% - 100px)',
    top: `${yOff * 25}px`
  }

  return (
    <div id="FriendAction" style={style}>
      <ul>
        <li
            onClick={ () => {
              props.onFriendClick(-1, true);
              props.openChat();
            }}
        >
          open chat
        </li>
        <li
            onClick={ () => {
              props.onFriendClick(-1, true);
              props.createInvitation();
            }}
        >
          send invitation
        </li>
      </ul>
    </div>
  )
}

FriendAction.propTypes = propTypes;
FriendAction.defaultProps = defaultProps;

export default FriendAction;
