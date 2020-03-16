import {createAction} from '@reduxjs/toolkit';

export * from './tree';
export * from './work';
export * from './work-time';

export const changeSelectedDate = createAction<Date>('setSelectedDate');
