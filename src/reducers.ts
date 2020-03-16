import {combineReducers} from 'redux';
import {logins, selectedLogin, loginError} from './modules/login/reducers';
import auth from './core/auth/reducers';
import main from './modules/main/reducers';

const rootReducer = combineReducers({
  authentication: auth,
  main: main,
  selectedLogin: selectedLogin,
  loginError: loginError,
  logins: logins,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
