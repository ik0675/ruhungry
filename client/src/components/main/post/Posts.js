import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dispatchGetPosts } from '../../../actions/posts';

import PostInvitation from './PostInvitation';

import './css/Posts.css';

const propTypes = {
  id      : PropTypes.string.isRequired,
  posts   : PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
}

const defaultProps = {

}

class Posts extends Component {
  constructor(props) {
    super(props);

    this.props.getPosts();
  }

  handlePostChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    let { userPost } = this.state;
    fetch('/api/createPost', {
      method : 'POST',
      headers: {
                  'Content-Type': 'application/json'
               },
      body   : JSON.stringify({ post: userPost })
    })
    .then(data => data.json())
    .then(result => {
      if (result.status) {
        this.props.addPost(result);
      } else {
        alert('database err. Please try again');
      }
      this.setState({
        userPost: '',
      })
    })
  }

  render() {
    const posts = this.props.posts;
    const renderPosts = posts.map( (post, i) => {
      if (post.id === this.props.id) {
        return <div key={i}>Sent Invitation. To be implemented</div>;
      } else {
        const index = post.receiverIds.indexOf(this.props.id);
        const status = post.status[index];
        return <PostInvitation
                 key={post.invitationNum}
                 restaurant={post.restaurant}
                 restaurantImgPath={post.restaurantImgPath}
                 userImg={post.img}
                 status={status}
               />
      }
    });

    return (
          <div id="Posts">
            <div id="PostContainer">
              { renderPosts }
            </div>
          </div>
    );
  }
};

Posts.propTypes = propTypes;
Posts.defaultProps = defaultProps;

const mapStateToProps = state => ({
  id      : state.login.id,
  posts   : state.posts.posts,
})

const mapDispatchToProps = {
  getPosts: dispatchGetPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
