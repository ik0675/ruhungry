import React from 'react';
import PropTypes from 'prop-types';

import './css/FriendAction.css';

const propTypes = {
  clickedFriend   : PropTypes.object,
  offsetTop       : PropTypes.number.isRequired,
  goToAccount     : PropTypes.func.isRequired,
  createChat      : PropTypes.func.isRequired,
  createInvitation: PropTypes.func.isRequired,
}

const defaultProps = {
  clickedFriend: null,
}

function FriendAction(props) {
  const yOff = props.offsetTop;
  const style = {
    position: 'absolute',
    left: 'calc(100% - 100px)',
    top: yOff,
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
