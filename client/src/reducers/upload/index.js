import * as types from '../../actions/types';

const initialState = {
  toggle: false,

}

export default function uploadReducers(state = initialState, action) {
  switch(action.type) {
    case types.TOGGLE_UPLOAD:
      return {
        ...state,
        toggle: !state.toggle
      }
    default:
      return state;
  }
}
