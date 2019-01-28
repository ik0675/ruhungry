import * as types from '../types';

export const dispatchToggleUpload = _ => dispatch => {
  return dispatch({ type: types.TOGGLE_UPLOAD });
}
