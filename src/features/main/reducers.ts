import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { fetchGlobalTreeSucceed, clearSelectedGlobalTreeNode, setSelectedGlobalTreeNode } from './actions';
import { ITreeNode } from '../../components/tree/tree';

const globalTreeReducer = createReducer<ITreeNode[]>([], builder =>
  builder
    .addCase(fetchGlobalTreeSucceed, (state, action) => action.payload)
    // .addCase(clearSelectedGlobalTreeNode, (state, action) => {
    //   enumerateTree(state, node => {
    //     if (node.checked) node.checked = false;
    //   })
    // })
    // .addCase(setSelectedGlobalTreeNode, (state, action) => {
    //   enumerateTree(state, node => {
    //     if (action.payload === node.id) {
    //       node.checked = true;
    //     } else {
    //       if (node.checked) node.checked = false;
    //     }
    //   })
    // })
);
const globalTreeSelectedNodeIdReducer = createReducer<number>(0, builder =>
  builder
    .addCase(setSelectedGlobalTreeNode, (state, action) => action.payload)
);

export default combineReducers({
  globalTree: globalTreeReducer,
  globalTreeSelectedNodeId: globalTreeSelectedNodeIdReducer
})

function enumerateTree(tree: ITreeNode[], callback: (node: ITreeNode) => void) {
  tree.forEach(node => {
    callback(node);
    if (node.children) {
      enumerateTree(node.children, callback);
    }
  })
}