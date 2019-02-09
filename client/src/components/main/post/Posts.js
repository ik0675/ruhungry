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
  id        : PropTypes.string.isRequired,
  socket    : PropTypes.object.isRequired,
  posts     : PropTypes.array.isRequired,
  getPosts  : PropTypes.func.isRequired,
  rsvp      : PropTypes.func.isRequired,
  newPost   : PropTypes.func.isRequired,
  makePost  : PropTypes.bool,
  page      : PropTypes.string,
  filter    : PropTypes.number,
  accountId : PropTypes.string,
}

const defaultProps = {
  makePost  : true,
  page      : 'main',
  filter    : 2,
  accountId : '',
}

class Posts extends Component {
  state = {
    loaded: false,
    id    : this.props.accountId !== '' ? this.props.accountId : this.props.id
  };

  makeInvitation = React.createRef();

  componentDidMount() {
    if (!this.state.loaded) {
      const id = this.state.id;
      this.props.getPosts(id, () => this.setState({ loaded: true }));
    };

    this.props.socket.on('newInvitation', (invitation) => {
      this.props.newPost(invitation);
    });

    this.props.socket.on('rsvp', (rsvp) => {
      this.props.updateRSVP(rsvp);
    });
  };

  handlePostChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    });
  };

  handleRSVP = (invitationNum, status) => {
    this.props.rsvp(invitationNum, this.state.id, status, this.props.socket);
  };

  render() {
    if (!this.state.loaded) {
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
      );
    }

    const { posts, filter } = this.props;
    const renderPosts = posts.map( (post, i) => {
      const id = this.state.id;
      if (post.id === id) {
        return (
          <InvitationSent
            key={post.invitationNum}
            inviter={post.name}
            receivers={post.receiverNames}
            restaurant={post.restaurant}
            restaurantImgPath={post.restaurantImgPath}
            userImg={post.img}
            status={post.status}
            filter={filter !== 1}
          />
        );
      } else {
        let status = post.status;
        if (status.constructor === Array) {
          const index = post.receiverIds.indexOf(id);
          status = status[index];
        }
        return (
          <InvitationReceived
            key={post.invitationNum}
            inviter={post.name}
            receivers={post.receiverNames}
            restaurant={post.restaurant}
            restaurantImgPath={post.restaurantImgPath}
            userImg={post.img}
            status={status}
            id={this.state.id}
            isWaiting={post.isWaiting}
            rsvp={this.handleRSVP}
            invitationNum={post.invitationNum}
            filter={filter !== 0}
            loginId={this.props.id}
          />
        );
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
});

const mapDispatchToProps = {
  getPosts  : dispatchGetPosts,
  rsvp      : dispatchRSVP,
  newPost   : dispatchNewPost,
  updateRSVP: dispatchUpdateRSVP,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
