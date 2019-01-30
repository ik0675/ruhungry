import React from 'react';
import PropTypes from 'prop-types';

import './css/FriendRequest.css';

const propTypes = {
  friendRequest : PropTypes.object.isRequired,
  makeFriends   : PropTypes.func.isRequired,
  index         : PropTypes.number.isRequired,
};

function FriendRequest(props) {
  return (
    <div className="FriendRequest">
      <div className="FriendRequest-user">
        <img src={`/images/${props.friendRequest.img}`} alt="friend"/>
        <p>{props.friendRequest.name}</p>
      </div>
      <div className="FriendRequest-buttons">
        <button
          status="accept"
          onClick={() => {
            const { num, id } = props.friendRequest;
            console.log(num, id);
            props.makeFriends(num, id, true, props.index);
          }}
        >
          Accept
        </button>
        <button
          status="reject"
          onClick={() => {
            const { num, id } = props.friendRequest;
            props.makeFriends(num, id, false, props.index);
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

FriendRequest.propTypes = propTypes;

export default FriendRequest;
