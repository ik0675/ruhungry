import * as types from '../../actions/types';

const initialState = {
  id      : '',
  name    : '',
  socket  : null,
  isLogin : 'pending',
  msg     : null,
}

export default function loginReducers(state = initialState, action) {
  switch(action.type) {
    case types.LOGIN:
      return {
        id      : action.data.id,
        name    : action.data.name,
        socket  : action.data.socket,
        isLogin : 'true',
        msg     : null
      }
    case types.LOGIN_FAIL:
      return {
        ...state,
        msg: action.data
      }
    default:
      return state;
  }
}
