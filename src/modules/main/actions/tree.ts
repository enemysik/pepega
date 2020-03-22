import {createAction} from '@reduxjs/toolkit';
import {AppDispatch} from '../../../store';
import {ITreeNode} from '../components/tree/types';
import {ITask} from '../types';

export interface Node {
  id: number;
  name: string;
  children: Tree;
}
export interface Tree {
  [id: number]: Node;
}

export const setTasksList = createAction<IObjectArray<ITask>>('setTasksList');
// #region fetchGlobalTree
export const fetchGlobalTreeSucceed = createAction<ITreeNode[]>('fetchGlobalTreeSucceed');
export const fetchGlobalTreeFailed = createAction<string | null>('fetchGlobalTreeFailed');
export function fetchGlobalTree() {
  return async function(dispatch: AppDispatch) {
    try {
      const response = await fetch('/tree')
          .then((res) => res.json()) as { globalTree: ITreeNode[], planarTree: ITask[] };
      dispatch(setTasksList(response.planarTree.toObject('id')));
      dispatch(fetchGlobalTreeSucceed(response.globalTree));
    } catch (ex) {
      dispatch(fetchGlobalTreeFailed(ex.message));
    }
  };
}
// #endregion

export const setSelectedGlobalTreeNode = createAction<number>('setSelectedGlobalTreeNode');
export const clearSelectedGlobalTreeNode = createAction('clearSelectedGlobalTreeNode');
