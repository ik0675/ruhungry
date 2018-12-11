import * as types from '../../actions/types';

const initialState = {
  onlineFriends     : [],
  offlineFriends    : [],
  isLoading         : true,
  chatReceiver      : null,
  invitationReceiver: null,
}

export default function friendReducers(state = initialState, action) {
  let onlineFriends, offlineFriends;
  switch(action.type) {
    case types.GET_FRIENDLIST:
    case types.FRIEND_CONNECT:
    case types.FRIEND_DISCONNECT:
      return {
        ...action.data,
        isLoading: false
      }
    case types.CREATE_CHAT:
      return {
        ...state,
        chatReceiver: action.data,
      }
    case types.CREATE_INVITATION:
      return {
        ...state,
        invitationReceiver: action.data,
      }
    default:
      return state;
  }
}
