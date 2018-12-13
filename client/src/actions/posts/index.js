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

export const dispatchRSVP = (invitation_num, sent_to, status) => dispatch => {
  dispatch({ type: types.RSVP_WAIT, data: invitation_num });
  fetch('/api/rsvp', {
    method  : 'POST',
    headers : { 'content-type': 'application/json' },
    body    : JSON.stringify({ invitation_num, sent_to, status })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      return dispatch({
        type: types.RSVP_DONE,
        data: { invitation_num, status }
      });
    } else {
      return dispatch({ type: types.ERROR });
    }
  })
}
