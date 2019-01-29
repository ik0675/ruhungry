import * as types from '../../actions/types';

const initialState = {
  id      : '',
  name    : '',
  userImg : '',
  loaded  : false,
};

export default function accountReducers(state = initialState, action) {
  switch(action.type) {
    case types.LOAD_ACCOUNT:
      return {
        id      : action.data.id,
        name    : action.data.name,
        userImg : action.data.userImg,
        loaded  : true,
      }
    case types.LOAD_ACCOUNT_ERR:
      return {
        ...initialState,
        loaded: true,
      }
    default:
      return state;
  }
};
