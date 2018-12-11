import { combineReducers } from 'redux';

import loginReducers from './login';
import friendReducers from './friends';
import chatReducers from './chat';

export default combineReducers({
  login   : loginReducers,
  friends : friendReducers,
  chat    : chatReducers,
});
