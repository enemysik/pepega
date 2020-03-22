import {createAction} from '@reduxjs/toolkit';
import {IWork, IWorks} from '../types';
import {AppDispatch} from '../../../store';
import {setIsSaving} from '../../../core/actions';

export const changeSelectedDateLocal = createAction<Date>('changeSelectedDateLocal');
export function changeSelectedDate(date: Date) {
  return async function(dispatch: AppDispatch) {
    dispatch(changeSelectedDateLocal(date));
    fetchDateWorks(date)(dispatch);
  };
};


// #region get
export const fetchDateWorksSucceed = createAction<IWorks>('fetchDateWorksSucceed');
export const fetchDateWorksFailed = createAction<string | null>('fetchDateWorksFailed');
export function fetchDateWorks(date: Date) {
  return async function(dispatch: AppDispatch) {
    let response: IWork[] | undefined;
    try {
      response = await fetch(`/works/${date.toJSON()}`).then((res) => res.json()) as IWork[];
    } catch (ex) {
      dispatch(fetchDateWorksFailed(ex.message));
    }
    if (response) {
      dispatch(fetchDateWorksSucceed(response.toObject('id')));
    }
  };
}
// #endregion
// #region update
export const updateWork = createAction<IWork>('updateWork');
export const updateWorkRemoteSucceed = createAction('updateWorkRemoteSucceed');
export const updateWorkRemoteFailed = createAction<string | null>('updateWorkRemoteFailed');
export function updateWorkRemote(work: IWork) {
  return async function(dispatch: AppDispatch) {
    let success = false;
    try {
      dispatch(setIsSaving(true));
      await fetch(`/works/${work.id}`, {
        method: 'put',
        body: JSON.stringify(work),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      success = true;
    } catch (ex) {
      dispatch(updateWorkRemoteFailed(ex.message));
    }
    dispatch(setIsSaving(false));
    if (success) {
      dispatch(updateWorkRemoteSucceed());
    }
  };
}
// #endregion
// #region create
export const createNewWork = createAction<IWork>('createNewWork');
export const createNewWorkRemoteSucceed = createAction<number>('createNewWorkRemoteSucceed');
export const createNewWorkRemoteFailed = createAction<string | null>('createNewWorkRemoteFailed');
export function createNewWorkRemote(taskId: number, date: string) {
  return async function(dispatch: AppDispatch) {
    let response: { id: number } | undefined;
    const work = {
      id: 0,
      name: '',
      description: '',
      startDate: date,
      taskId: taskId,
      times: [],
    };
    dispatch(createNewWork(work));
    try {
      dispatch(setIsSaving(true));
      response = await fetch(`/works`, {
        method: 'post',
        body: JSON.stringify(work),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((r) => r.json());
    } catch (ex) {
      dispatch(createNewWorkRemoteFailed(ex.message));
    }
    dispatch(setIsSaving(false));
    if (response) {
      dispatch(createNewWorkRemoteSucceed(response.id));
    }
  };
}
// #endregion
// #region delete
export const deleteWorkRemoteSucceed = createAction<number>('deleteWorkRemoteSucceed');
export const deleteWorkRemoteFailed = createAction<string | null>('deleteWorkRemoteFailed');
export function deleteWorkRemote(workId: number) {
  return async function(dispatch: AppDispatch) {
    let response = false;
    try {
      dispatch(setIsSaving(true));
      await fetch(`/works/${workId}`, {
        method: 'delete',
      });
      response = true;
    } catch (ex) {
      dispatch(deleteWorkRemoteFailed(ex.message));
    }
    dispatch(setIsSaving(false));
    if (response) {
      dispatch(deleteWorkRemoteSucceed(workId));
    }
  };
}
// #endregion
