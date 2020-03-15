import {combineReducers} from 'redux';
import {logins, selectedLogin, loginError} from '../features/login';
import auth from '../features/auth/reducers';
import main from '../features/main/reducers';

const rootReducer = combineReducers({
  authentication: auth,
  main: main,
  selectedLogin: selectedLogin,
  loginError: loginError,
  logins: logins,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
