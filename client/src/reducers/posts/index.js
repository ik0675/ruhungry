import * as types from '../../actions/types';

const initialState = {
  posts: []
}

export default function postReducers(state = initialState, action) {
  let index, newPost;
  switch(action.type) {
    case types.GET_POSTS:
      return {
        posts: action.data
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
    default:
      return state;
  }
}
