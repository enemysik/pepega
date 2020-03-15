import { createAction } from '@reduxjs/toolkit';
import { ITreeNode } from '../../components/tree/tree'
import { IWork, IWorks, IWorkTime } from '../../models/work';
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

export const setSelectedDate = createAction<Date>('setSelectedDate');

export const fetchDateWorksSucceed = createAction<IWorks>('fetchDateWorksSucceed');
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
      dispatch(fetchDateWorksSucceed(response.toObject('id')));
    }
  }
}

// #region Work
// #region update
export const updateWork = createAction<IWork>('updateWork');
export const updateWorkRemoteSucceed = createAction('updateWorkRemoteSucceed');
export const updateWorkRemoteFailed = createAction<string | null>('updateWorkRemoteFailed');
export function updateWorkRemote(work: IWork) {
  return async function (dispatch: AppDispatch) {
    let success = false;
    try {
      await fetch(`/works/${work.id}`, {
        method: 'put',
        body: JSON.stringify(work),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      success = true;
    } catch (ex) {
      dispatch(updateWorkRemoteFailed(ex.message));
    }
    if (success) {
      dispatch(updateWorkRemoteSucceed());
    }
  }
}
// #endregion
// #region create
export const createNewWork = createAction<IWork>('createNewWork');
export const createNewWorkRemoteSucceed = createAction<number>('createNewWorkRemoteSucceed');
export const createNewWorkRemoteFailed = createAction<string | null>('createNewWorkRemoteFailed');
export function createNewWorkRemote(work: IWork) {
  return async function (dispatch: AppDispatch) {
    let response: { id: number } | undefined;
    try {
      response = await fetch(`/works`, {
        method: 'post',
        body: JSON.stringify(work),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(r => r.json());
    } catch (ex) {
      dispatch(createNewWorkRemoteFailed(ex.message));
    }
    if (response) {
      dispatch(createNewWorkRemoteSucceed(response.id));
    }
  }
}
// #endregion
// #region delete
export const deleteWorkRemoteSucceed = createAction<number>('deleteWorkRemoteSucceed');
export const deleteWorkRemoteFailed = createAction<string | null>('deleteWorkRemoteFailed');
export function deleteWorkRemote(workId: number) {
  return async function (dispatch: AppDispatch) {
    let response = false;
    try {
      await fetch(`/works/${workId}`, {
        method: 'delete'
      });
      response = true;
    } catch (ex) {
      dispatch(deleteWorkRemoteFailed(ex.message));
    }
    if (response) {
      dispatch(deleteWorkRemoteSucceed(workId));
    }
  }
}
// #endregion
// #endregion

// #region time
// #region delete
export const deleteTimeRangeRemoteSucceed = createAction<{ workId: number, timeId: number }>('deleteTimeRangeRemoteSucceed');
export const deleteTimeRangeRemoteFailed = createAction<string | null>('deleteTimeRangeRemoteFailed');
export function deleteTimeRangeRemote(workId: number, timeId: number) {
  return async function (dispatch: AppDispatch) {
    let response = false;
    try {
      await fetch(`/works/${workId}/time/${timeId}`, {
        method: 'delete'
      });
      response = true;
    } catch (ex) {
      dispatch(deleteTimeRangeRemoteFailed(ex.message));
    }
    if (response) {
      dispatch(deleteTimeRangeRemoteSucceed({ workId, timeId }));
    }
  }
}
// #endregion
// #region create
type CreateTimeRangeType<T> = { workId: number, time: T }
export const createTimeRange = createAction('createTimeRange',
  ({ workId, time }: CreateTimeRangeType<IWorkTime>) => ({
    payload: {
      workId,
      time
    }
  }));
export const createTimeRangeRemoteSucceed = createAction<{ workId: number, timeId: number }>('createTimeRangeRemoteSucceed');
export const createTimeRangeRemoteFailed = createAction<string | null>('createTimeRangeRemoteFailed');
export function createTimeRangeRemote({ workId, time }: CreateTimeRangeType<string>) {
  return async function (dispatch: AppDispatch) {
    let response: { id: number } | undefined;
    const timeRange = { id: 0, startTime: time, endTime: time }
    dispatch(createTimeRange({ workId, time: timeRange }));
    try {
      response = await fetch(`/works/${workId}/time`, {
        method: 'post',
        body: JSON.stringify(timeRange),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(r => r.json());
    } catch (ex) {
      dispatch(createTimeRangeRemoteFailed(ex.message));
    }
    if (response) {
      dispatch(createTimeRangeRemoteSucceed({ workId, timeId: response.id }));
    }
  }
}
// #endregion
// #endregion