import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dispatchLoadAccountInfo } from '../../../actions/account';

import './css/Account.css';

const propTypes = {
  id      : PropTypes.string.isRequired,
  name    : PropTypes.string.isRequired,
  userImg : PropTypes.string.isRequired,
  loaded  : PropTypes.bool.isRequired,
  load    : PropTypes.func.isRequired,
};

class Account extends Component {
  componentDidMount() {
    if (!this.props.loaded) {
      const id = this.props.match.params.id;
      this.props.load(id);
    }
  };

  render() {
    const { id, name, userImg, loaded } = this.props;
    if (!loaded) {
      return (
        <div className="Account">
          <p>Loading account information...</p>
          <img src="/loading.gif" alt="loading" />
        </div>
      )
    }
    return (
      <div className="Account">
        <img src={`/images/${userImg}`} alt="user" />
        <p>{name}</p>
      </div>
    );
  };
}

Account.propTypes = propTypes;

const mapStateToProps = state => ({
  id      : state.account.id,
  name    : state.account.name,
  userImg : state.account.userImg,
  loaded  : state.account.loaded,
});

const mapDispatchToProps = {
  load : dispatchLoadAccountInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
