import React from 'react';
import PropTypes from 'prop-types';

import './css/FriendRequest.css';

const propTypes = {
  friendRequest: PropTypes.object.isRequired,
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

          }}
        >
          Accept
        </button>
        <button
          status="reject"
          onClick={() => {

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
