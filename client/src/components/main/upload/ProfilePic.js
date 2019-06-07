import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { dispatchProfileImgChange } from "../../../actions/account";

import "./css/UploadProfilePic.css";

const propTypes = {
  toggleUpload: PropTypes.func.isRequired,
  sendProfilePicChange: PropTypes.func.isRequired
};

const defaultProps = {};

class UploadProfilePic extends Component {
  state = {
    image: null,
    loading: false,
    msg: ""
  };

  exitUpload = () => {
    this.props.toggleUpload();
  };

  handleFile = e => {
    this.setState({
      image: e.target.files
    });
  };

  submit = e => {
    e.preventDefault();
    if (!this.state.loading) {
      const { image } = this.state;
      if (image == null) {
        return alert("Please provide a valid image");
      }
      this.setState({ loading: true }, () => {
        // dispatch uploadProfilePic
        this.uploadProfilePic(
          this.state.image,
          () => this.setState({ loading: false }),
          msg => this.setState({ msg })
        );
      });
    }
  };

  uploadProfilePic = async (image, loaded, sendMsg) => {
    let file = image[0];
    const fileName = file.name;
    const fileType = file.type;

    try {
      // get s3 pre-signed url
      const getS3Url = await fetch(
        `/api/getS3Url?fileName=${fileName}&fileType=${fileType}`
      );
      const getS3UrlResponse = await getS3Url.json();
      if (!getS3UrlResponse.status) {
        return sendMsg("Internal Err... Please try again");
      }

      // upload to s3 bucket
      const { signedRequest, getUrl } = getS3UrlResponse.data;
      const uploadToS3 = await fetch(signedRequest, {
        method: "PUT",
        headers: { "content-type": fileType },
        body: file
      });
      if (!uploadToS3.ok) {
        sendMsg("Internal Err while saving images... Please try again");
        return loaded();
      }

      // save the image path from s3 to the database
      const addProfilePic = await fetch("/api/addProfilePic", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imgPath: getUrl })
      });
      const addProfilePicResponse = await addProfilePic.json();
      if (addProfilePicResponse.status) {
        sendMsg("Upload successful");
        // send dispatch to change the profile img path
        this.props.sendProfilePicChange(getUrl);
        // should send socket to change the profile img of this user to friends
      } else {
        sendMsg("Could not save the image... Please try again");
      }
      loaded();
    } catch (err) {
      console.log(err);
      return sendMsg("Internal Err while saving images... Please try again");
    }
  };

  render() {
    return (
      <div className="UploadProfilePic">
        <h1>
          Upload a new profile image!
          <span
            role="img"
            aria-label="roman numeral ten"
            onClick={this.exitUpload}
          >
            ⅹ
          </span>
        </h1>
        <form onSubmit={this.submit}>
          <p>Select a profile image</p>
          <input type="file" name="file" onChange={this.handleFile} />
          {this.state.loading && <img src="/loading.gif" alt="loading" />}
          <button onClick={this.submit}>Upload</button>
          {this.state.msg !== "" && (
            <p className="formResult">{this.state.msg}</p>
          )}
        </form>
      </div>
    );
  }
}

UploadProfilePic.propTypes = propTypes;
UploadProfilePic.defaultProps = defaultProps;

const mapStateToProps = state => ({});
const mapDispatchToProps = {
  sendProfilePicChange: dispatchProfileImgChange
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadProfilePic);
