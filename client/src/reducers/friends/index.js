import * as types from '../../actions/types';

const initialState = {
  onlineFriends     : [],
  offlineFriends    : [],
  friendSuggests    : [],
  isLoading         : true,
}

export default function friendReducers(state = initialState, action) {
  switch(action.type) {
    case types.GET_FRIENDLIST:
    case types.FRIEND_CONNECT:
    case types.FRIEND_DISCONNECT:
      return {
        ...action.data,
        isLoading     : false,
        friendSuggests: state.friendSuggests,
      }
    case types.FRIEND_SUGGEST:
      return {
        ...state,
        friendSuggests: action.data
      }
    default:
      return state;
  }
}
