import React from 'react';
import PropTypes from 'prop-types';

import './css/FriendAction.css';

const undefinedFunc = (name) => {
  return () => {
    alert(`${name} is not defined!`);
  }
}

const propTypes = {
  onFriendClick   : PropTypes.func.isRequired,
  openChat        : PropTypes.func.isRequired,
  createInvitation: PropTypes.func.isRequired,
}

const defaultProps = {

}

function FriendAction(props) {
  const yOff = props.clickedFriend.index;
  const style = {
    position: 'absolute',
    left: 'calc(100% - 100px)',
    top: `${yOff * 25}px`
  }

  return (
    <div id="FriendAction" style={style}>
      <ul>
        <li
            onClick={() => {
              props.onFriendClick({ ...props.clickedFriend, status: false });
              // props.openChat();
            }}
        >
          open chat
        </li>
        <li
            onClick={() => {
              props.onFriendClick({ ...props.clickedFriend, status: false });
              // props.createInvitation();
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
