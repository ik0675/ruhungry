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

export const dispatchSendInvitation = (friends, restaurant, restaurantImgPath, socket) => dispatch => {
  fetch('/api/createInvitation', {
    method  : 'POST',
    headers : { 'content-type': 'application/json' },
    body    : JSON.stringify({
      friends,
      restaurant,
      restaurantImgPath
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      dispatch({ type: types.EXIT_INVITATION });
      socket.emit('newInvitation', data.post);
      dispatch({ type: types.NEW_POST, data: data.post });
    } else {
      dispatch({ type: types.ERROR });
    }
  })
}

export const dispatchGetRestaurants = (restaurant) => dispatch => {
  fetch(`/api/restaurant/${restaurant}`)
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      return dispatch({
        type: types.RESTAURANT_NAMES,
        data: data.restaurants
      });
    }
    return dispatch({ type: types.ERROR });
  })
}
