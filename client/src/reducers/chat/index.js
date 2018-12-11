import * as types from '../../actions/types';

const initialState = {
  messages  : [],
  newMessage: null,
  chatInfo  : null,
}

export default function chatReducers(state = initialState, action) {
  switch(action.type) {
    case types.CREATE_CHAT:
      return {
        ...state,
        chatInfo: action.data
      }
    case types.GET_MESSAGES:
    case types.NEW_MESSAGE:
    case types.SEND_MESSAGE:
    default:
      return state;
  }
}
