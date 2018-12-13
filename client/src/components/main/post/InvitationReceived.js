import React from 'react';
import PropTypes from 'prop-types';

import InvitationInfo from './InvitationInfo';

import './css/Invitation.css';

const propTypes = {
  inviter             : PropTypes.string.isRequired,
  receivers           : PropTypes.arrayOf(PropTypes.string).isRequired,
  restaurant          : PropTypes.string.isRequired,
  restaurantImgPath   : PropTypes.string.isRequired,
  userImg             : PropTypes.string.isRequired,
  status              : PropTypes.string.isRequired,
  acceptDenyInvitation: PropTypes.func,
}

const defaultProps = {
  acceptDenyInvitation: () => { alert('acceptDenyInvitation is not defined!'); }
}

const InvitationReceived = (props) => {
  const {
    inviter, receivers, restaurant,
    restaurantImgPath, userImg, status
  } = props;
  let invitationStatus;
  if (status === 'pending') {
    invitationStatus = () => {
      return (
        <div className="invitation bottom">
          <button
            className="btn accept"
            onClick={ () => {
              props.acceptDenyInvitation(true, props.index)
            }}
          >
            수락
          </button>
          <button
            className="btn deny"
            onClick={ () => {
              props.acceptDenyInvitation(false, props.index)
            }}
          >
            거절
          </button>
        </div>
      )
    }
  } else {
    invitationStatus = () => {
      if (status === 'true') {
        return (
          <div className="invitation bottom">
            <p className="invitation-accept">수락하셨습니다</p>
          </div>
        )
      }
      return (
        <div className="invitation bottom">
          <p className="invitation-deny">거절하셨습니다</p>
        </div>
      )
    }
  }
  return (
    <div className="Post-invitation">
      <InvitationInfo
        inviter={inviter}
        receivers={receivers}
        restaurant={restaurant}
      />
      <div className="invitation top">
        <img src={`/${restaurantImgPath}`} alt="restaurant"/>
        <img src={`/${userImg}`} alt="user" />
      </div>
      { invitationStatus() }
    </div>
  )
}

InvitationReceived.propTypes = propTypes;
InvitationReceived.defaultProps = defaultProps;

export default InvitationReceived;
