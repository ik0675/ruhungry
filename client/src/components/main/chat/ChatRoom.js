import React, { Component } from "react";
import PropTypes from "prop-types";

import "./css/ChatRoom.css";

const propTypes = {
  myId: PropTypes.string.isRequired,
  chatId: PropTypes.string.isRequired,
  ids: PropTypes.array.isRequired,
  names: PropTypes.array.isRequired,
  imgs: PropTypes.array.isRequired,
  openChat: PropTypes.func.isRequired
};

class ChatRoom extends Component {
  state = {
    togglePeople: false
  };

  handleToggle = e => {
    const name = e.target.getAttribute("name");
    this.setState(prevState => ({
      [name]: !prevState[name]
    }));
    e.stopPropagation();
  };

  openChat = () => {
    const ids = this.props.ids;
    let ids_json = [{ id: this.props.myId }];
    for (let i = 0; i < ids.length; ++i) {
      ids_json.push({ id: ids[i] });
    }
    this.props.openChat(ids_json);
  };

  render() {
    let result = [];
    for (let i = 0; i < this.props.names.length; ++i) {
      const name = this.props.names[i];
      const img = this.props.imgs[i];
      result.push(
        <div className="ChatRoom-user" key={`chatRoom${i}`}>
          <img src={`${img}`} alt={name} />
          <span>{name}</span>
        </div>
      );
    }

    return (
      <div className="ChatRoom" onClick={this.openChat}>
        <div
          className="ChatRoom-users"
          showall={this.state.togglePeople ? "true" : "false"}
          style={{
            height: this.state.togglePeople ? "auto" : "50px"
          }}
        >
          <p className="ChatRoom-titles">
            Chat Participants ({this.props.names.length} people)
          </p>
          <div className="ChatRoom-icon">
            <span
              role="img"
              aria-label="black down pointing triangle"
              name="togglePeople"
              onClick={this.handleToggle}
            >
              ▼
            </span>
          </div>
          {result}
        </div>
      </div>
    );
  }
}

ChatRoom.propTypes = propTypes;

export default ChatRoom;
