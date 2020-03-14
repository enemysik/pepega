import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { IWork } from '../../models/work';
import { ITreeNode } from '../../components/tree/tree';
import {
  fetchGlobalTreeSucceed,
  setSelectedGlobalTreeNode,
  setSelectedDate,
  fetchDateWorksSucceed
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
const worksReducer = createReducer<IWork[]>([], builder =>
  builder
    .addCase(fetchDateWorksSucceed, (state, action) => action.payload)
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