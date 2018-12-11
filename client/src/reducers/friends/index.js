import * as types from '../../actions/types';

const initialState = {
  onlineFriends   : [],
  offlineFriends  : [],
  isLoading       : true,
  toggleChat      : false,
  toggleInvitation: false,
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
        toggleChat: true
      }
    case types.CREATE_INVITATION:
      return {
        ...state,
        toggleInvitation: true,
      }
    default:
      return state;
  }
}
