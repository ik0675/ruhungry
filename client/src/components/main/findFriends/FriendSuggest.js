import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './css/FriendSuggest.css';

const propTypes = {
  person      : PropTypes.object.isRequired,
  type        : PropTypes.string,
};

const defaultProps = {
  type: 'page'
};

function FriendSuggest(props) {
  const person = props.person;
  return (
    <div
      type={props.type}
      className="FriendSuggest"
      onClick={() => {
        props.handleChange({ target: { value: '' } });
        props.handleClose();
        props.history.push(`/main/account/${person.id}`);
      }}
    >
      <img src={`/images/${person.img}`} alt="user" />
      <span>{person.name}</span>
    </div>
  );
};

FriendSuggest.propTypes = propTypes;
FriendSuggest.defaultProps = defaultProps;

export default withRouter(FriendSuggest);
