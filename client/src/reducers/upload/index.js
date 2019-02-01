import * as types from '../../actions/types';

const initialState = {
  toggle  : false,
  msg     : '',
}

export default function uploadReducers(state = initialState, action) {
  switch(action.type) {
    case types.UPLOAD_RESET:
      return {
        ...initialState,
        toggle: state.toggle,
      };
    case types.TOGGLE_UPLOAD:
      return {
        ...state,
        toggle: !state.toggle
      }
    case types.UPLOAD_SUCCESS:
      return {
        ...state,
        msg: action.data
      }
    case types.UPLOAD_FAIL:
      return {
        ...state,
        msg: action.data
      }
    default:
      return state;
  }
}
