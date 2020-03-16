import {combineReducers} from 'redux';
import main from './main/reducers';
import login from './login/reducers';

export default combineReducers({
  main,
  login,
});
