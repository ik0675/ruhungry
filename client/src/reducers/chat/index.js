import * as types from '../../actions/types';

const initialState = {
  messages  : [],
  chatInfo  : null,
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
        messages: [ ...action.data, ...state.messages ]
      }
    case types.NEW_MESSAGE:
      return {
        ...state,
        messages: [ ...state.messages, action.data ]
      }
    default:
      return state;
  }
}
