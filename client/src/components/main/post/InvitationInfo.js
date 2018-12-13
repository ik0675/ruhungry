import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  inviter   : PropTypes.string.isRequired,
  receivers : PropTypes.arrayOf(PropTypes.string).isRequired,
  restaurant: PropTypes.string.isRequired,
}

const defaultProps = {

}

function InvitationInfo(props) {
  return (
    <div className="invitation info">
      <span className="inviter">{props.inviter}</span> has invited&nbsp;
      <span className="receivers">{props.receivers}</span> to a wonderful meal at&nbsp;
      <span className="restaurant">{props.restaurant}</span>!
    </div>
  )
}

InvitationInfo.propTypes = propTypes;
InvitationInfo.defaultProps = defaultProps;

export default InvitationInfo;
