import * as types from '../../actions/types';

const initialState = {
  invitationReceiver: null,
  imgs              : [],
  loading           : false
}

export default function invitationReducers(state = initialState, action) {
  switch(action.type) {
    case types.CREATE_INVITATION:
      return {
        ...state,
        invitationReceiver: action.data,
      }
    case types.EXIT_INVITATION:
      return {
        ...state,
        invitationReceiver: null,
      }
    case types.GETTING_IMAGES:
      return {
        ...state,
        loading: true
      }
    case types.LOAD_IMAGES:
      return {
        ...state,
        imgs    : action.data,
        loading : false
      }
    default:
      return state;
  }
}
