import * as types from '../../actions/types';

const initialState = {
  loading : false,
  toggle  : false,
  msg     : ''
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
    case types.UPLOAD_LOADING:
      return {
        ...state,
        loading: true,
      }
    case types.UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.data
      }
    case types.UPLOAD_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.data
      }
    default:
      return state;
  }
}
