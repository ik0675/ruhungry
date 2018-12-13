import React from 'react';
import PropTypes from 'prop-types';

import './css/InvitationInfo.css';

const propTypes = {
  inviter     : PropTypes.string.isRequired,
  receivers   : PropTypes.arrayOf(PropTypes.string).isRequired,
  restaurant  : PropTypes.string.isRequired,
  toggleStatus: PropTypes.func,
}

const defaultProps = {
  toggleStatus: undefined
}

function InvitationInfo(props) {
  const receiversString = props.receivers.join(', ');
  let toggle;
  if (props.toggleStatus) {
    toggle = (
      <span
        role="img"
        aria-label="black down pointing triangle"
        onClick={props.toggleStatus}
      >▼</span>
    )
  }
  return (
    <div className="invitation info">
      <div>
        <span className="inviter">{props.inviter}</span> has invited&nbsp;
        <span className="receivers">{receiversString}</span>&nbsp;
        to a wonderful meal at&nbsp;
        <span className="restaurant">{props.restaurant}</span>!
      </div>
      {toggle}
    </div>
  )
}

InvitationInfo.propTypes = propTypes;
InvitationInfo.defaultProps = defaultProps;

export default InvitationInfo;
