import {combineReducers} from 'redux';
import authentication from './core/auth/reducers';
import modules from './modules/reducers';

const rootReducer = combineReducers({
  authentication,
  modules,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
