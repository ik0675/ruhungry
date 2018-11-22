import React from 'react';
import PropTypes from 'prop-types';

import './css/PostUpload.css';

const propTypes = {
  user            : PropTypes.object,
  post            : PropTypes.string,
  imgs            : PropTypes.array,
  onSubmit        : PropTypes.func,
  handlePostChange: PropTypes.func,
}

const defaultProps = {
  user            : null,
  post            : '',
  imgs            : [],
  onSubmit        : () => { alert('onSubmit is not defined!'); },
  handlePostChange: () => { alert('handlePostChange is not defined!'); }
}

const PostUpload = (props) => {
  const placeholder = `Share what's on your mind, ${props.user.name}!`;
  return (
    <form id="PostUpload" onSubmit={props.onSubmit}>
      <textarea
        placeholder={placeholder}
        name="userPost"
        value={props.post}
        onChange={props.handlePostChange}
      />
      <input
        type="submit"
        value="Share!"
      />
    </form>
  )
}

export default PostUpload;
