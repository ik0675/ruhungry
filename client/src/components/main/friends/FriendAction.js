import React from 'react';
import PropTypes from 'prop-types';

import './css/FriendAction.css';

const propTypes = {
  clickedFriend   : PropTypes.object,
  goToAccount     : PropTypes.func.isRequired,
  createChat      : PropTypes.func.isRequired,
  createInvitation: PropTypes.func.isRequired,
}

const defaultProps = {
  clickedFriend: null,
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
        <li onClick={props.goToAccount}>
          account profile
        </li>
        <li onClick={props.createChat} >
          open chat
        </li>
        <li onClick={props.createInvitation} >
          send invitation
        </li>
      </ul>
    </div>
  )
}

FriendAction.propTypes = propTypes;
FriendAction.defaultProps = defaultProps;

export default FriendAction;
