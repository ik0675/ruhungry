import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/Posts.css';

import PostUpload from './PostUpload';
import Post from './Post';
import PostInvitation from './PostInvitation';

const propTypes = {
  user                : PropTypes.object,
  posts               : PropTypes.array,
  acceptDenyInvitation: PropTypes.func,
}

const defaultProps = {
  user                : null,
  posts               : [],
  acceptDenyInvitation: () => { alert('acceptDenyInvitation is not defined!'); }
}

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userPost: '',
      userImgs: [],
    }
  }

  handlePostChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { userPost } = this.state;
    alert(userPost);
    this.setState({
      userPost: ''
    })
  }

  render() {
    const posts = this.props.posts;
    const renderPosts = posts.map( (post, i) => {
      if (post.kind === 'writing') {
        return <Post
                 key={i}
                 index={i}
                 writing={post.writing}
                 imgs={post.imgs}
                 author={post.author}
               />
      } else {
        return <PostInvitation
                restaurant={post.restaurant}
                userImg={post.userImg}
                status={post.status}
                key={i}
                index={i}
                acceptDenyInvitation={this.props.acceptDenyInvitation}
              />
      }
    });

    return (
          <div id="Posts">
            <div id="PostContainer">
              <PostUpload
                onSubmit={this.onSubmit}
                user={this.props.user}
                post={this.state.userPost}
                handlePostChange={this.handlePostChange}
              />
              { renderPosts }
            </div>
          </div>
    );
  }
};

Posts.propTypes = propTypes;
Posts.defaultProps = defaultProps;

export default Posts;
