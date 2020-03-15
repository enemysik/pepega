import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { IWork, IWorks } from '../../models/work';
import { ITreeNode } from '../../components/tree/tree';
import {
  fetchGlobalTreeSucceed,
  setSelectedGlobalTreeNode,
  setSelectedDate,
  fetchDateWorksSucceed,
  updateWork,
  createNewWork,
  createNewWorkRemoteSucceed,
  deleteWorkRemoteSucceed,
  deleteTimeRangeRemoteSucceed
} from './actions';

const globalTreeReducer = createReducer<ITreeNode[]>([], builder =>
  builder
    .addCase(fetchGlobalTreeSucceed, (state, action) => action.payload)
);
const globalTreeSelectedNodeIdReducer = createReducer<number>(0, builder =>
  builder
    .addCase(setSelectedGlobalTreeNode, (state, action) => action.payload)
);
const selectedDateReducer = createReducer<Date>(new Date(), builder =>
  builder
    .addCase(setSelectedDate, (state, action) => action.payload)
);
const worksReducer = createReducer<IWorks>({}, builder =>
  builder
    .addCase(fetchDateWorksSucceed, (state, action) => action.payload)
    .addCase(updateWork, (state, action) => ({ ...state, [action.payload.id]: action.payload }))
    .addCase(createNewWork, (state, action) => ({ ...state, [action.payload.id]: action.payload }))
    .addCase(deleteWorkRemoteSucceed, (state, action) => {
      const newState = { ...state };
      delete (newState[action.payload])
      return newState;
    })
    .addCase(deleteTimeRangeRemoteSucceed, (state, action) => {
      const newState = { ...state };
      const work = { ...state[action.payload.workId] };
      const newTimes = work.times.filter(t => t.id !== action.payload.timeId);
      work.times = newTimes;
      newState[work.id] = work;
      return newState;
    })
    .addCase(createNewWorkRemoteSucceed, (state, action) => {
      const newState = { ...state };
      const work = { ...state[0] };
      work.id = action.payload;
      newState[work.id] = work;
      delete (newState[0])
      return newState;
    })
);
export default combineReducers({
  globalTree: globalTreeReducer,
  globalTreeSelectedNodeId: globalTreeSelectedNodeIdReducer,
  selectedDate: selectedDateReducer,
  works: worksReducer
})

// function enumerateTree(tree: ITreeNode[], callback: (node: ITreeNode) => void) {
//   tree.forEach(node => {
//     callback(node);
//     if (node.children) {
//       enumerateTree(node.children, callback);
//     }
//   })
// }