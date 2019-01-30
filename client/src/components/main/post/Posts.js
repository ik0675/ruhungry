import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  dispatchGetPosts, dispatchRSVP, dispatchNewPost, dispatchUpdateRSVP
} from '../../../actions/posts';

import MakeInvitation from '../invitation/MakeInvitation';
import InvitationSent from './InvitationSent';
import InvitationReceived from './InvitationReceived';

import './css/Posts.css';

const propTypes = {
  id      : PropTypes.string.isRequired,
  socket  : PropTypes.object.isRequired,
  posts   : PropTypes.array.isRequired,
  loaded  : PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
  rsvp    : PropTypes.func.isRequired,
  newPost : PropTypes.func.isRequired,
  makePost: PropTypes.bool,
  page    : PropTypes.string,
  filter  : PropTypes.number,
}

const defaultProps = {
  makePost: true,
  page    : 'main',
  filter  : 2,
}

class Posts extends Component {
  makeInvitation = React.createRef();

  componentDidMount() {
    if (!this.props.loaded) {
      this.props.getPosts();
    }

    this.props.socket.on('newInvitation', (invitation) => {
      this.props.newPost(invitation);
    });

    this.props.socket.on('rsvp', (rsvp) => {
      this.props.updateRSVP(rsvp);
    })
  }

  handlePostChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleRSVP = (invitationNum, status) => {
    this.props.rsvp(invitationNum, this.props.id, status, this.props.socket);
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
    if (!this.props.loaded) {
      return (
        <div id="Posts" page={this.props.page} >
          <div id="PostContainer" page={this.props.page} >
            {this.props.makePost &&
              <MakeInvitation
                style={{
                  marginTop : '10px',
                  marginLeft: '2.5%'
                }}
                ref={this.makeInvitation}
                displayExit={false}
              />
            }
            <div id="LoadingDiv">
              <img src="/loading.gif" alt="loading" />
            </div>
          </div>
        </div>
      )
    }

    const { posts, filter } = this.props;
    const renderPosts = posts.map( (post, i) => {
      if ((filter === 2 || filter === 0) && post.id === this.props.id) {
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
      } else if (filter === 2 || filter === 1) {
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
          <div id="Posts" page={this.props.page} >
            <div id="PostContainer" page={this.props.page} >
              {this.props.makePost &&
                <MakeInvitation
                  style={{
                    marginTop : '10px',
                    marginLeft: '2.5%'
                  }}
                  displayExit={false}
                />
              }
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
  socket  : state.login.socket,
  posts   : state.posts.posts,
  loaded  : state.posts.loaded,
})

const mapDispatchToProps = {
  getPosts  : dispatchGetPosts,
  rsvp      : dispatchRSVP,
  newPost   : dispatchNewPost,
  updateRSVP: dispatchUpdateRSVP,
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
