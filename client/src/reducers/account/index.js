import * as types from '../../actions/types';

const initialState = {
  id            : '',
  name          : '',
  userImg       : '',
  friendStatus  : 'not sent',
  friendRequests: [],
};

export default function accountReducers(state = initialState, action) {
  switch(action.type) {
    case types.LOAD_ACCOUNT:
      return {
        ...state,
        id      : action.data.id,
        name    : action.data.name,
        userImg : action.data.userImg,
      }
    case types.FRIEND_REQUEST:
      return {
        ...state,
        friendStatus: action.data
      }
    case types.FRIEND_REQUEST_ERR:
      return {
        ...state,
        friendStatus: 'err'
      }
    case types.FRIEND_REQUEST_SENT:
      return {
        ...state,
        friendStatus: action.data ? 'sent' : 'err'
      }
    case types.GET_FRIEND_REQUESTS:
      return {
        ...state,
        friendRequests: action.data
      }
    case types.MAKE_FRIENDS:
      const friendRequests = [ ...state.friendRequests ];
      friendRequests.splice(action.data, 1);
      return {
        ...state,
        friendRequests,
      }
    case types.RESET_ACCOUNT:
      return initialState;
    default:
      return state;
  }
};
