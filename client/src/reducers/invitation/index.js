import * as types from '../../actions/types';

const initialState = {
  invitationReceiver: null,
  imgs              : [],
  restaurants       : [],
}

export default function invitationReducers(state = initialState, action) {
  switch(action.type) {
    case types.CREATE_INVITATION:
      return {
        ...state,
        invitationReceiver: action.data,
      }
    case types.EXIT_INVITATION:
      return initialState;
    case types.LOAD_IMAGES:
      return {
        ...state,
        imgs    : action.data,
      }
    case types.RESTAURANT_NAMES:
      return {
        ...state,
        restaurants: action.data
      }
    default:
      return state;
  }
}
