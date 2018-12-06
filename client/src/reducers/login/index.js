import * as types from '../../actions/types';

const initialState = {
  id: '',
  name: '',
  socket: null,
  isLogin: 'pending',
  msg: null,
}

export default function loginReducers(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}
