import { createAction } from '@reduxjs/toolkit';

export const setAuthentication = createAction<boolean>('setAuthentication');
