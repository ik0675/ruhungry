import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostInvitation from './PostInvitation';

import './css/Posts.css';

const propTypes = {
  user                : PropTypes.object,
  posts               : PropTypes.array,
  acceptDenyInvitation: PropTypes.func,
  addPost             : PropTypes.func,
}

const defaultProps = {
  user                : null,
  posts               : [],
  acceptDenyInvitation: () => { alert('acceptDenyInvitation is not defined!'); },
  addPost             : () => { alert('addPost is not defined!'); },
}

class Posts extends Component {
  constructor(props) {
    super(props);
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
      return <PostInvitation
               key={i}
               restaurant={post.restaurant}
               userImg={post.userImg}
               status={post.status}
               index={i}
               acceptDenyInvitation={this.props.acceptDenyInvitation}
            />
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
  id: state.login.id,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
