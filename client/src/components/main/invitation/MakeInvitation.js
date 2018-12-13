import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './css/MakeInvitation.css';

const propTypes = {
  onlineFriends : PropTypes.array.isRequired,
  offlineFriends: PropTypes.array.isRequired,
}

const defaultProps = {

}

class MakeInvitation extends Component {
  state = {
    friends: [],
    restaurant: '',
    restaurantImg: '',
  }

  checkIfSelected = (friend) => {
    const id = friend.id;
    for (let i = 0; i < this.state.friends.length; ++i) {
      if (this.state.friends[i].id === id)
        return true;
    }
    return false;
  }

  handleFriendSelect = (e) => {
    const friend = JSON.parse(e.target.value);
    if (!this.checkIfSelected(friend)) {
      this.setState(prevState => ({
        friends: [ ...prevState.friends, friend ]
      }))
    }
  }

  handleChange = (e) => this.setState({ restaurant: e.target.value })

  render() {
    const friends = [
      ...this.props.onlineFriends,
      ...this.props.offlineFriends,
    ]
    const printFriendOptions = friends.map(friend => (
      <option
        value={JSON.stringify(friend)}
        key={friend.id}
      >
        {friend.name}
      </option>
    ));
    const printFriendSelected = this.state.friends.map(friend => (
      <span key={friend.id}>{friend.name} </span>
    ))
    return (
      <div className="MakeInvitation">
        <h1>Send Invitation to Friends!</h1>
        <div className="select friends">
          <p>Select friends to invite</p>
          <select onChange={this.handleFriendSelect}>
            <option hidden>--select a friend--</option>
            {printFriendOptions}
          </select>
        </div>
        <div className="selected friends">
          <p>Selected friends</p>
          {printFriendSelected}
        </div>
        <div className="type restaurant">
          Restaurant :
          <input
            placeholder="restaurant name"
            value={this.state.restaurant}
            onChange={this.handleChange}
          />
        </div>
        <div className="select img">
          <p>Select a restaurant image</p>
          <div>
            
          </div>
        </div>
        <div className="selected img">
          <p>Selected restaurant image</p>
        </div>
      </div>
    )
  }
}

MakeInvitation.propTypes = propTypes;
MakeInvitation.defaultProps = defaultProps;

const mapStateToProps = state => ({
  onlineFriends : state.friends.onlineFriends,
  offlineFriends: state.friends.offlineFriends,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MakeInvitation);
