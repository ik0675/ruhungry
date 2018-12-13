import React from 'react';
import PropTypes from 'prop-types';

import './css/PostInvitation.css';

const propTypes = {
  restaurant          : PropTypes.string.isRequired,
  restaurantImgPath   : PropTypes.string.isRequired,
  userImg             : PropTypes.string.isRequired,
  status              : PropTypes.string.isRequired,
  acceptDenyInvitation: PropTypes.func,
}

const defaultProps = {
  acceptDenyInvitation: () => { alert('acceptDenyInvitation is not defined!'); }
}

const PostInvitationReceived = (props) => {
  const { restaurant, restaurantImgPath, userImg, status } = props;
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
      <div className="invitation top">
        <img src={`/${restaurantImgPath}`} alt="restaurant"/>
        <img src={`/${userImg}`} alt="user" />
      </div>
      { invitationStatus() }
    </div>
  )
}

PostInvitationReceived.propTypes = propTypes;
PostInvitationReceived.defaultProps = defaultProps;

export default PostInvitationReceived;
