import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  dispatchGetImages,
  dispatchSendInvitation,
  dispatchGetRestaurants
} from "../../../actions/invitation";

import RestaurantSearch from "./RestaurantSearch";

import "./css/MakeInvitation.css";

const propTypes = {
  onlineFriends: PropTypes.array.isRequired,
  offlineFriends: PropTypes.array.isRequired,
  imgs: PropTypes.array.isRequired,
  getImages: PropTypes.func.isRequired,
  sendInvitation: PropTypes.func.isRequired,
  getRestaurants: PropTypes.func.isRequired,
  onExit: PropTypes.func,
  style: PropTypes.object,
  socket: PropTypes.object.isRequired
};

const defaultProps = {
  onExit: () => alert("onExit is not defined!"),
  style: {}
};

class MakeInvitation extends Component {
  state = {
    friends: [],
    restaurant: "",
    restaurantImg: "",
    loading: false
  };

  selectRef = React.createRef();

  sendInvitation = () => {
    const img = this.props.imgs[0];
    this.setState({ restaurantImg: img }, () => {
      const { friends, restaurant, restaurantImg } = { ...this.state };
      const { socket } = this.props;
      this.props.sendInvitation(friends, restaurant, restaurantImg, socket);
      this.setState({
        friends: [],
        restaurant: "",
        restaurantImg: ""
      });
    });
  };

  checkIfSelected = friend => {
    const id = friend.id;
    for (let i = 0; i < this.state.friends.length; ++i) {
      if (this.state.friends[i].id === id) return true;
    }
    return false;
  };

  handleFriendSelect = e => {
    const friend = JSON.parse(e.target.value);
    if (!this.checkIfSelected(friend)) {
      this.setState(
        prevState => ({
          friends: [...prevState.friends, friend]
        }),
        () => {
          // after a friend has been selected, reset the select tag
          this.selectRef.current.selectedIndex = 0;
        }
      );
    }
  };

  handleChange = e => {
    this.setState({ restaurant: e.target.value }, () => {
      if (this.state.restaurant.length > 0)
        this.props.getRestaurants(this.state.restaurant);
    });
  };

  getImages = restaurant => {
    this.setState({ loading: true }, () => {
      this.props.getImages(restaurant, () => this.setState({ loading: false }));
    });
  };

  render() {
    const friends = [...this.props.onlineFriends, ...this.props.offlineFriends];
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
      <option value={JSON.stringify(friend)} key={friend.id}>
        {friend.name}
      </option>
    ));
    const printFriendSelected = this.state.friends.map(friend => (
      <span key={friend.id}>{friend.name} </span>
    ));
    let selectedImg = undefined;
    if (this.state.loading) {
      selectedImg = (
        <img className="restaurant-loading" src="/loading.gif" alt="loading" />
      );
    } else {
      selectedImg =
        this.props.imgs.length === 0 ? (
          undefined
        ) : (
          <img
            className="restaurant-selected"
            src={`${this.props.imgs[0]}`}
            alt="restaurant selected"
          />
        );
    }
    return (
      <div className="MakeInvitation" style={this.props.style}>
        <h1>
          Send Invitation to Friends!
          {this.props.displayExit && printExit}
        </h1>
        <div className="select friends">
          <p>Select friends to invite</p>
          <select onChange={this.handleFriendSelect} ref={this.selectRef}>
            <option hidden>--select a friend--</option>
            {printFriendOptions}
          </select>
        </div>
        <div className="selected friends">
          <p>Selected friends</p>
          {printFriendSelected}
        </div>
        <RestaurantSearch
          restaurant={this.state.restaurant}
          handleChange={this.handleChange}
          getImages={this.getImages}
        />
        <div className="selected img">
          <p>Selected restaurant image</p>
          <div className="img-panel">{selectedImg}</div>
          <button className="send" onClick={this.sendInvitation}>
            Send Invitation!
          </button>
        </div>
      </div>
    );
  }
}

MakeInvitation.propTypes = propTypes;
MakeInvitation.defaultProps = defaultProps;

const mapStateToProps = state => ({
  onlineFriends: state.friends.onlineFriends,
  offlineFriends: state.friends.offlineFriends,
  imgs: state.invitation.imgs,
  socket: state.login.socket
});

const mapDispatchToProps = {
  getImages: dispatchGetImages,
  sendInvitation: dispatchSendInvitation,
  getRestaurants: dispatchGetRestaurants
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MakeInvitation);
