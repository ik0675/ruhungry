import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './css/ChatRooms.css';

const propTypes = {

};

class ChatRooms extends Component {
  render() {
    return (
      <div className="ChatRooms" >
        Chatrooms
      </div>
    );
  }
};

ChatRooms.propTypes = propTypes;

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRooms);
