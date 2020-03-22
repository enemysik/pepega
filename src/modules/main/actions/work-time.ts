import {createAction} from '@reduxjs/toolkit';
import {IWorkTime} from '../types';
import {AppDispatch} from '../../../store';
import {setIsSaving} from '../../../core/actions';

// #region delete
export const deleteTimeRangeRemoteSucceed =
  createAction<{ workId: number, timeId: number }>('deleteTimeRangeRemoteSucceed');
export const deleteTimeRangeRemoteFailed = createAction<string | null>('deleteTimeRangeRemoteFailed');
export function deleteTimeRangeRemote(workId: number, timeId: number) {
  return async function(dispatch: AppDispatch) {
    let response = false;
    try {
      await fetch(`/works/${workId}/time/${timeId}`, {
        method: 'delete',
      });
      response = true;
    } catch (ex) {
      dispatch(deleteTimeRangeRemoteFailed(ex.message));
    }
    if (response) {
      dispatch(deleteTimeRangeRemoteSucceed({workId, timeId}));
    }
  };
}
// #endregion
// #region create
type CreateTimeRangeType<T> = { workId: number, time: T }
export const createTimeRange = createAction('createTimeRange',
    ({workId, time}: CreateTimeRangeType<IWorkTime>) => ({
      payload: {
        workId,
        time,
      },
    }));
export const createTimeRangeRemoteSucceed =
  createAction<{ workId: number, timeId: number }>('createTimeRangeRemoteSucceed');
export const createTimeRangeRemoteFailed = createAction<string | null>('createTimeRangeRemoteFailed');
export function createTimeRangeRemote({workId, time}: CreateTimeRangeType<string>) {
  return async function(dispatch: AppDispatch) {
    let response: { id: number } | undefined;
    const timeRange = {id: 0, startTime: time, endTime: time};
    dispatch(createTimeRange({workId, time: timeRange}));
    try {
      dispatch(setIsSaving(true));
      response = await fetch(`/works/${workId}/time`, {
        method: 'post',
        body: JSON.stringify(timeRange),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((r) => r.json());
    } catch (ex) {
      dispatch(createTimeRangeRemoteFailed(ex.message));
    }
    dispatch(setIsSaving(false));
    if (response) {
      dispatch(createTimeRangeRemoteSucceed({workId, timeId: response.id}));
    }
  };
}
// #endregion
// #region update
export const updateTimeRange = createAction('updateTimeRange',
    ({workId, time}: CreateTimeRangeType<IWorkTime>) => ({
      payload: {
        workId,
        time,
      },
    }));
export const updateTimeRangeRemoteFailed = createAction<string | null>('updateTimeRangeRemoteFailed');
export function updateTimeRangeRemote({workId, time}: CreateTimeRangeType<IWorkTime>) {
  return async function(dispatch: AppDispatch) {
    dispatch(updateTimeRange({workId, time}));
    try {
      dispatch(setIsSaving(true));
      await fetch(`/works/${workId}/time/${time.id}`, {
        method: 'put',
        body: JSON.stringify(time),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (ex) {
      dispatch(updateTimeRangeRemoteFailed(ex.message));
    }
    dispatch(setIsSaving(false));
  };
}
// #endregion
