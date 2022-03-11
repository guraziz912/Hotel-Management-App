import axios from 'axios';
import constants from '../../utils/constants';
import { notificationAction } from '../Notifications/notificationSlice';

import { userActions } from './userSlice';

// user login
export const userLogin = (email, password) => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      const response = await axios.post('http://localhost:8000/user/login', {
        email: email,
        password: password,
        headers: { 'accept-language': 'eng' },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const { data, token } = response.data;
      const userData = { data, token };
      return userData;
    };

    try {
      const userData = await fetchUserData();

      dispatch(userActions.setUserData(userData));
    } catch (error) {
      dispatch(notificationAction.setErrorNotificationStatus);
    }
  };
};

// user signup
export const userSignUp = (newUserData) => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      const response = await axios.post(
        'http://localhost:8000/user/signup',
        newUserData,
        {
          'Content-Type': 'multipart/form-data',
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const { data, token, message } = response.data;
      const userData = { data, token, message };
      return userData;
    };

    try {
      const userData = await fetchUserData();
      dispatch(
        userActions.setUserSignUpStatus({
          status: true,
          message: userData.message,
        })
      );
      dispatch(userActions.setUserData(userData));
    } catch (error) {
      dispatch(
        userActions.setUserSignUpStatus({
          status: false,
          message: error.message,
        })
      );
      dispatch(notificationAction.setErrorNotificationStatus);
    }
  };
};

// user log out
export const userLogout = (token) => {
  return async (dispatch) => {
    const userLogOut = async () => {
      const response = await axios.post('http://localhost:8000/user/logout', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    };

    try {
      const isUserLogOut = await userLogOut();
      if (isUserLogOut.success) {
        dispatch(userActions.setUserLogout());
        localStorage.removeItem(constants.token);
      }
    } catch (error) {
      dispatch(notificationAction.setErrorNotificationStatus);
    }
  };
};
