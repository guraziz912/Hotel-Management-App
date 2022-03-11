import axios from 'axios';

import constants from '../../utils/constants';
import { notificationAction } from '../Notifications/notificationSlice';

export const addBooking = ({
  adults,
  checkIn,
  checkOut,
  children,
  email,
  hotelName,
  mobile,
  roomType,
  rooms,
  totalPrice,
  guestName,
}) => {
  return async (dispatch) => {
    const addHotelBooking = async () => {
      const response = await axios.post(
        'http://localhost:8000/booking/addBooking',
        {
          adults: adults,
          checkIn: checkIn,
          checkOut: checkOut,
          children: children,
          email: email,
          hotelName: hotelName,
          mobile: mobile,
          roomType: roomType,
          rooms: rooms,
          totalPrice: totalPrice,
          guestName: guestName,
          headers: {
            'accept-language': 'eng',
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    };

    try {
      const addedBooking = await addHotelBooking();
      return addedBooking;
    } catch (error) {
      dispatch(notificationAction.setErrorNotificationStatus);
    }
  };
};

export const stripePayment = (email, totalPrice) => {
  return async (dispatch) => {
    const addPayment = async () => {
      const res = await axios.post('http://localhost:8000/booking//checkout', {
        email: email,
        totalPrice: totalPrice,
        headers: { 'accept-language': 'eng' },
      });

      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      const data = res.data['client_secret'];
      return data;
    };

    try {
      const clientSecret = await addPayment();

      return clientSecret;
    } catch (error) {
      dispatch(notificationAction.setErrorNotificationStatus);
    }
  };
};
