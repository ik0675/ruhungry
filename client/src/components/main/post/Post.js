import React from 'react';
import PropTypes from 'prop-types';

import './css/Post.css';

const propTypes = {
  post: PropTypes.string,
  imgs: PropTypes.array
}

const defaultProps = {
  post: '',
  imgs: []
}

const Post = (props) => {
  const post = () => {
    if (props.post !== '') {
      return <p>{props.post}</p>;
    }
    return null;
  }
  let createdAt = props.createdAt;
  if (createdAt < 60) {
    createdAt += ' minutes ago';
  } else {
    createdAt = parseInt(createdAt / 60, 10);
    if (createdAt < 24) {
      createdAt += ' hours ago';
    } else {
      createdAt = parseInt(createdAt / 24, 10);
      createdAt += ' days ago';
    }
  }
  return (
    <div className="Post">
      <div className="Post-author">
        <p>
          { props.author.name }
          <span>
            { createdAt }
          </span>
        </p>
      </div>
      <div className="Post-post">
        { post() }
      </div>
    </div>
  )
}

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;

export default Post;
