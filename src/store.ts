import {configureStore, Action} from '@reduxjs/toolkit';
import thunk, {ThunkAction} from 'redux-thunk';
import rootReducer, {RootState} from './reducers';


export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  preloadedState: {
    modules: {
      main: {
        selectedDate: new Date('2020-02-11'), // TODO remove
      },
    },
  },
});
export type AppDispatch = typeof store.dispatch;
export type AppThunk<T> = ThunkAction<T, RootState, unknown, Action<string>>

export default store;
