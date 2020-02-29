import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { fetchGlobalTreeSucceed, clearSelectedGlobalTreeNode, setSelectedGlobalTreeNode } from './actions';
import { ITreeNode } from '../../components/tree/tree';

const globalTreeReducer = createReducer<ITreeNode[]>([], builder =>
  builder
    .addCase(fetchGlobalTreeSucceed, (state, action) => action.payload)
    .addCase(clearSelectedGlobalTreeNode, (state, action) => {
      enumerateTree(state, node => {
        if (node.checked) node.checked = false;
      })
    })
    .addCase(setSelectedGlobalTreeNode, (state, action) => {
      enumerateTree(state, node => {
        if (action.payload === node.id) {
          node.checked = true;
        }
      })
    })
);

export default combineReducers({
  globalTree: globalTreeReducer
})

function enumerateTree(tree: ITreeNode[], callback: (node: ITreeNode) => void) {
  tree.forEach(node => {
    callback(node);
    if (node.children) {
      enumerateTree(node.children, callback);
    }
  })
}