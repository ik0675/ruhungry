import * as types from '../types';

export const dispatchGetPosts = (id, loaded) => dispatch => {
  fetch(`/api/getPosts/${id}`)
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      dispatch({
        type: types.GET_POSTS,
        data: data.posts
      })
    } else {
      dispatch({
        type: types.ERROR
      })
    }
    loaded();
  })
}

export const dispatchRSVP = (invitation_num, sent_to, status, socket) => dispatch => {
  dispatch({ type: types.RSVP_WAIT, data: invitation_num });
  fetch('/api/rsvp', {
    method  : 'POST',
    headers : { 'content-type': 'application/json' },
    body    : JSON.stringify({ invitation_num, sent_to, status })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      socket.emit('rsvp', { invitation_num, sent_to, status });
      return dispatch({
        type: types.RSVP_DONE,
        data: { invitation_num, sent_to, status }
      });
    } else {
      return dispatch({ type: types.ERROR });
    }
  })
}

export const dispatchNewPost = (post) => dispatch => {
  dispatch({ type: types.NEW_POST, data: post });
}

export const dispatchUpdateRSVP = (rsvp) => dispatch => {
  dispatch({ type: types.RSVP_UPDATE, data: rsvp });
}
