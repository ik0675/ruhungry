import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/ChatRoom.css';

const propTypes = {
  chatId  : PropTypes.string.isRequired,
  ids     : PropTypes.array.isRequired,
  names   : PropTypes.array.isRequired,
  imgs    : PropTypes.array.isRequired,
  lastMsg : PropTypes.string,
  loadMsg : PropTypes.func.isRequired,
};

const defaultProps = {
  lastMsg: '',
}

class ChatRoom extends Component {
  state = {
    togglePeople: false,
    toggleMsg   : false,
    msgLoaded   : false,
  };

  componentDidMount() {
    if (!this.state.msgLoaded) {
      this.props.loadMsg(
        this.props.chatId,
        () => this.setState({ msgLoaded: 'loaded' })
      );
    }
  }

  handleToggle = (e) => {
    const name = e.target.getAttribute('name');
    this.setState(prevState => ({
      [name]: !prevState[name]
    }));
    e.stopPropagation();
  };

  render() {
    let result = [];
    for (let i = 0; i < this.props.names.length; ++i) {
      const name = this.props.names[i];
      const img = this.props.imgs[i];
      result.push(
        <div className="ChatRoom-user" key={`chatRoom${i}`}>
          <img src={`/images/${img}`} alt={name} />
          <span>{name}</span>
        </div>
      );
    }

    return (
      <div className="ChatRoom" onClick={()=> { alert('hey') }} >
        <div
          className="ChatRoom-users"
          showall={this.state.togglePeople ? 'true' : 'false'}
          style={{
            height: this.state.togglePeople ? 'auto' : '50px',
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
        <div
          className="ChatRoom-message-panel"
          showall={this.state.toggleMsg ? 'true' : 'false'}
          style={{
            height: this.state.toggleMsg ? 'auto' : '50px',
          }}
        >
          <p className="ChatRoom-titles">Last Message</p>
          <div className="ChatRoom-icon">
            <span
              role="img"
              aria-label="black down pointing triangle"
              name="toggleMsg"
              onClick={this.handleToggle}
            >
              ▼
            </span>
          </div>
          <div
            className="ChatRoom-message"
            style={{
              textAlign: this.state.msgLoaded ? 'left' : 'center',
            }}
          >
            {!this.state.msgLoaded &&
              <img
                src="/loading.gif" alt="loading"
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
            }
            {this.state.msgLoaded === 'err' &&
              <p
                style={{
                  color: 'red',
                  fontStyle: 'italic'
                }}
              >
                Server Error...
              </p>
            }
            {this.state.msgLoaded === 'loaded' &&
              <p
                style={{
                  marginLeft: '10px',
                  color: 'lightgray'
                }}
              >
                {this.props.lastMsg}
              </p>
            }
          </div>
        </div>
      </div>
    );
  };
};

ChatRoom.propTypes = propTypes;
ChatRoom.defaultProps = defaultProps;

export default ChatRoom;
