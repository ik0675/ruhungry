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
}

const defaultProps = {

}

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // onlineFriends: [],
      // offlineFriends: [],
      // clickedFriend: null,
      // toggleSetting: false,
      // chat: false,
      // invitation: false,
      // posts: [
      //   {
      //     kind: 'post',
      //     post: 'testestst',
      //     imgs: [],
      //     author: { id: 'ik0675@gmail.com', name: '남궁익' },
      //     createdAt: 300
      //   },
      //   {
      //     restaurant: 쉑쉑,
      //     userImg: logo,
      //     kind: 'invitation',
      //     status: null
      //   },
      //   {
      //     restaurant: 새마을식당,
      //     userImg: logo,
      //     kind: 'invitation',
      //     status: null
      //   },
      //   {
      //     restaurant: 울프강,
      //     userImg: logo,
      //     kind: 'invitation',
      //     status: null
      //   },
      // ]
    };
  }

  // componentWillMount() {
  //   this._mounted = true;
  // }
  //
  // componentWillUnmount() {
  //   this._mounted = false;
  // }
  //
  // getFriends = (users) => {
  //   if (this._mounted) {
  //     this.setState({
  //       onlineFriends: users.onlineFriends,
  //       offlineFriends: users.offlineFriends,
  //     });
  //   }
  // }
  //
  // handleLogout = () => {
  //   this.props.handleLogout();
  //   this.setState({
  //     isLogin: 'false',
  //     onlineFriends: [],
  //     offlineFriends: [],
  //   });
  // }
  //
  // checkUserInList = (list, user) => {
  //   for (let i = 0; i < list.length; ++i) {
  //     if (list[i].id === user.id)
  //       return i;
  //   }
  //   return -1;
  // }
  //
  // handleFriendConnect = (user) => {
  //   if (this.checkUserInList(this.state.onlineFriends, user) === -1) {
  //     let onlineFriends = [...this.state.onlineFriends, user];
  //     let offlineFriends = [...this.state.offlineFriends];
  //     let index = this.checkUserInList(offlineFriends, user);
  //     offlineFriends.splice(index, 1);
  //     this.setState({
  //       onlineFriends: onlineFriends,
  //       offlineFriends: offlineFriends,
  //     });
  //   }
  // }
  //
  // handleFriendDisconnect = (user) => {
  //   if (this.checkUserInList(this.state.offlineFriends, user) === -1) {
  //     let offlineFriends = [...this.state.offlineFriends, user];
  //     let onlineFriends = [...this.state.onlineFriends];
  //     let index = this.checkUserInList(onlineFriends, user);
  //     onlineFriends.splice(index, 1);
  //     this.setState({
  //       onlineFriends: onlineFriends,
  //       offlineFriends: offlineFriends,
  //     });
  //   }
  // }
  //
  // onFriendClick = (i, status) => {
  //   if (i === -1) {
  //     this.setState({
  //       toggleSetting: false
  //     })
  //     return;
  //   }
  //   let friend;
  //   if (status) {
  //     friend = this.state.onlineFriends[i];
  //   } else {
  //     friend = this.state.offlineFriends[i];
  //     i += this.state.onlineFriends.length;
  //   }
  //   const prevClicked = this.state.clickedFriend;
  //   if (prevClicked !== null
  //       && friend.id === prevClicked.id) {
  //     this.setState({
  //       clickedFriend: null,
  //       toggleSetting: false
  //     })
  //   } else {
  //     this.setState({
  //       clickedFriend: { ...friend, index: i },
  //       toggleSetting: true
  //     })
  //   }
  // }
  //
  // openChat = () => {
  //   const friend = this.state.clickedFriend;
  //   if (friend !== null) {
  //     this.setState({
  //       chat: true
  //     }); // open chat UI
  //     // get chat_id. Create one if not exist
  //     fetch('/api/getChatNumber')
  //     .then(data => data.json())
  //
  //   } else {
  //     alert('browser err');
  //   }
  // }
  //
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

  render() {
    if (this.props.isLogin !== 'true') {
      return (
        <Redirect to='/' />
      );
    }
    // let {
    //   onlineFriends, offlineFriends,
    //   clickedFriend, chat, invitation,
    //   toggleSetting, posts
    // } = this.state;
    // let user = { id: this.props.id, name: this.props.name };
    // let friends = {onlineFriends, offlineFriends};
    return (
      <div id="Main">
        <Header
          name={this.props.name}
          handleLogout={this.props.logout}
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
})

const mapDispatchToProps = {
  logout: dispatchLogout
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
