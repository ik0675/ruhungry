import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dispatchToggleUpload } from '../../../actions/upload';

import './css/RestaurantSearch.css';

const propTypes = {
  restaurant  : PropTypes.string,
  restaurants : PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  getImages   : PropTypes.func.isRequired,
  toggleUpload: PropTypes.func.isRequired,
}

const defaultProps = {
  restaurant: ""
}

class RestaurantSearch extends Component {
  state = {
    inFocus: false,
    index: -1,
    upload: false,
  }

  handleFocus = () => {
    this.setState({ inFocus: true });
  }

  handleFocusOut = () => {
    this.setState({ inFocus: false });
  }

  submitRestaurantName = () => {
    if (this.state.index === -1) {
      this.props.getImages(this.props.restaurant);
    } else {
      const restaurant = this.props.restaurants[this.state.index ];
      this.props.handleChange({ target: { value: restaurant }});
      this.props.getImages(restaurant);
    }
    this.setState({ inFocus: false, index: -1 });
  }

  handleKeyDown = (e) => {
    switch(e.keyCode) {
      case 13:
        return this.submitRestaurantName();
      case 38:
        let index = this.state.index;
        if (index > -1) {
          this.setState({ index: index - 1});
        }
        return;
      case 37:
      case 39:
        return this.setState({ index: -1 });
      case 40:
        index = this.state.index;
        if (index < this.props.restaurants.length - 1) {
          this.setState({ index: index + 1 });
        }
        return;
      default:
        return;
    }
  }

  handleChange = (e) => {
    this.setState({ inFocus: true });
    this.props.handleChange(e);
  }

  render() {
    let showRestaurantNames = undefined;
    if (this.state.inFocus) {
      let restaurants = <p className="noRestaurant">no such restaurants on record</p>;
      if (this.props.restaurants.length > 0) {
        restaurants = this.props.restaurants.map((restaurant, i) => {
          return (
            <p
              className="restaurantNames"
              key={`restaurantNames${i}`}
              style={{
                backgroundColor: i === this.state.index ? 'blue' : 'white',
              }}
              onMouseDown={() => {
                this.setState({ index: i }, () => {
                  this.submitRestaurantName();
                });
              }}
            >
              {restaurant}
            </p>
          )
        });
      } else if (this.props.restaurant.length === 0) {
        restaurants = <p className="noRestaurant">Please type a restaurant name</p>
      }
      showRestaurantNames = (
        <div className="RestaurantSearch-restaurants-panel">
          {restaurants}
          <div
            style={{
              width: '100%',
              margin: '0',
              color: 'gray',
              backgroundColor: 'lightgray',
              paddingTop: '5px',
              paddingBottom: '5px',
              paddingLeft: '5px',
              paddingRight: '5px',
              cursor: 'pointer'
            }}
            onClick={() => this.setState({ inFocus: false })}
          >
            <span onMouseDown={this.props.toggleUpload}>Add a restaurant</span>
            <span style={{ display: 'inline-block', float: 'right'}}>CLOSE</span>
          </div>
        </div>
      )
    }
    return (
      <div className="type restaurant" onBlur={this.handleFocusOut}>
        <span>Restaurant :</span>
        <input
          placeholder="restaurant name"
          value={this.props.restaurant}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          autoComplete="off"
        />
        {showRestaurantNames}
      </div>
    )
  }
}

RestaurantSearch.propTypes = propTypes;
RestaurantSearch.defaultProps = defaultProps;

const mapStateToProps = state => ({
  restaurants: state.invitation.restaurants,
})

const mapDispatchToProps = {
  toggleUpload: dispatchToggleUpload,
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSearch);
