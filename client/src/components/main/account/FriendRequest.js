import React from "react";
import PropTypes from "prop-types";

import "./css/FriendRequest.css";

const propTypes = {
  myId: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired,
  friendRequest: PropTypes.object.isRequired,
  makeFriends: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

function FriendRequest(props) {
  return (
    <div className="FriendRequest">
      <div className="FriendRequest-user">
        <img src={`${props.friendRequest.img}`} alt="friend" />
        <p>{props.friendRequest.name}</p>
      </div>
      <div className="FriendRequest-buttons">
        <button
          status="accept"
          onClick={() => {
            const { num, id } = props.friendRequest;
            const { myId, socket } = props;
            props.makeFriends(num, myId, id, true, props.index, socket);
          }}
        >
          Accept
        </button>
        <button
          status="reject"
          onClick={() => {
            const { num, id } = props.friendRequest;
            const { myId, socket } = props;
            props.makeFriends(num, myId, id, false, props.index, socket);
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
