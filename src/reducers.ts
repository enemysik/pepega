import {combineReducers} from 'redux';
import authentication from './core/auth/reducers';
import modules from './modules/reducers';
import core from './core/reducers';

const rootReducer = combineReducers({
  authentication,
  modules,
  core,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
