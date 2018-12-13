import * as types from '../types';

export const dispatchGetPosts = () => dispatch => {
  fetch(`/api/getPosts?offset=0`)
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      return dispatch({
        type: types.GET_POSTS,
        data: data.posts
      })
    } else {
      return dispatch({
        type: types.ERROR
      })
    }
  })
}
