import * as types from '../../actions/types';

const initialState = {
  onlineFriends     : [],
  offlineFriends    : [],
  isLoading         : true,
}

export default function friendReducers(state = initialState, action) {
  switch(action.type) {
    case types.GET_FRIENDLIST:
    case types.FRIEND_CONNECT:
    case types.FRIEND_DISCONNECT:
      return {
        ...action.data,
        isLoading: false
      }
    default:
      return state;
  }
}
