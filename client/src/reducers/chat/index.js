import * as types from '../../actions/types';

const initialState = {
  messages  : [],
  chatInfo  : null,
  loaded    : false,
}

export default function chatReducers(state = initialState, action) {
  switch(action.type) {
    case types.CREATE_CHAT:
      return {
        ...state,
        chatInfo: action.data
      }
    case types.EXIT_CHAT:
      return initialState;
    case types.GET_MESSAGES:
      return {
        ...state,
        messages: [ ...action.data, ...state.messages ],
        loaded  : true,
      }
    case types.NEW_MESSAGE:
      return {
        ...state,
        messages: [ ...state.messages, action.data ]
      }
    case types.RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [ ...state.messages, action.data ]
      }
    default:
      return state;
  }
}
