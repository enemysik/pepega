import {combineReducers} from 'redux';
import {createReducer} from '@reduxjs/toolkit';
import {setIsSaving} from './actions';

const isSavingReducer = createReducer<boolean>(false, (builder) =>
  builder
      .addCase(setIsSaving, (state, action) => action.payload),
);

export default combineReducers({
  isSaving: isSavingReducer,
})
;
