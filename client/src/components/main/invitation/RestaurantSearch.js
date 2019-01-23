import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './css/RestaurantSearch.css';

const propTypes = {
  restaurant  : PropTypes.string,
  restaurants : PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
}

const defaultProps = {
  restaurant: ""
}

class RestaurantSearch extends Component {
  state = {
    inFocus: false,
  }

  handleFocus = () => {
    this.setState({ inFocus: true });
  }

  handleFocusOut = () => {
    this.setState({ inFocus: false });
  }

  render() {
    let showRestaurantNames = undefined;
    if (this.state.inFocus) {
      let restaurants = <p className="noRestaurant">no such restaurants on record</p>;
      if (this.props.restaurants.length > 0) {
        restaurants = this.props.restaurants.map((restaurant, i) => (
          <p>{restaurant}</p>
        ));
      } else if (this.props.restaurant.length === 0) {
        restaurants = <p className="noRestaurant">Please type a restaurant name</p>
      }
      showRestaurantNames = <div className="RestaurantSearch-restaurants-panel">{restaurants}</div>
    }
    return (
      <div className="type restaurant">
        <span>Restaurant :</span>
        <input
          placeholder="restaurant name"
          value={this.props.restaurant}
          onChange={this.props.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleFocusOut}
        />
        {showRestaurantNames}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  restaurants: state.invitation.restaurants,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSearch);
