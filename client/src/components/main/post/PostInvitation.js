import React from 'react';
import PropTypes from 'prop-types';

import './css/PostInvitation.css';

const propTypes = {
  index               : PropTypes.number,
  restaurant          : PropTypes.image,
  userImg             : PropTypes.image,
  status              : PropTypes.bool,
  acceptDenyInvitation: PropTypes.func,
}

const defaultProps = {
  index               : -1,
  restaurant          : null,
  userImg             : null,
  status              : null,
  acceptDenyInvitation: () => { alert('acceptDenyInvitation is not defined!'); }
}

const PostInvitation = (props) => {
  const { restaurant, userImg, status } = props;
  let invitationStatus;
  if (status === null) {
    invitationStatus = () => {
      return (
        <div className="invitation bottom">
          <button
            className="btn accept"
            role="button"
            onClick={ () => {
              props.acceptDenyInvitation(true, props.index)
            }}
          >
            수락
          </button>
          <button
            className="btn deny"
            role="button"
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
      if (status) {
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
        <img src={restaurant} />
        <img src={userImg} />
      </div>
      { invitationStatus() }
    </div>
  )
}

PostInvitation.propTypes = propTypes;
PostInvitation.defaultProps = defaultProps;

export default PostInvitation;
