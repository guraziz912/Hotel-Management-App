import { createSlice } from '@reduxjs/toolkit';
import constants from '../../utils/constants';

const initialNotificationState = {
  errorNotificationStatus: false,
};

const notificationSlice = createSlice({
  name: constants.notification,
  initialState: initialNotificationState,
  reducers: {
    setErrorNotificationStatus(state) {
      state.errorNotificationStatus = !state.errorNotificationStatus;
    },
  },
});
export const notificationReducer = notificationSlice.reducer;
export const notificationAction = notificationSlice.actions;
