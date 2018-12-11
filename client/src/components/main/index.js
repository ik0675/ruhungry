import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';

import { dispatchLogout } from '../../actions/login';

import './css/index.css';

import Header from './header/Header';
import FriendList from './friends/FriendList';
import Posts from './post/Posts';
import Chat from './chat/Chat';

const propTypes = {
  id      : PropTypes.string.isRequired,
  name    : PropTypes.string.isRequired,
  isLogin : PropTypes.string.isRequired,
  socket  : PropTypes.object,
  onChat  : PropTypes.bool,
  onInvite: PropTypes.bool,
  logout  : PropTypes.func.isRequired,
}

const defaultProps = {
  socket  : null,
  onChat  : null,
  onInvite: null,
}

class Main extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     posts: [
  //       {
  //         kind: 'post',
  //         post: 'testestst',
  //         imgs: [],
  //         author: { id: 'ik0675@gmail.com', name: '남궁익' },
  //         createdAt: 300
  //       },
  //       {
  //         restaurant: 쉑쉑,
  //         userImg: logo,
  //         kind: 'invitation',
  //         status: null
  //       },
  //       {
  //         restaurant: 새마을식당,
  //         userImg: logo,
  //         kind: 'invitation',
  //         status: null
  //       },
  //       {
  //         restaurant: 울프강,
  //         userImg: logo,
  //         kind: 'invitation',
  //         status: null
  //       },
  //     ]
  //   };
  // }
  // createInvitation = () => {
  //   const friend = this.state.clickedFriend;
  //   if (friend !== null) {
  //     this.setState({
  //       invitation: true
  //     })
  //   } else {
  //     alert('browser err');
  //   }
  // }
  //
  // acceptDenyInvitation = (status, index) => {
  //   let invitation = { ...this.state.posts[index] };
  //   invitation.status = status;
  //   let posts = [ ...this.state.posts ];
  //   posts[index] = invitation;
  //   this.setState({
  //     posts: posts
  //   })
  // }
  //
  // getPosts = () => {
  //   fetch('/api/getPosts')
  //   .then(data => data.json())
  //   .then(posts => {
  //     this.setState({
  //       posts: [ ...posts, ...this.state.posts ]
  //     })
  //   })
  // }
  //
  // addPost = (post) => {
  //   this.setState({
  //     posts: [ post, ...this.state.posts ]
  //   });
  // }

  handleLogout = () => {
    this.props.logout(this.props.socket);
  }

  render() {
    if (this.props.isLogin !== 'true') {
      return (
        <Redirect to='/' />
      );
    }

    return (
      <div id="Main">
        <Header
          name={this.props.name}
          handleLogout={this.handleLogout}
        />

        <FriendList />

        {/*<Posts
          user={user}
          posts={posts}
          acceptDenyInvitation={this.acceptDenyInvitation}
          addPost={this.addPost}
          getPosts={this.getPosts}
        /> */}

         {/*chat && <Chat friend={clickedFriend}/>*/}
      </div>
    )
  }
}

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

const mapStateToProps = state => ({
  id      : state.login.id,
  name    : state.login.name,
  isLogin : state.login.isLogin,
  socket  : state.login.socket,
  onChat  : state.friends.chatReceiver,
  onInvite: state.friends.invitationReceiver,
})

const mapDispatchToProps = {
  logout: dispatchLogout
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
