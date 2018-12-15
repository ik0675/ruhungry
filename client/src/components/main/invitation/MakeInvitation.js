import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dispatchGetImages, dispatchSendInvitation } from '../../../actions/invitation';

import './css/MakeInvitation.css';

const propTypes = {
  onlineFriends : PropTypes.array.isRequired,
  offlineFriends: PropTypes.array.isRequired,
  imgs          : PropTypes.array.isRequired,
  getImages     : PropTypes.func.isRequired,
  sendInvitation: PropTypes.func.isRequired,
  onExit        : PropTypes.func,
  style         : PropTypes.object,
  socket        : PropTypes.object.isRequired,
}

const defaultProps = {
  onExit: () => alert('onExit is not defined!'),
  style : {}
}

class MakeInvitation extends Component {
  state = {
    friends       : [],
    restaurant    : '',
    restaurantImg : '',
  }

  sendInvitation = () => {
    const { friends, restaurant, restaurantImg } = { ...this.state };
    const { socket } = this.props;
    this.props.sendInvitation(friends, restaurant, restaurantImg, socket);
    this.setState({
      friends       : [],
      restaurant    : '',
      restaurantImg : '',
    });
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

  handleChange = (e) => {
    this.setState({ restaurant: e.target.value })
  }

  selectRestaurantImg = (img) => {
    this.setState({ restaurantImg: img });
  }

  getImages = () => {
    if (this.props.loading) {
      return <img src="loading.gif" alt="loading" />;
    }
    if (this.props.imgs.length === 0)
      return undefined;
    return this.props.imgs.map((img, i) => (
      <img
        src={`/${img}`}
        alt="restaurant"
        key={i}
        onClick={() => this.selectRestaurantImg(img)}
      />
    ));
  }

  render() {
    const friends = [
      ...this.props.onlineFriends,
      ...this.props.offlineFriends,
    ];
    const printExit = (
      <span
        role="img"
        aria-label="small roman numeral ten"
        onClick={this.props.onExit}
      >
        ⅹ
      </span>
    );
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
    const imgs = this.getImages();
    const selectedImg = this.state.restaurantImg === ''
      ? undefined
      : <img src={`/${this.state.restaurantImg}`} alt="restaurant selected" />;
    return (
      <div
        className="MakeInvitation"
        style={this.props.style}
      >
        <h1>
          Send Invitation to Friends!
          {this.props.displayExit && printExit}
        </h1>
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
            <button onClick={() =>
                this.props.getImages(this.state.restaurant)
              }
            >
              browse images
            </button>
            {imgs}
          </div>
        </div>
        <div className="selected img">
          <p>Selected restaurant image</p>
          {selectedImg}
          <button
            className="send"
            onClick={this.sendInvitation}
          >
            Send Invitation!
          </button>
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
  imgs          : state.invitation.imgs,
  loading       : state.invitation.loading,
  socket        : state.login.socket,
})

const mapDispatchToProps = {
  getImages     : dispatchGetImages,
  sendInvitation: dispatchSendInvitation,
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeInvitation);
