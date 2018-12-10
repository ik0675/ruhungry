import { combineReducers } from 'redux';

import loginReducers from './login';
import friendReducers from './friends';

export default combineReducers({
  login   : loginReducers,
  friends : friendReducers
});
