import React from 'react';
import PropTypes from 'prop-types';

import './css/Header.css';

import logo from './../login/hungry.jpg';

const propTypes = {
  user        : PropTypes.object,
  handleLogout: PropTypes.func,
  openHeader  : PropTypes.func,
}

const defaultProps = {
  user        : null,
  handleLogout: () => { alert('handleLogout is not defined!'); },
  openHeader  : () => { alert('openHeader is not defined!'); },
}

const Header = (props) => {
  return (
    <div className="header">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <a className="navbar-brand navbar-left">
            <img
              className="nav-logo"
              alt=""
              src={logo}
              width="30"
              height="30"
              onClick={props.openHeader}
            /> RUHungry
          </a>

          <div className="navbar-text navbar-right">
            Hello, {props.user.name}
            <button className="logoutButton" onClick={props.handleLogout}>로그아웃</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
