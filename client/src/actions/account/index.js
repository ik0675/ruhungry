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
