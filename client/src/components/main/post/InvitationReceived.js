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
  invitationNum       : PropTypes.string.isRequired,
  id                  : PropTypes.string.isRequired,
  isWaiting           : PropTypes.bool.isRequired,
  acceptDenyInvitation: PropTypes.func,
}

const defaultProps = {
  acceptDenyInvitation: () => { alert('acceptDenyInvitation is not defined!'); }
}

const InvitationReceived = (props) => {
  const {
    inviter, receivers, restaurant,
    restaurantImgPath, userImg, status,
    isWaiting, invitationNum
  } = props;
  
  let invitationStatus;
  if (isWaiting) {
    invitationStatus = () => (
      <div className="invitation bottom">
        <img src="/loading.gif" alt="loading" />
      </div>
    )
  }
  else if (status === 'pending') {
    invitationStatus = () => (
      <div className="invitation bottom">
        <button
          className="btn accept"
          onClick={ () => {
            props.rsvp(invitationNum, 'accepted')
          }}
        >
          수락
        </button>
        <button
          className="btn deny"
          onClick={ () => {
            props.rsvp(invitationNum, 'rejected')
          }}
        >
          거절
        </button>
      </div>
    )
  } else {
    invitationStatus = () => {
      if (status === 'accepted') {
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
