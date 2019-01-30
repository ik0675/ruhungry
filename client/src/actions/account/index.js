import * as types from '../types';

export const dispatchLoadAccountInfo = id => dispatch => {
  fetch(`/api/loadAccount/${id}`)
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      return dispatch({
        type: types.LOAD_ACCOUNT,
        data: {
          id      : data.id,
          name    : data.name,
          userImg : data.userImg,
        }
      });
    }
    return dispatch({ type: types.LOAD_ACCOUNT_ERR });
  })
};

export const dispatchFriendRequest = (friend_id) => dispatch => {
  dispatch({ type: types.LOADING_FRIEND });
  fetch('/api/friendRequest', {
    method  : 'POST',
    headers : { 'content-type': 'application/json' },
    body    : JSON.stringify({ friend_id })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      return dispatch({
        type: types.FRIEND_REQUEST_SENT,
        data: true,
      })
    }
    return dispatch({
      type: types.FRIEND_REQUEST_SENT,
      data: false
    })
  })
};

export const dispatchIsFriends = (id, friend_id) => dispatch => {
  fetch('/api/isFriends', {
    method  : 'POST',
    headers : { 'content-type': 'application/json' },
    body    : JSON.stringify({ id, friend_id })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      return dispatch({
        type: types.FRIEND_REQUEST,
        data: data.data
      })
    }
    return dispatch({ type: types.FRIEND_REQUEST_ERR });
  })
}
