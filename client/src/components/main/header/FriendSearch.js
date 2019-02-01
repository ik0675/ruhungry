import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { dispatchFriendSearch } from '../../../actions/friends';

import FriendSuggest from './FriendSuggest';

import './css/FriendSearch.css';

const propTypes = {
  id            : PropTypes.string.isRequired,
  friendSuggests: PropTypes.array.isRequired,
  friendSearch  : PropTypes.func.isRequired,
};

class FriendSearch extends Component {
  state = {
    val     : '',
    onFocus : false,
    loading : true,
    err     : false,
  };

  handleChange = e => {
    this.setState({
      val: e.target.value,
    }, () => {
      console.log(this.state.val)
      if (this.state.val.length > 0) {
        this.props.friendSearch(
          this.state.val,
          () => this.setState({ loading: false }),
          () => this.setState({ loading: false, err: true })
        );
      }
    });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      alert(this.state.val);
    }
  };

  render() {
    return (
      <div className="FriendSearch" >
        <label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Search for a friend"
            name="val"
            onFocus={() => this.setState({ onFocus: true })}
            onBlur={() => this.setState({ onFocus: false })}
            autoComplete="off"
          />
        </label>
        <div
          className="FriendSearch-suggest"
          style={{
            display: this.state.val.length !== 0 && this.state.onFocus
              ? 'block' : 'none',
            textAlign: this.state.loading ? 'center' : 'left',
          }}
        >
          {this.state.loading &&
            <img
              src="/loading.gif"
              alt="loading"
              style={{ width: '20px', height: '20px' }}
            />
          }
          {!this.state.loading && this.state.err &&
            <p>Server Err... Please try again later</p>
          }
          {!this.state.loading && !this.state.err &&
            this.props.friendSuggests.length === 0 &&
            <p>There is no one by the name of {this.state.val}</p>
          }
          {!this.state.loading && !this.state.err &&
            this.props.friendSuggests.map((person, i) => {
              return (
                <FriendSuggest
                  person={person}
                  key={`person${i}`}
                  handleChange={this.handleChange}
                />
              );
            })
          }
        </div>
      </div>
    );
  };
};

FriendSearch.propTypes = propTypes;

const mapStateToProps = state => ({
  friendSuggests: state.friends.friendSuggests,
});

const mapDispatchToProps = {
  friendSearch:  dispatchFriendSearch
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FriendSearch));
