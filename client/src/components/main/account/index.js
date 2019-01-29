import React from 'react';
import PropTypes from 'prop-types';

import './css/Account.css';

const propTypes = {
  id: PropTypes.string.isRequired,
};

function Account(props) {
  return (
    <div className="Account">
      <h1>Account Profile</h1>
      
    </div>
  );
}

Account.propTypes = propTypes;

export default Account;
