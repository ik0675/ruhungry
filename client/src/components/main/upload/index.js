import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dispatchToggleUpload, dispatchUploadRestaurant, dispatchResetUpload } from '../../../actions/upload';

import './css/Upload.css';

const propTypes = {
  loading     : PropTypes.bool.isRequired,
  msg         : PropTypes.string.isRequired,
  toggleUpload: PropTypes.func.isRequired,
  upload      : PropTypes.func.isRequired,
}

const defaultProps = {

}

class Upload extends Component {
  state = {
    restaurant: '',
    image     : null,
  }

  exitUpload = () => {
    this.props.reset();
    this.props.toggleUpload();
  }

  handleChange = (e) => {
    this.setState({
      restaurant: e.target.value,
    });
  }

  handleFile = (e) => {
    this.setState({
      image: e.target.files,
    });
  }

  submit = (e) => {
    e.preventDefault();
    if (!this.props.loading) {
      const { restaurant, image } = this.state;
      if (restaurant === '' || image == null) {
        return alert('Please provide a valid restaurant name and a image');
      }
      this.props.upload(restaurant, image);
    }
  }

  render() {
    return (
      <div className="Upload">
        <h1>
          Add a restaurant!
          <span
            role="img"
            aria-label="roman numeral ten"
            onClick={this.exitUpload}
          >
            ⅹ
          </span>
        </h1>
        <form onSubmit={this.submit}>
          <label>
            <span>Restaurant name : </span>
            <input
              type="text"
              placeholder="Restaurant name"
              value={this.state.restaurant}
              onChange={this.handleChange}
              name="restaurant"
            />
          </label>
          <p>Select a restaurant image</p>
          <input type="file" name="file" onChange={this.handleFile} />
          {this.props.loading && <img src="/loading.gif" alt="loading" />}
          <button onClick={this.submit} >Add a restaurant</button>
          {this.props.msg !== '' && <p className="formResult">{this.props.msg}</p>}
        </form>
      </div>
    )
  }
}

Upload.propTypes = propTypes;
Upload.defaultProps = defaultProps;

const mapStateToProps = state => ({
  loading : state.upload.loading,
  msg     : state.upload.msg,
});

const mapDispatchToProps = {
  toggleUpload: dispatchToggleUpload,
  upload      : dispatchUploadRestaurant,
  reset       : dispatchResetUpload,
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
