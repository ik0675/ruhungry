import * as types from '../../actions/types';

const initialState = {
  posts: []
}

export default function postReducers(state = initialState, action) {
  switch(action.type) {
    case types.GET_POSTS:
      return {
        posts: action.data
      }
    default:
      return state;
  }
}
