import React from 'react';
import PropTypes from 'prop-types';

import './css/Header.css';

const propTypes = {
  name        : PropTypes.string.isRequired,
  handleLogout: PropTypes.func,
}

const defaultProps = {
  name        : undefined,
  handleLogout: () => { alert('handleLogout is not defined') },
}

function Header(props) {
  return (
    <div className="header">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <a className="navbar-brand navbar-left">
            <img
              className="nav-logo"
              alt="logo"
              src="/hungry.jpg"
              width="30"
              height="30"
            /> RUHungry
          </a>

          <div className="navbar-text navbar-right">
            Hello, {props.name}
            <button className="logout
            Button" onClick={props.handleLogout}>로그아웃</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
