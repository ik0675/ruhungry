import * as types from '../../actions/types';

const initialState = {
  onlineFriends     : [],
  offlineFriends    : [],
  friendSuggests    : {
    inFriends   : [],
    notInFriends: [],
  },
}

export default function friendReducers(state = initialState, action) {
  switch(action.type) {
    case types.GET_FRIENDLIST:
    case types.FRIEND_CONNECT:
    case types.FRIEND_DISCONNECT:
      return {
        ...action.data,
        friendSuggests: state.friendSuggests,
      }
    case types.FRIEND_SUGGEST_FRIENDS:
      return {
        ...state,
        friendSuggests: {
          inFriends   : [ ...state.friendSuggests.inFriends ],
          notInFriends: action.data
        }
      }
    case types.FRIEND_SUGGEST_NOT_FRIENDS:
      return {
        ...state,
        friendSuggests: {
          inFriends   : action.data,
          notInFriends: [ ...state.friendSuggests.inFriends ]
        }
      }
    default:
      return state;
  }
}
