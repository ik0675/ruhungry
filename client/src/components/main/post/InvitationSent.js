import React, { Component } from "react";
import PropTypes from "prop-types";

import InvitationInfo from "./InvitationInfo";

import "./css/Invitation.css";

const propTypes = {
  inviter: PropTypes.string.isRequired,
  receivers: PropTypes.arrayOf(PropTypes.string).isRequired,
  restaurant: PropTypes.string.isRequired,
  restaurantImgPath: PropTypes.string.isRequired,
  userImg: PropTypes.string.isRequired,
  status: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.bool
};

const defaultProps = {
  filter: true
};

class InvitationSent extends Component {
  state = {
    toggleStatus: false
  };

  handleToggle = () => {
    this.setState(prevState => ({
      toggleStatus: !prevState.toggleStatus
    }));
  };

  render() {
    const {
      inviter,
      receivers,
      restaurant,
      status,
      restaurantImgPath,
      userImg
    } = this.props;

    const printStatus = receivers.map((receiver, i) => {
      const receiverStatus = status[i];
      return (
        <p key={receiver} className="receiver status">
          <span>{receiver}</span> :
          <span status={receiverStatus}> {receiverStatus}</span>
        </p>
      );
    });
    let showRSVP;
    if (this.state.toggleStatus) {
      showRSVP = (
        <div className="invitation status">
          RSVP status
          {printStatus}
        </div>
      );
    }
    return (
      <div
        className="Post-invitation"
        style={{ display: this.props.filter ? "block" : "none" }}
      >
        <InvitationInfo
          inviter={inviter}
          receivers={receivers}
          restaurant={restaurant}
          toggleStatus={this.handleToggle}
        />
        {showRSVP}
        <div className="invitation top">
          <img src={`${restaurantImgPath}`} alt="restaurant" />
          <img src={`${userImg}`} alt="user" />
        </div>
      </div>
    );
  }
}

InvitationSent.propTypes = propTypes;
InvitationSent.defaultProps = defaultProps;

export default InvitationSent;
