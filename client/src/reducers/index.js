import { combineReducers } from 'redux';

import loginReducers from './login';
import friendReducers from './friends';
import chatReducers from './chat';
import postReducers from './posts';
import invitationReducers from './invitation';
import uploadReducers from './upload';

export default combineReducers({
  login     : loginReducers,
  friends   : friendReducers,
  chat      : chatReducers,
  posts     : postReducers,
  invitation: invitationReducers,
  upload    : uploadReducers,
});
