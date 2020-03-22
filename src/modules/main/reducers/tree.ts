import {createReducer, combineReducers} from '@reduxjs/toolkit';
import {setSelectedGlobalTreeNode, fetchGlobalTreeSucceed, setTasksList} from '../actions';
import {ITask} from '../types';
import {ITreeNode} from '../components/tree/types';

const globalTreeReducer = createReducer<ITreeNode[]>([], (builder) =>
  builder
      .addCase(fetchGlobalTreeSucceed, (state, action) => action.payload),
);
const globalTreeSelectedNodeIdReducer = createReducer<number>(0, (builder) =>
  builder
      .addCase(setSelectedGlobalTreeNode, (state, action) => action.payload),
);
const tasksReducer = createReducer<IObjectArray<ITask>>({}, (builder) =>
  builder
      .addCase(setTasksList, (state, action) => action.payload),
);
export default combineReducers({
  globalTree: globalTreeReducer,
  selectedId: globalTreeSelectedNodeIdReducer,
  tasks: tasksReducer,
});
