import * as types from '../../actions/types';

const initialState = {
  onlineFriends : [],
  offlineFriends: [],
}

export default function friendReducers(state = initialState, action) {
  switch(action.type) {
    case types.GET_FRIENDLIST:
    case types.FRIEND_CONNECT:
    case types.FRIEND_DISCONNECT:
      return {
        ...action.data
      }
    default:
      return state;
  }
}
