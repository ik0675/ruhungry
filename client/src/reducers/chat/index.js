import * as types from '../../actions/types';

const initialState = {
  chatRooms : [],
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
      return {
        ...initialState,
        chatRooms: state.chatRooms
      }
    case types.GET_MESSAGES:
      return {
        ...state,
        messages: [ ...action.data, ...state.messages ],
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
    case types.GET_CHAT_ROOMS:
      return {
        ...state,
        chatRooms: action.data
      }
    case types.LAST_MSG:
      let i;
      for (i = 0; i < state.chatRooms.length; ++i) {
        if (state.chatRooms[i].chatId === action.chatId) {
          break;
        }
      }
      if (i === state.chatRooms.length) {
        return state;
      }
      let newRoom = { ...state.chatRooms[i] };
      newRoom.lastMsg = action.data;
      let newChatRooms = [ ...state.chatRooms ];
      newChatRooms[i] = newRoom;
      return {
        ...state,
        chatRooms: newChatRooms
      }
    default:
      return state;
  }
}
