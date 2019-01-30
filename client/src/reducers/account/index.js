import * as types from '../../actions/types';

const initialState = {
  id          : '',
  name        : '',
  userImg     : '',
  loaded      : false,
  friendLoaded: false,
  friendStatus: 'not sent',
};

export default function accountReducers(state = initialState, action) {
  switch(action.type) {
    case types.LOAD_ACCOUNT:
      return {
        ...state,
        id      : action.data.id,
        name    : action.data.name,
        userImg : action.data.userImg,
        loaded  : true,
      }
    case types.LOAD_ACCOUNT_ERR:
      return {
        ...state,
        loaded: true,
      }
    case types.LOADING_FRIEND:
      return {
        ...state,
        friendLoaded: false,
      }
    case types.FRIEND_REQUEST:
      return {
        ...state,
        friendLoaded: true,
        friendStatus: action.data
      }
    case types.FRIEND_REQUEST_ERR:
      return {
        ...state,
        friendLoaded: true,
        friendStatus: 'err'
      }
    case types.FRIEND_REQUEST_SENT:
      return {
        ...state,
        friendLoaded: true,
        friendStatus: action.data ? 'sent' : 'err'
      }
    default:
      return state;
  }
};
