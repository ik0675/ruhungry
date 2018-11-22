import React from 'react';
import PropTypes from 'prop-types';

import './css/Posts.css';

import Post from './Post';
import PostInvitation from './PostInvitation';

const propTypes = {
  posts               : PropTypes.array,
  acceptDenyInvitation: PropTypes.func,
}

const defaultProps = {
  posts               : [],
  acceptDenyInvitation: () => { alert('acceptDenyInvitation is not defined!'); }
}

const Posts = (props) => {
  const posts = props.posts;
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
              acceptDenyInvitation={props.acceptDenyInvitation}
            />
    }
  });

  return (
        <div id="Posts">
          <div id="PostContainer">
            { renderPosts }
          </div>
        </div>
        /* <div className="column">
          <div className="row">
            <div className="card">
              <div className="img-fluid">
                <img className="temp" src={울프강}></img>
                <img className="temp" src={logo}></img>
                <div className="card-body">
                  <a href="#" className="btn btn-outline-success btn-md">허락</a>
                  <a href="#" className="btn btn-outline-danger btn-md">거절</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="row">
            <div className="card">
              <div className="image">
                <img className="temp" src={쉑쉑}></img>
                <img className="temp" src={logo}></img>
                <div className="card-body">
                  <a href="#" className="btn btn-outline-success btn-md">허락</a>
                  <a href="#" className="btn btn-outline-danger btn-md">거절</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="row">
            <div className="card">
              <div className="image">
                <img className="temp" src={새마을식당}></img>
                <img className="temp" src={logo}></img>
                <div className="card-body">
                  <a href="#" className="btn btn-outline-success btn-md">허락</a>
                  <a href="#" className="btn btn-outline-danger btn-md">거절</a>
                </div>
              </div>
            </div>
          </div>
        </div> */
  );
};

Posts.propTypes = propTypes;
Posts.defaultProps = defaultProps;

export default Posts;
