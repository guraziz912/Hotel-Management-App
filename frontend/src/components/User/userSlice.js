import { createSlice } from '@reduxjs/toolkit';
import constants from '../../utils/constants';

const initialUserState = {
  userData: {},

  masterData: {
    userLoginModalShow: false,
    userLoginAlertShow: false,
    userSignUpModalShow: false,
    userLoginStatus: false,
    userSignUpFailStatus: {
      status: false,
      message: null,
    },
  },
};

const userSlice = createSlice({
  name: constants.user,
  initialState: initialUserState,
  reducers: {
    setModalShow(state) {
      state.masterData.userLoginModalShow = !state.masterData
        .userLoginModalShow;
    },
    setSignUpModalShow(state) {
      state.masterData.userSignUpModalShow = !state.masterData
        .userSignUpModalShow;
    },
    setUserData(state, { payload }) {
      const { data, token } = payload;
      state.masterData.userLoginStatus = true;
      state.masterData.userLoginAlertShow = true;
      state.userData = data;
      localStorage.setItem(constants.token, JSON.stringify(token));
    },
    setUserSignUpStatus(state, { payload }) {
      state.masterData.userSignUpFailStatus = payload;
    },
    setUserLogout(state, { payload }) {
      state.masterData.userLoginStatus = false;
      state.userData = {};
    },
    setUserLoginAlert(state) {
      state.masterData.userLoginAlertShow = false;
    },
  },
});
export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
