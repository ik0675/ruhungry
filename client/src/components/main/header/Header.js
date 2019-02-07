import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import FriendSearch from '../findFriends/FriendSearch';

import './css/Header.css';

const propTypes = {
  id          : PropTypes.string.isRequired,
  name        : PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

const defaultProps = {

}

function Header(props) {
  return (
    <div className="header">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <Link
            className="navbar-brand navbar-left"
            to="/main"
          >
            <img
              className="nav-logo"
              alt="logo"
              src="/hungry.jpg"
              width="30"
              height="30"
            /> RUHungry
          </Link>
          <FriendSearch id={props.match.params.id}/>
          <div className="navbar-text navbar-right">
            <span
              onClick={() => {
                props.history.push(`/main/account/${props.id}`);
              }}
            >
              {props.name}
            </span>
            <span> | </span>
            <span
              onClick={() => {
                props.history.push(`/main/findFriends`);
              }}
              role="img"
              aria-label="friend"
            >
              👫
            </span>
            <button
              className="logoutButton"
              onClick={props.handleLogout}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default withRouter(Header);
