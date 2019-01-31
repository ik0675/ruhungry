import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/TopNav.css';

const propTypes = {
  refs  : PropTypes.object.isRequired,
};

const defaultProps = {

};

class TopNav extends Component {
  state = {
    current: 0,
  };

  componentWillUpdate(nextProps, nextState) {
    const refs = this.props.refs;
    switch(nextState.current) {
      case 0:
        return window.scrollTo(0, refs.invitation.current.offsetTop);
      case 1:
        return window.scrollTo(0, refs.friendRequest.current.offsetTop);
      case 2:
        return window.scrollTo(0, refs.openChatRooms.current.offsetTop);
      default:
        return;
    }
  }

  handleClick = (num) => { this.setState({ current: num }); }

  render() {
    const { current } = this.state;
    return (
      <div className="TopNav">
        <ul>
          <li>
            <span
              active={current === 0 ? 'true' : 'false'}
              onClick={() => {
                this.setState({ current: 0 });
              }}
            >
              Invitations
            </span>
          </li>
          <span> | </span>
          <li>
            <span
              active={current === 1 ? 'true' : 'false'}
              onClick={() => {
                this.setState({ current: 1 });
              }}
            >
              Friend Requests
            </span>
          </li>
          <span> | </span>
          <li>
            <span
              active={current === 2 ? 'true' : 'false'}
              onClick={() => {
                this.setState({ current: 2 });
              }}
            >
              Open Chat Rooms
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

TopNav.propTypes = propTypes;
TopNav.defaultProps = defaultProps;

export default TopNav;
