import * as types from '../../actions/types';

const initialState = {
  posts : [],
  loaded: false,
}

export default function postReducers(state = initialState, action) {
  let index, newPost, posts, post;
  switch(action.type) {
    case types.GET_POSTS:
      return {
        ...state,
        posts : action.data,
        loaded: true
      }
    case types.RSVP_WAIT:
      for(index = 0; index < state.posts.length; ++index) {
        if (state.posts[index].invitationNum === action.data) {
          break;
        }
      }
      if (index === state.posts.length) {
        return state;
      }

      newPost = { ...state.posts[index], isWaiting: true }
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, index),
          newPost,
          ...state.posts.slice(index + 1)
        ]
      }
    case types.RSVP_DONE:
      for(index = 0; index < state.posts.length; ++index) {
        if (state.posts[index].invitationNum === action.data.invitation_num) {
          break;
        }
      }
      if (index === state.posts.length) {
        return state;
      }

      newPost = {
        ...state.posts[index],
        status    : action.data.status,
        isWaiting : false
      }
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, index),
          newPost,
          ...state.posts.slice(index + 1)
        ]
      }
    case types.NEW_POST:
      return {
        ...state,
        posts: [ action.data, ...state.posts ]
      }
    case types.RSVP_UPDATE:
      posts = [ ...state.posts ];
      for (let i = 0; i < posts.length; ++i) {
        post = posts[i];
        if (post.invitationNum === action.data.invitation_num) {
          index = post.receiverIds.indexOf(action.data.sent_to);
          post.status[index] = action.data.status;
          break;
        }
      }
      return {
        ...state,
        posts: posts,
      }
    default:
      return state;
  }
}
