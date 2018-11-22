import React from 'react';
import PropTypes from 'prop-types';

import './css/Post.css';

const propTypes = {
  writing: PropTypes.string,
  imgs: PropTypes.array
}

const defaultProps = {
  writing: '',
  imgs: []
}

const Post = (props) => {
  const writing = () => {
    if (props.writing !== '') {
      return <p>{props.writing}</p>;
    }
    return null;
  }
  return (
    <div className="Post">
      <div className="Post-author">
        <p>{props.author.name}</p>
      </div>
      <div className="Post-writing">
        { writing() }
      </div>
    </div>
  )
}

export default Post;
