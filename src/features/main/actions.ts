import { createAction } from '@reduxjs/toolkit';
import { ITreeNode } from '../../components/tree/tree'
import { AppDispatch } from '../../store/configureStore';

export const fetchGlobalTreeSucceed = createAction<ITreeNode[]>('fetchGlobalTreeSucceed');
export const fetchGlobalTreeFailed = createAction<string | null>('fetchGlobalTreeFailed');
export function fetchGlobalTree() {
  return async function (dispatch: AppDispatch) {
    let response: ITreeNode[] | undefined;
    try {
      response = await fetch('/tree').then(res => res.json()) as ITreeNode[];
    } catch (ex) {
      dispatch(fetchGlobalTreeFailed(ex.message));
    }
    if (response) {
      dispatch(fetchGlobalTreeSucceed(response));
    }
  }
}

export const setSelectedGlobalTreeNode = createAction<number>('setSelectedGlobalTreeNode');
export const clearSelectedGlobalTreeNode = createAction('clearSelectedGlobalTreeNode');