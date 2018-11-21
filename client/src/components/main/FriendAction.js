import React from 'react';

import './css/FriendAction.css';

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
        <li>
          open chat
        </li>
        <li>
          send invitation
        </li>
      </ul>
    </div>
  )
}

export default FriendAction;
