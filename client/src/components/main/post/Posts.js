import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dispatchGetPosts, dispatchRSVP } from '../../../actions/posts';

import MakeInvitation from '../invitation/MakeInvitation';
import InvitationSent from './InvitationSent';
import InvitationReceived from './InvitationReceived';

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

  handleRSVP = (invitationNum, status) => {
    this.props.rsvp(invitationNum, this.props.id, status);
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
        return (
          <InvitationSent
            key={post.invitationNum}
            inviter={post.name}
            receivers={post.receiverNames}
            restaurant={post.restaurant}
            restaurantImgPath={post.restaurantImgPath}
            userImg={post.img}
            status={post.status}
          />
        );
      } else {
        let status = post.status;
        if (status.constructor === Array) {
          const index = post.receiverIds.indexOf(this.props.id);
          status = status[index];
        }
        return <InvitationReceived
                 key={post.invitationNum}
                 inviter={post.name}
                 receivers={post.receiverNames}
                 restaurant={post.restaurant}
                 restaurantImgPath={post.restaurantImgPath}
                 userImg={post.img}
                 status={status}
                 id={this.props.id}
                 isWaiting={post.isWaiting}
                 rsvp={this.handleRSVP}
                 invitationNum={post.invitationNum}
               />
      }
    });

    return (
          <div id="Posts">
            <div id="PostContainer">
              <MakeInvitation
                style={{
                  marginTop : '10px',
                  marginLeft: '2.5%'
                }}
                displayExit={false}
              />
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
  getPosts: dispatchGetPosts,
  rsvp    : dispatchRSVP,
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
