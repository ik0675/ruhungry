import * as types from '../types';

export const dispatchResetUpload = _ => dispatch => {
  return dispatch({ type: types.UPLOAD_RESET });
}

export const dispatchToggleUpload = _ => dispatch => {
  return dispatch({ type: types.TOGGLE_UPLOAD });
}

export const dispatchUploadRestaurant = (restaurant, image, loaded) => dispatch => {
  let formData = new FormData();
  formData.append('restaurant', restaurant);
  formData.append('file', image[0]);
  fetch(`/api/addRestaurant`, {
    method: 'POST',
    body  : formData,
  })
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      dispatch({ type: types.UPLOAD_SUCCESS, data: data.msg });
    } else {
      dispatch({ type: types.UPLOAD_FAIL, data: data.msg });
    }
    loaded();
  });
}
