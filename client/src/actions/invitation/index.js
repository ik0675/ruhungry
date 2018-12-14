import * as types from '../types';

export const dispatchCreateInvitation = friend => dispatch => {
  dispatch({ type: types.EXIT_INVITATION });
  dispatch({
    type: types.CREATE_INVITATION,
    data: friend.friend,
  });
}

export const dispatchGetImages = (restaurant) => dispatch => {
  dispatch({ type: types.GETTING_IMAGES });
  fetch(`/api/getImages?restaurant=${restaurant}`)
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      return dispatch({ type: types.LOAD_IMAGES, data: data.imgs })
    } else {
      return dispatch({ type: types.ERROR })
    }
  });
}

export const dispatchExitInvitation = () => dispatch => {
  dispatch({ type: types.EXIT_INVITATION });
}
