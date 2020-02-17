import { combineReducers } from 'redux';
import { logins, selectedLogin, loginError } from './login';

const rootReducer = combineReducers({
  selectedLogin,
  loginError,
  logins
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;