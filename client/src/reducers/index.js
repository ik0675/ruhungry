import { combineReducers } from 'redux';

import loginReducers from './login';

export default combineReducers({
  login: loginReducers,
});
