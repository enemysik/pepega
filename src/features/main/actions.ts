import { createAction } from '@reduxjs/toolkit';
import { ITreeNode } from '../../components/tree/tree'
import { IWork } from '../../models/work';
import { AppDispatch } from '../../store/configureStore';

export interface Node {
  id: number;
  name: string;
  children: Tree;
}
export interface Tree {
  [id: number]: Node;
}

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

export const createNewWork = createAction('createNewWork');
export const setSelectedDate = createAction<Date>('setSelectedDate');

export const fetchDateWorksSucceed = createAction<IWork[]>('fetchDateWorksSucceed');
export const fetchDateWorksFailed = createAction<string | null>('fetchDateWorksFailed');
export function fetchDateWorks(date: Date) {
  return async function (dispatch: AppDispatch) {
    let response: IWork[] | undefined;
    try {
      response = await fetch(`/works/${date.toJSON()}`).then(res => res.json()) as IWork[];
    } catch (ex) {
      dispatch(fetchDateWorksFailed(ex.message));
    }
    if (response) {
      dispatch(fetchDateWorksSucceed(response));
    }
  }
}