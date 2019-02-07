import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './css/FriendSuggest.css';

const propTypes = {
  person      : PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

function FriendSuggest(props) {
  const person = props.person;
  return (
    <div
      className="FriendSuggest"
      onMouseDown={() => {
        props.handleChange({ target: { value: '' } }, `/main/account/${person.id}`);
      }}
    >
      <img src={`/images/${person.img}`} alt="user" />
      <span>{person.name}</span>
    </div>
  );
};

FriendSuggest.propTypes = propTypes;

export default withRouter(FriendSuggest);
